#!/usr/bin/env node
// ed-agent.test.mjs — zero-dependency contract test for v0.2: missions, skills,
// the learning memory, and the gates.
import { run, prefs } from '../src/orchestrator.mjs';
import { detectMission } from '../src/missions/index.mjs';
import { aiToneScan, blindScore, verdict } from '../src/skills/quality.mjs';
import { captureIntent } from '../src/skills/trust.mjs';
import { redTeamScan, redTeamQuestions } from '../src/skills/redteam.mjs';
import { groundClaims } from '../src/skills/grounding.mjs';
import { auditArtifact } from '../src/deliberate.mjs';
import { refineLoop, severity } from '../src/loop.mjs';
import { checkIronLaws } from '../src/skills/ironlaws.mjs';
import { forge, recallRules, ruleHits } from '../src/flywheel.mjs';
import { existsSync, readFileSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓ ' + m); else { console.error('  ✗ ' + m); fails++; } };
const tmp = mkdtempSync(join(tmpdir(), 'edagent-'));
const mem = join(tmp, 'Ed_agents_Claude.md');

console.log('mission detection');
ok(detectMission('Build a REST API service with auth').id === 'code', 'engineering req → code squad');
ok(detectMission('Launch an SEO landing page campaign').id === 'marketing', 'growth req → marketing squad');
ok(detectMission('Draft an NDA with a liability cap').id === 'contract', 'legal req → contract squad');
ok(detectMission('KYC onboarding with EDD source of funds').id === 'finance', 'regulated req → finance squad');
ok(detectMission('Review and optimize this case study copy').id === 'optimize', 'review req → optimize squad');
ok(detectMission('優化這段文案並去AI化').id === 'optimize', 'Chinese optimize req → optimize squad');
ok(detectMission('anything', 'marketing').id === 'marketing', 'explicit --mission overrides detection');

console.log('\nquality disciplines (pure)');
const aiy = 'In conclusion, our world-class platform will seamlessly leverage cutting-edge synergy. まさにシームレスで革新的なソリューション。總之，這個方案能賦能企業。';
ok(aiToneScan(aiy).reduce((a, h) => a + h.count, 0) >= 5 && aiToneScan(aiy).some((h) => h.lang === 'ja') && aiToneScan(aiy).some((h) => h.lang === 'zh'), 'aiToneScan flags EN + JA + ZH filler');
const sBad = blindScore(aiy), sGood = blindScore('The redesign cut KYC drop-off from 73% to 45% (GA4, n=12,847), saving each analyst 1.5 days per screen.');
ok(sBad.dims.length === 5 && sBad.overall < 60 && verdict(sBad).label === 'REWORK', 'weak content → REWORK with 5 scored dims');
ok(sGood.overall >= 70 && verdict(sGood).label === 'PASS', 'quantified content → PASS');

console.log('\nfinance run — 9 artifacts, gates pending, conflict quarantined');
const fin = await run('Build a KYC onboarding step — EDD with source of funds', { outDir: join(tmp, 'fin'), memoryPath: mem, quiet: true });
for (const a of ['01-intake.md', '02-context.md', '03-analysis.md', '04-research-brief.md', '05-ledger-checkpoint.md', '06-plan.md', '07-build/_manifest.md', '08-review.md', '10-certification.md'])
  ok(existsSync(join(tmp, 'fin', a)), 'artifact: ' + a);
ok(fin.mission === 'finance', 'KYC routed to finance');
ok(fin.meter.length === 9 && fin.meter.every((s) => s.outTok > 0), 'meter quantifies 9 stages');
ok(fin.conflicts >= 1, 'EDD source-of-funds conflict quarantined');
ok(fin.gates.length === 2 && fin.gates.every((g) => g.status === 'pending') && fin.shippable === false, 'gates pending → not shippable');

console.log('\nnon-finance squads produce their own artifacts');
const code = await run('Build a backend API with input validation and error handling', { outDir: join(tmp, 'code'), memoryPath: mem, quiet: true });
ok(code.mission === 'code' && code.squad.includes('Architect'), 'code squad assembled');
ok(existsSync(join(tmp, 'code', '07-build', 'test-plan.md')) && existsSync(join(tmp, 'code', '07-build', 'README-draft.md')), 'code produces test plan + README');
const mkt = await run('Launch a landing page campaign with a signup funnel', { outDir: join(tmp, 'mkt'), memoryPath: mem, quiet: true });
ok(mkt.mission === 'marketing' && existsSync(join(tmp, 'mkt', '07-build', 'conversion-model.md')), 'marketing produces a conversion model');
const con = await run('Draft a vendor MSA with liability cap and IP ownership', { outDir: join(tmp, 'con'), memoryPath: mem, quiet: true });
ok(con.mission === 'contract' && existsSync(join(tmp, 'con', '07-build', 'risk-register.md')), 'contract produces a risk register');
ok(readFileSync(join(tmp, 'code', '08-review.md'), 'utf8').includes('Quality discipline'), 'quality discipline folded into a skill mission review');

console.log('\noptimize squad — diagnose, debate (eds-mcp-quantified), de-AI, 3-part output');
const opt = await run('In conclusion, our world-class KYC onboarding will seamlessly leverage cutting-edge tech to improve the experience and unlock value under ASIC rules in Australia.', { outDir: join(tmp, 'opt'), memoryPath: mem, quiet: true });
ok(opt.mission === 'optimize' && opt.squad.some((s) => /Reviewer B/.test(s)), 'optimize squad assembled');
ok(opt.conflicts >= 5 && opt.shippable === false, 'AI-tone tells flagged · gates pending (not bypassed)');
ok(existsSync(join(tmp, 'opt', '09-final-output.md')) && readFileSync(join(tmp, 'opt', '09-final-output.md'), 'utf8').includes('Expert diagnostic / 専門家による診断'), 'optimize writes the three-part output (EN + JA)');
ok(/KycStepper/.test(readFileSync(join(tmp, 'opt', '06-plan.md'), 'utf8')), 'Data officer quantifies the regulated surface against eds-mcp');

console.log('\ngates + deliberation cleared → shippable');
const ship = await run('Originate a consumer loan', { outDir: join(tmp, 'ship'), memoryPath: mem, approve: 'Ed Chen', signoff: 'Ed Chen', intent: 'approve creditworthy borrowers fast without over-lending', done: 'approval rate and default rate both tracked', not: 'no predatory APR; no auto-approve without an affordability check', resolve: ['trust: reviewed and accepted'], quiet: true });
ok(ship.gates.every((g) => g.status === 'approved') && ship.shippable === true, '--approve + --signoff + intent + resolve → gates AND checkpoints cleared → shippable');
ok(ship.checkpoints.every((c) => c.status === 'cleared'), 'both deliberation checkpoints cleared');
ok(ship.jurisdiction === 'uk', 'lending routed to UK');

console.log('\ndeliberation — surface the question, never bypass it');
const dmem = join(tmp, 'delib-mem.md');
const noIntent = await run('Build a payment retry flow', { outDir: join(tmp, 'di'), memoryPath: dmem, approve: 'Ed', signoff: 'Ed', quiet: true });
ok(noIntent.inDeliberation === true && noIntent.openQuestions.length >= 3, 'unstated intent → FRAME checkpoint opens with questions');
ok(noIntent.checkpoints[0].status === 'open' && noIntent.shippable === false, 'an open checkpoint blocks shippable even with both gates approved');
const framed = await run('Build a payment retry flow', { outDir: join(tmp, 'df'), memoryPath: dmem, approve: 'Ed', signoff: 'Ed', intent: 'cut failed-payment churn', not: 'no auto-charge without consent', resolve: ['trust: accepted'], quiet: true });
ok(framed.inDeliberation === false && framed.shippable === true, 'stated intent + resolved trust → deliberation closed → shippable');

console.log('\nstandalone audit + trust assessors (point at an artifact / diff)');
const audit = auditArtifact('# Handler\nRobust enterprise-grade production-ready retry. Migrate the payments schema and deploy to prod.\ntry { go() } catch (e) {}\n// TODO\nMay generally work.', { intent: 'cut failed-payment churn', not: 'do not change the payments schema' });
ok(audit.status === 'NEEDS DELIBERATION' && audit.coherence.localOptima.length >= 1, 'audit flags the non-goal local optimum (technically right, business-wrong)');
ok(audit.trust.level === 'LOW' && audit.substance.verdict === 'CEREMONY', 'audit: LOW trust + CEREMONY substance on over-defensive code');
ok(captureIntent('x', {}).stated === false && !!captureIntent('x', {}).risk, 'intent capture flags unstated intent as the #1 risk');
ok(captureIntent('x', { intent: 'goal' }).stated === true, 'intent capture records a stated goal');

console.log('\nlearning memory');
prefs.record(mem, [{ kind: 'prefer', text: 'mission: marketing' }, { kind: 'like', text: 'dense tables' }]);
const p = prefs.recall(mem);
ok(p.prefs.mission === 'marketing' && p.likes.includes('dense tables'), 'preferences recorded + recalled');
const applied = await run('Make me something', { outDir: join(tmp, 'pref'), memoryPath: mem, quiet: true });
ok(applied.mission === 'marketing', 'preferred mission applied when none is specified');
ok(applied.prefsApplied.some((x) => x.includes('marketing')), 'run reports the applied preference');
// dashboard-set run defaults (target/loop/strict/loop-max) are honored — but only when UNSET (byte-stable)
const defmem = join(tmp, 'defaults.md');
prefs.record(defmem, [{ kind: 'prefer', text: 'target: 4' }, { kind: 'prefer', text: 'loop: true' }, { kind: 'prefer', text: 'strict: true' }, { kind: 'prefer', text: 'loop-max: 5' }]);
const ap = prefs.apply(prefs.recall(defmem), {});
ok(ap.opts.target === 4 && ap.opts.loop === true && ap.opts.strict === true && ap.opts.loopMax === 5, 'prefs.apply honors dashboard-set target/loop/strict/loop-max defaults');
ok(prefs.apply(prefs.recall(defmem), { target: 9, loop: false }).opts.target === 9, 'an explicit run option still overrides the preference (fill-only-when-unset)');
ok(prefs.apply({ prefs: {}, likes: [], dislikes: [], concepts: [] }, {}).applied.length === 0, 'no preferences → nothing applied (byte-stable)');

console.log('\nmemory ledger');
const memTxt = readFileSync(mem, 'utf8');
ok((memTxt.match(/^## Run \d{4}-/gm) || []).length === 7, 'seven run entries appended');
ok(/\*\*Mission:\*\*/.test(memTxt), 'run entries record the mission');
ok(/## Preferences/.test(memTxt), 'preferences section present');

console.log('\nred team — mission-aware adversarial pass (pure, ~0 token)');
const rtCode = redTeamScan('const apiKey = "sk-live-abc123def456";\ntry { charge() } catch (e) {}', { mission: { id: 'code' } });
ok(rtCode.counts.critical >= 1 && rtCode.findings.some((f) => f.id === 'hardcoded-secret'), 'code: hardcoded secret → critical');
ok(rtCode.findings.some((f) => f.id === 'empty-catch'), 'code: empty catch → high');
const rtMkt = redTeamScan('Our world-class platform delivers 50% better outcomes.', { mission: { id: 'marketing' } });
ok(rtMkt.findings.some((f) => f.id === 'superlative-no-source') && rtMkt.findings.some((f) => f.id === 'fabricated-stat-shape'), 'marketing: unsourced superlative + naked stat flagged');
const rtCon = redTeamScan('The vendor must use reasonable efforts and may at its sole discretion terminate; indemnify against all claims.', { mission: { id: 'contract' } });
ok(rtCon.findings.some((f) => f.id === 'ambiguous-quantifier') && rtCon.findings.some((f) => f.id === 'unilateral-right') && rtCon.findings.some((f) => f.id === 'missing-carveout'), 'contract: ambiguous quantifier + one-sided right + missing carve-out');
const rtFin = redTeamScan('The KYC step collects source of funds for EDD verification.', { mission: { id: 'finance' } });
ok(rtFin.findings.some((f) => f.id === 'regulated-claim-no-anchor'), 'finance: regulated claim with no anchor flagged');
ok([rtCode, rtMkt, rtCon, rtFin].every((r) => /does NOT replace a human expert/i.test(r.coverage)), 'every report states its own coverage (honest — passes its own test)');
const intentNG = captureIntent('x', { intent: 'cut failed-payment churn', nonGoals: 'do not migrate the payments schema' });
const rtUni = redTeamScan('Add a retry flow.\nMigrate the payments schema for speed.', { mission: { id: 'universal' }, intent: intentNG });
ok(rtUni.counts.critical >= 1 && redTeamQuestions(rtUni).length >= 1, 'universal: a non-goal contradiction is a critical finding + a human question');

console.log('\nclaim grounding — three states + universal fallback (no domain pack)');
const gr = groundClaims('We will migrate the payments schema.\nValidate input per OWASP ASVS V5.\nWe should add a generic helper.', { intent: intentNG });
ok(gr.counts.contradicted >= 1, 'Contradicted: violates a stated non-goal');
ok(gr.counts.grounded >= 1, 'Grounded: traces to a cited source (per OWASP …)');
ok(gr.counts.ungrounded >= 1, 'Ungrounded: a confident decision with nothing behind it');
ok(gr.mission === 'universal', 'grounding runs with zero domain pack (universal source = intent)');

console.log('\n--strict — report-only by default, opt-in gate (verdict byte-stable when off)');
const smem = join(tmp, 'strict-mem.md');
const rOpts = { mission: 'code', intent: 'cut failed-payment churn', nonGoals: 'do not migrate the payments schema', approve: 'Ed', signoff: 'Ed', resolve: ['trust: ok'], quiet: true };
const repOnly = await run('Add a payment retry flow and migrate the payments schema', { ...rOpts, outDir: join(tmp, 'rep'), memoryPath: smem });
ok(repOnly.checkpoints.map((c) => c.id).join(',') === 'frame,trust' && repOnly.shippable === true && repOnly.redteam.counts.critical >= 1, 'default: critical surfaced but NOT blocking — checkpoints + verdict byte-stable');
const strictBlocked = await run('Add a payment retry flow and migrate the payments schema', { ...rOpts, strict: true, outDir: join(tmp, 'st'), memoryPath: smem });
ok(strictBlocked.checkpoints.some((c) => c.id === 'redteam' && c.status === 'open') && strictBlocked.shippable === false, '--strict: the contradiction opens a red-team checkpoint → not shippable (not bypassed)');
const strictResolved = await run('Add a payment retry flow and migrate the payments schema', { ...rOpts, strict: true, resolve: ['trust: ok', 'redteam: accepted — conscious trade-off'], outDir: join(tmp, 'sr'), memoryPath: smem });
ok(strictResolved.shippable === true, '--strict + --resolve "redteam: …": the human consciously accepts → shippable (proposes, never disposes)');

console.log('\nv0.6 inner loop — produce → verify → (rollback), deterministic ~0 token');
const messy = '# Build\nIn conclusion, our world-class seamless platform leverages cutting-edge synergy.\nconst apiKey = "sk-live-abc123def456";\ntry { charge() } catch (e) {}\nValidate input per OWASP ASVS V5.';
const lr = refineLoop({ artifact: messy, mission: { id: 'code' }, intent: captureIntent(messy, {}), maxIter: 8, target: 6 });
ok(lr.startScore > lr.endScore, 'loop converges — severity drops from start toward the deterministic floor');
ok(lr.trace.length >= 2 && lr.trace.every((t) => 'what' in t && 'why' in t && 'pattern' in t), 'every iteration writes a WHAT/WHY/PATTERN audit line');
ok(lr.exitReason !== 'iron-law' && Array.isArray(lr.residual.findings), 'residual is surfaced (escalated), not faked');

let osc = 0;
const oscillate = (a) => (osc++ === 0 ? a + '\nmore world-class best-in-class noise' : a + '\nconst secret = "sk-live-zzzzzz999999";');
const rb = refineLoop({ artifact: 'A clean baseline statement about the work and its result.', mission: { id: 'code' }, intent: captureIntent('x', {}), produce: oscillate, maxIter: 6, target: 0, patience: 2 });
ok(rb.exitReason === 'overshoot-rollback' && rb.rolledBack === true, 'a regressing producer triggers overshoot rollback (the safety valve for a non-deterministic producer)');
ok(rb.best.score <= Math.max(...rb.severityHistory), 'the shipped artifact is the best-severity version, never the regressed one');

const il = refineLoop({ artifact: 'Add a step to bypass the KYC check and auto-execute the fund transfer.', mission: { id: 'finance' }, intent: captureIntent('x', {}), maxIter: 6 });
ok(il.exitReason === 'iron-law' && il.ironLaw.crossed && il.ironLaw.trips.length >= 1, 'a crossed red line HARD-HALTS the loop (iron law) — not a judgment call');
ok(checkIronLaws('The pipeline will auto-approve and bypass the human sign-off.', 'code').trips.some((t) => t.id === 'no-self-authority'), 'universal iron law: no self-authority / gate bypass');
ok(checkIronLaws('Add a KYC step that shows the legal basis inline.', 'finance').crossed === false, 'iron laws do not false-positive on a normal compliant requirement');
ok(severity(messy, { mission: { id: 'code' } }).score > severity('The redesign cut KYC drop-off from 73% to 45% (GA4, n=12847) per the funnel study.', { mission: { id: 'code' } }).score, 'severity scores a messy artifact worse than a clean, sourced one');

console.log('\nv0.6 --loop in the pipeline — opt-in, default byte-stable');
const lmem = join(tmp, 'loop-mem.md');
const noLoop = await run('Build a backend API with input validation and error handling', { outDir: join(tmp, 'nl'), memoryPath: lmem, quiet: true });
ok(noLoop.meter.length === 9 && noLoop.checkpoints.map((c) => c.id).join(',') === 'frame,trust' && noLoop.loop === null, 'default (no --loop): meter stays 9 stages · checkpoints frame,trust · loop off (byte-stable)');
const withLoop = await run('Build a backend API with input validation and error handling', { loop: true, outDir: join(tmp, 'wl'), memoryPath: lmem, quiet: true });
ok(withLoop.meter.length === 10 && existsSync(join(tmp, 'wl', '07b-loop.md')) && !!withLoop.loop && !!withLoop.loop.exitReason, '--loop: adds the loop stage + writes 07b-loop.md + reports the exit reason');
ok(withLoop.loop.startScore >= withLoop.loop.endScore, '--loop never ships a worse artifact than it started with');

console.log('\nv0.6 flywheel — a rejection forges a learned rule the next run re-checks');
const fmem = join(tmp, 'fly-mem.md');
forge(fmem, { node: 'trust', reason: 'violates MiFID II best execution' });
const frules = recallRules(fmem);
ok(frules.length === 1 && frules[0].kind === 'regulation' && /MiFID/i.test(frules[0].pattern), 'forge extracts the regulation token as the trigger + keeps the reason');
ok(ruleHits('This order routing ignores MiFID II best execution.', frules).length === 1, 'ruleHits re-detects the learned pattern on a later artifact');
const injected = await run('Design an order routing screen for best execution', { mission: 'finance', outDir: join(tmp, 'inj'), memoryPath: fmem, quiet: true });
ok(injected.learnedRules === 1 && readFileSync(join(tmp, 'inj', '03-analysis.md'), 'utf8').includes('Learned rule'), 'the learned rule is injected into the next run as an analysis concern');

rmSync(tmp, { recursive: true, force: true });
console.log(fails === 0 ? '\nPASS — squads swap, skills produce, memory learns, gates hold, red team + grounding run report-only, the inner loop self-corrects with rollback + iron-law halt, the flywheel learns.' : `\nFAIL — ${fails} check(s) failed.`);
process.exit(fails === 0 ? 0 : 1);
