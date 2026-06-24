// orchestrator.mjs — the Ed Agent. Drives one requirement through nine
// human-gated stages with a mission-swapped squad, a learning memory, and a
// quantified Ed_agents_Claude.md ledger. The build half delegates to the active
// mission (finance → eds-mcp; code/marketing/contract → skill engines).
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { c, estTokens, fmt } from './util.mjs';
import { CONDUCTOR, stageOwnerName } from './agents.mjs';
import { intake } from './intake.mjs';
import { analyze } from './analyze.mjs';
import { recall as recallMemory, checkpoint, commit } from './ledger.mjs';
import * as prefs from './prefs.mjs';
import { gate, allCleared, gateLine } from './gates.mjs';
import { loadEngine } from './edsBridge.mjs';
import { captureIntent } from './skills/trust.mjs';
import { frameAssessment, trustAssessment } from './deliberate.mjs';
import { checkpoint as makeCheckpoint, allCheckpointsCleared, openCheckpoints, openQuestions, checkpointLine, parseResolutions } from './checkpoints.mjs';
import { redTeamScan, redTeamQuestions, redTeamBlock } from './skills/redteam.mjs';
import { groundClaims, groundingQuestions, groundingBlock } from './skills/grounding.mjs';
import { recallRules, rulesAsConcerns, forge } from './flywheel.mjs';
import { refineLoop, loopBlock } from './loop.mjs';
import { ironLawQuestions } from './skills/ironlaws.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');

export async function run(requirement, opts = {}) {
  const quiet = !!opts.quiet;
  const log = (s = '') => { if (!quiet) console.log(s); };
  const requirementText = String(requirement || '').trim() ||
    'Build a KYC onboarding step for an Australian retail broker — Enhanced Due Diligence with source of funds and the legal basis shown inline.';
  const memoryPath = opts.memoryPath || join(repoRoot, 'Ed_agents_Claude.md');

  // ── learning layer: record any new preferences, then recall + apply ──
  if (opts.record && opts.record.length) prefs.record(memoryPath, opts.record);
  const pref = prefs.recall(memoryPath);
  const { opts: o, applied } = prefs.apply(pref, opts);
  const resolutions = parseResolutions(o.resolve);

  // ── learning flywheel: a human rejection forges a learned rule the next run re-checks ──
  if (o.reject) {
    for (const rj of (Array.isArray(o.reject) ? o.reject : [o.reject])) {
      const i = String(rj).indexOf(':');
      forge(memoryPath, { node: i > 0 ? String(rj).slice(0, i).trim() : 'review', reason: i > 0 ? String(rj).slice(i + 1).trim() : String(rj).trim() });
    }
  }
  const learnedRules = recallRules(memoryPath);

  const intent = captureIntent(requirementText, o);

  const intk = intake(requirementText, o);
  const mission = intk.mission;
  const outDir = o.outDir || join(repoRoot, 'out', intk.slug);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const wa = (name, content) => { const p = join(outDir, name); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, content); return name; };
  const mkdir = (name) => { const p = join(outDir, name); mkdirSync(p, { recursive: true }); return p; };

  const meter = [];
  const tick = (stage, ownerName, input, artifactText, artifact) => meter.push({ stage, agent: ownerName, inTok: estTokens(input), outTok: estTokens(artifactText), artifact });

  log(c.gold('━━━ Ed Agent · ' + mission.name + ' squad · nine human-gated stages ━━━'));
  log('Requirement:  ' + c.bold('"' + requirementText + '"'));
  if (applied.length) log(c.mag('Preferences:  applied ' + applied.join(', ')));

  // 1 INTAKE
  const a1 = `# 01 · Intake\n\n- **Requirement:** ${requirementText}\n- **Mission:** ${mission.name} (\`${mission.id}\`)\n- **Squad:** ${mission.squad.map((s) => s.name).join(' · ')}\n- **Domain:** ${intk.domain}${intk.jurisdiction ? `\n- **Jurisdiction:** ${intk.jurisdictionName} (\`${intk.jurisdiction}\`)` : ''}\n`;
  tick('intake', CONDUCTOR.name, requirementText, a1, wa('01-intake.md', a1));
  log(`\n[1/9] ${c.cyan('INTAKE')}    ${c.dim(CONDUCTOR.name)}  → ${mission.name} · ${intk.domain}`);

  // 2 CONTEXT (recall memory + preferences)
  const mem = recallMemory(memoryPath);
  const a2 = `# 02 · Context recall\n\n- Prior runs in memory: **${mem.priorRuns}**\n- Preferences recalled: **${pref.count}**${applied.length ? ' (applied: ' + applied.join(', ') + ')' : ''}\n` +
    (pref.likes.length ? `- Likes: ${pref.likes.join('; ')}\n` : '') + (pref.dislikes.length ? `- Dislikes: ${pref.dislikes.join('; ')}\n` : '') +
    (pref.concepts.length ? `- Concepts: ${pref.concepts.join('; ')}\n` : '') + `\n## Context carried forward\n\n${mem.contextFacts || '_(seeded)_'}\n`;
  tick('context', CONDUCTOR.name, mem.contextFacts + JSON.stringify(pref), a2, wa('02-context.md', a2));
  log(`[2/9] ${c.cyan('CONTEXT')}   ${c.dim(CONDUCTOR.name)}  → ${mem.priorRuns} prior run(s) · ${pref.count} preference(s)`);

  // 3 ANALYZE (learned rules from past rejections become extra concerns — empty on a fresh memory)
  const concerns = mission.concerns(requirementText);
  const concernsPlus = learnedRules.length ? [...concerns, ...rulesAsConcerns(learnedRules)] : concerns;
  const ana = analyze(intk, concernsPlus);
  const a3 = `# 03 · Analysis\n\n## Sub-requirements\n- ${ana.subRequirements.join('\n- ') || '(single)'}\n\n## Concerns to verify (${mission.name})\n- ${ana.concerns.join('\n- ')}\n\n## Constraints\n- ${ana.constraints.join('\n- ')}\n\n## Assumptions (honest)\n- ${ana.assumptions.join('\n- ')}\n`;
  tick('analyze', stageOwnerName(mission, 'plan'), requirementText, a3, wa('03-analysis.md', a3));
  log(`[3/9] ${c.cyan('ANALYZE')}   ${c.dim(stageOwnerName(mission, 'plan'))}  → ${ana.subRequirements.length} sub-reqs · ${ana.concerns.length} concerns`);

  // CP1 · FRAME — is the intent captured, or is the agent guessing the project?
  const fa = frameAssessment(requirementText, intent);
  const cp1 = makeCheckpoint('frame', 'Frame the problem', 'after-analyze', { questions: fa.questions, assessment: fa.md, resolution: resolutions.frame });
  wa('c1-frame-checkpoint.md', fa.md + (cp1.questions.length ? `\n## Open questions\n${cp1.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n` : '\n_Cleared — no open question._\n'));
  log(`  ${cp1.status === 'open' ? c.gold('◆ FRAME') : c.green('◇ FRAME')}    ${c.dim('checkpoint')}  → ${checkpointLine(cp1)}`);

  const brief = { ...intk, intent, subRequirements: ana.subRequirements, concerns: ana.concerns, constraints: ana.constraints, assumptions: ana.assumptions, prefs: pref };

  // engine (finance only)
  const engine = mission.build === 'eds-mcp' ? await loadEngine(o) : { wired: false };
  const ctx = { wa, mkdir, buildDir: join(outDir, '07-build'), engine, opts: o };

  // 4 RESEARCH
  const r = mission.research(brief, ctx);
  tick('research', stageOwnerName(mission, 'research'), JSON.stringify(ana.concerns), r.text, r.out);
  log(`[4/9] ${c.cyan('RESEARCH')}  ${c.dim(stageOwnerName(mission, 'research'))}  → ${r.summary}`);

  // 5 LEDGER (grow memory + quantify so far)
  checkpoint(memoryPath, { requirement: requirementText, domain: intk.domain + ' · ' + mission.name, jurisdictionName: intk.jurisdictionName, triggers: ana.concerns, coveragePct: r.coverage, findings: r.findings, conflicts: r.conflicts });
  const soFarIn = meter.reduce((a, s) => a + s.inTok, 0), soFarOut = meter.reduce((a, s) => a + s.outTok, 0);
  const a5 = `# 05 · Ledger checkpoint\n\nAnalysis + research written into \`Ed_agents_Claude.md\`; I/O ledger updated.\n\n- Estimated input so far: **${fmt(soFarIn)}** tokens\n- Estimated output so far: **${fmt(soFarOut)}** tokens\n\n_Estimates (~4 chars/token) — DesignOps cost-governance framing, not billed figures._\n`;
  tick('ledger', CONDUCTOR.name, String(soFarIn), a5, wa('05-ledger-checkpoint.md', a5));
  log(`[5/9] ${c.cyan('LEDGER')}    ${c.dim(CONDUCTOR.name)}  → memory updated · ${fmt(soFarIn)} in / ${fmt(soFarOut)} out (est)`);
  if (mission.build === 'eds-mcp') log(c.dim('       engine: ' + (engine.wired ? 'eds-mcp wired (' + engine.stats.components + ' components)' : 'eds-mcp not found — contract-only build')));

  // 6 PLAN / DESIGN  → APPROVE gate
  const p = mission.plan(brief, ctx);
  tick('plan', stageOwnerName(mission, 'plan'), requirementText, p.text, p.out);
  const approveGate = gate('Plan / design approval', stageOwnerName(mission, 'plan') + ' → human', o.approve);
  log(`[6/9] ${c.cyan('PLAN')}      ${c.dim(stageOwnerName(mission, 'plan'))}  → ${p.summary}  ${approveGate.status === 'approved' ? c.green(gateLine(approveGate)) : c.gold(gateLine(approveGate))}`);

  // 7 PRODUCE / DEVELOP
  const pr = mission.produce(brief, ctx);
  tick('develop', stageOwnerName(mission, 'produce'), brief.subRequirements.join(','), pr.text, pr.out);
  log(`[7/9] ${c.cyan('PRODUCE')}   ${c.dim(stageOwnerName(mission, 'produce'))}  → ${pr.summary}`);

  // 7b INNER LOOP (v0.6) — OPT-IN (--loop). Refine the produced artifact in a deterministic
  // produce→verify→(rollback) loop BEFORE review sees it: severity gate + overshoot rollback +
  // iron-law hard-halt + budget fuse, with a WHAT/WHY/PATTERN audit trail. Off by default, so the
  // meter stays nine stages and the verdict is byte-stable. A crossed red line opens a checkpoint
  // (only created here), so the loop still never bypasses the human.
  let refined = null, loopRes = null, cpIron = null;
  if (o.loop) {
    const seed = ctx._produced || pr.text || requirementText;
    loopRes = refineLoop({ artifact: seed, mission, intent, learnedRules, maxIter: o.loopMax ? Number(o.loopMax) : 6, target: o.target != null ? Number(o.target) : 8 });
    refined = loopRes.best.artifact;
    ctx._produced = refined;
    const lb = loopBlock(loopRes);
    tick('loop', stageOwnerName(mission, 'review'), seed, lb, wa('07b-loop.md', lb));
    log(`  ${loopRes.ironLaw.crossed ? c.gold('◆ LOOP') : c.green('◇ LOOP')}     ${c.dim(stageOwnerName(mission, 'review'))}  → ${loopRes.exitReason.toUpperCase()} · sev ${loopRes.startScore}→${loopRes.endScore} · ${loopRes.iterations} iter${loopRes.rolledBack ? ' · rolled back' : ''}`);
    if (loopRes.ironLaw.crossed) {
      cpIron = makeCheckpoint('ironlaw', 'Iron law — red line crossed', 'in-loop', { questions: ironLawQuestions(loopRes.ironLaw), assessment: lb, resolution: resolutions.ironlaw });
      wa('c-ironlaw-checkpoint.md', lb);
    }
  }

  // 8 REVIEW / QA
  const rv = mission.review(brief, ctx);
  tick('qa', stageOwnerName(mission, 'review'), brief.requirement, rv.text, rv.out);
  log(`[8/9] ${c.cyan('REVIEW')}    ${c.dim(stageOwnerName(mission, 'review'))}  → ${rv.summary}`);

  // 8b RED TEAM + CLAIM GROUNDING (v0.5) — additive, report-only by default. Both are pure
  // deterministic passes (~0 token). They write a report artifact and never change the
  // shippable verdict unless --strict is set (then critical/contradicted feed a checkpoint).
  const rtArtifact = refined || ctx._produced || pr.text || requirementText;
  const rt = redTeamScan(rtArtifact, { mission, intent });
  const gr = groundClaims(rtArtifact, { mission, intent });
  wa('08b-redteam-grounding.md', `# 08b · Red team + claim grounding\n\n_${o.strict ? 'STRICT — critical findings + contradicted claims must be resolved at the red-team checkpoint.' : 'Report-only (default) — surfaced for your judgment; does not change the verdict. Run with --strict to gate on critical findings.'}_\n` + redTeamBlock(rt) + groundingBlock(gr));
  log(`  ${rt.counts.critical ? c.gold('◆ REDTEAM') : c.green('◇ REDTEAM')}  ${c.dim(stageOwnerName(mission, 'review'))}  → ${rt.findings.length} finding(s) · ${rt.counts.critical} critical · grounding ${gr.counts.grounded}G/${gr.counts.ungrounded}U/${gr.counts.contradicted}C${o.strict ? c.gold(' · strict') : c.dim(' · report-only')}`);

  // 9 CERTIFY → SIGN-OFF gate
  const cf = mission.certify(brief, ctx);
  const signoffGate = gate('Certification sign-off', stageOwnerName(mission, 'certify') + ' → human', o.signoff);
  const gates = [approveGate, signoffGate];

  // CP2 · TRUST & GLOBAL — should you trust it, and does the local optimum serve the goal?
  const sig = {
    text: refined || pr.text || ctx._produced || requirementText,
    provenance: (engine.wired || (r.sources && r.sources.length)) ? 'derived' : 'inferred',
    verified: (mission.build === 'eds-mcp' && engine.wired) || (cf.count > 0),
    testsScaffolded: cf.count || 0, reviewIssues: rv.issues || 0,
  };
  const ta = trustAssessment({ text: sig.text, decisions: ana.subRequirements, intent, sig });
  const cp2 = makeCheckpoint('trust', 'Trust & global coherence', 'after-review', { questions: ta.questions, assessment: ta.md, resolution: resolutions.trust });
  wa('c2-trust-checkpoint.md', ta.md + (cp2.questions.length ? `\n## Open questions\n${cp2.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n` : '\n_Cleared — no open question._\n'));

  // CP3 · RED TEAM (only under --strict) — critical findings + contradicted claims become
  // the questions a human must consciously accept. In the default report-only mode this
  // checkpoint is not created, so the checkpoints array (and the verdict) stay byte-stable.
  const cp3 = o.strict
    ? makeCheckpoint('redteam', 'Red team & grounding (strict)', 'after-review', {
        questions: [...redTeamQuestions(rt), ...groundingQuestions(gr)],
        assessment: redTeamBlock(rt) + groundingBlock(gr),
        resolution: resolutions.redteam,
      })
    : null;
  if (cp3) wa('c3-redteam-checkpoint.md', cp3.assessment + (cp3.questions.length ? `\n## Open questions\n${cp3.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n` : '\n_Cleared — no critical finding / contradiction._\n'));

  const checkpoints = [cp1, cp2, ...(cp3 ? [cp3] : []), ...(cpIron ? [cpIron] : [])];
  const shippable = allCleared(gates) && allCheckpointsCleared(checkpoints);
  const a10 = `# 10 · Certification\n\n- Mission: **${mission.name}**\n- Conformance / checklist: ${cf.summary}\n- Trust: **${ta.trust.level}** (${ta.trust.score}/100) · Substance: **${ta.substance.verdict}** (${ta.substance.substanceScore}/100)\n- Review issues: ${rv.issues || 0}\n- Research coverage: ${r.coverage}%\n\n## Gates\n${gates.map((g) => '- ' + gateLine(g)).join('\n')}\n\n## Deliberation checkpoints\n${checkpoints.map((cp) => '- ' + checkpointLine(cp)).join('\n')}\n\n## Verdict\n**${shippable ? 'SHIPPABLE — gates cleared, deliberation closed.' : 'NOT YET SHIPPABLE — ' + (openCheckpoints(checkpoints).length ? openCheckpoints(checkpoints).length + ' open checkpoint(s) need your judgment; ' : '') + 'gate(s)/checkpoint(s) pending. The harness does not bypass them.'}**\n\n_What the ${mission.name} squad did: intake, analysis, sourced research, plan, produce, review — and surfaced the trust + global-coherence questions. What stays human: the judgment, the two checkpoints, and the two gates._\n`;
  tick('certify', stageOwnerName(mission, 'certify'), String(cf.count), a10, wa('10-certification.md', a10));
  log(`[9/9] ${c.cyan('CERTIFY')}   ${c.dim(stageOwnerName(mission, 'certify'))}  → ${cf.summary}  ${shippable ? c.green(gateLine(signoffGate)) : c.gold(gateLine(signoffGate))}`);
  log(`  ${cp2.status === 'open' ? c.gold('◆ TRUST') : c.green('◇ TRUST')}    ${c.dim('checkpoint')}  → ${checkpointLine(cp2)}`);

  const totals = commit(memoryPath, { slug: intk.slug, requirement: requirementText, mission: mission.name, domain: intk.domain, jurisdictionName: intk.jurisdictionName, coveragePct: r.coverage, conflicts: r.conflicts, gates, checkpoints, shippable, meter });

  const oq = openQuestions(checkpoints);
  log('');
  if (oq.length) {
    log(c.gold('━━━ IN DELIBERATION — your judgment is required ━━━'));
    oq.forEach((q, i) => log(c.gold(`  ${i + 1}. `) + c.dim('[' + q.node + '] ') + q.question));
    log(c.dim('  Resolve with --resolve "frame: <answer>" / --resolve "trust: <answer>" (or via the MCP loop).'));
    log('');
  }
  log(c.gold('━━━ done ━━━'));
  log(`Squad:      ${mission.squad.map((s) => s.name).join(' · ')}`);
  log(`Trust:      ${ta.trust.level} (${ta.trust.score}/100) · Substance: ${ta.substance.verdict}`);
  log(`Artifacts:  ${c.bold(outDir)}`);
  log(`Memory:     Ed_agents_Claude.md  (run #${mem.priorRuns + 1})`);
  log(`I/O (est):  ${c.bold(fmt(totals.totIn))} in / ${c.bold(fmt(totals.totOut))} out`);
  log(`Verdict:    ${shippable ? c.green('SHIPPABLE') : c.gold(oq.length ? 'IN DELIBERATION — ' + oq.length + ' open question(s)' : 'gates pending — not bypassed')}`);

  return { slug: intk.slug, outDir, mission: mission.id, missionName: mission.name, squad: mission.squad.map((s) => s.name), domain: intk.domain, jurisdiction: intk.jurisdiction, jurisdictionName: intk.jurisdictionName, concerns: ana.concerns, coveragePct: r.coverage, conflicts: r.conflicts, findings: r.findings, gates, checkpoints, openQuestions: oq, inDeliberation: oq.length > 0, trust: ta.trust, substance: ta.substance, coherence: ta.coherence, intentStated: intent.stated, redteam: { counts: rt.counts, findings: rt.findings.length, block: rt.block }, grounding: gr.counts, strict: !!o.strict, shippable, meter, totals, wired: !!engine.wired, priorRuns: mem.priorRuns, prefsApplied: applied, prefsCount: pref.count,
    loop: loopRes ? { exitReason: loopRes.exitReason, startScore: loopRes.startScore, endScore: loopRes.endScore, iterations: loopRes.iterations, rolledBack: loopRes.rolledBack, ironLawCrossed: loopRes.ironLaw.crossed } : null,
    learnedRules: learnedRules.length };
}

export { prefs };
