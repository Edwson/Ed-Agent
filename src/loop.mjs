// loop.mjs — the inner produce→verify→(rollback)→repeat engine (v0.6). This is the
// "chained nuclear engine": an artifact is refined in a tight inner loop, scored every
// iteration by the deterministic assessors, with four safety mechanisms that make a
// self-iterating loop survivable instead of a budget-burning runaway ("Loopmaxxing"):
//
//   1. SEVERITY GATE   — a composite 0..∞ score from the verified assessors. The loop
//                        exits when severity ≤ target. (~0 token; redteam/grounding/blind/substance.)
//   2. OVERSHOOT ROLLBACK — a version buffer keeps the best-severity artifact. If a producer
//                        makes it worse for `patience` consecutive steps, roll back to best + stop.
//   3. IRON-LAW HARD-HALT — a crossed red line stops the loop immediately and escalates.
//   4. BUDGET FUSE     — a hard maxIter cap. The loop can never run forever.
//
//   FORCED AMNESIA: the producer receives ONLY the current artifact + its findings — never a
//   growing transcript. State lives on disk / in the buffer, not in an ever-expanding context;
//   that is what lets the loop run many iterations without context-collapse.
//   INTROSPECTION: every iteration writes a WHAT / WHY / PATTERN journal entry (a court-grade
//   audit trail of how the artifact changed and why the loop did what it did).
//
// The PRODUCER is pluggable. In the default in-harness mode it is `remediate` — a set of
// DETERMINISTIC monotone fixers (so it can only improve, and the loop converges to the floor
// of what deterministic fixes can reach; the residual is escalated to a human, never faked).
// Wire a non-deterministic host LLM as the producer and it can overshoot — which is exactly
// when mechanism #2 earns its place. Either way the verifier / rollback / iron-laws / budget
// are deterministic ~0-token control: the model produces, the harness governs.
import { redTeamScan } from './skills/redteam.mjs';
import { groundClaims } from './skills/grounding.mjs';
import { blindScore, humanTone } from './skills/quality.mjs';
import { substanceScan } from './skills/trust.mjs';
import { checkIronLaws } from './skills/ironlaws.mjs';
import { ruleHits } from './flywheel.mjs';

const SEVW = { critical: 25, high: 10, medium: 4, low: 1 };

/** Composite severity (lower = better). Pure; reuses the verified assessors. */
export function severity(artifact, ctx = {}) {
  const rt = redTeamScan(artifact, ctx);
  const gr = groundClaims(artifact, ctx);
  const bs = blindScore(artifact);
  const ss = substanceScan(artifact);
  const learned = ctx.learnedRules ? ruleHits(artifact, ctx.learnedRules) : [];

  let score = 0;
  for (const f of rt.findings) score += SEVW[f.severity] || 1;
  score += gr.counts.contradicted * 20 + gr.counts.ungrounded * 2;
  score += Math.max(0, 70 - bs.overall) * 0.5;       // shortfall below the pass bar
  if (ss.verdict === 'CEREMONY') score += 8;
  for (const h of learned) score += SEVW[h.rule.severity] || 4;

  const components = {
    redteam: rt.findings.reduce((a, f) => a + (SEVW[f.severity] || 1), 0),
    grounding: gr.counts.contradicted * 20 + gr.counts.ungrounded * 2,
    quality: Math.round(Math.max(0, 70 - bs.overall) * 0.5),
    ceremony: ss.verdict === 'CEREMONY' ? 8 : 0,
    learned: learned.reduce((a, h) => a + (SEVW[h.rule.severity] || 4), 0),
  };
  return {
    score: Math.round(score), components,
    counts: rt.counts, grounding: gr.counts, blind: bs.overall, substance: ss.verdict,
    findings: rt.findings, learned,
  };
}

// ── deterministic monotone fixers, keyed by the finding id they resolve ──
const FIXERS = {
  'ai-tone-filler': (t) => { const r = humanTone(t); return r.removed ? r.text : null; },
  'empty-ceremony': (t) => { const r = humanTone(t); return r.removed ? r.text : null; },
  'empty-catch': (t) => {
    const out = t.replace(/catch\s*(\(([^)]*)\))?\s*\{\s*(\/\/[^\n]*\s*)?\}/g,
      (_m, _g, p) => `catch (${(p || 'err').trim() || 'err'}) { /* fail closed */ logError(${(p || 'err').trim() || 'err'}); throw ${(p || 'err').trim() || 'err'}; }`);
    return out !== t ? out : null;
  },
  'hardcoded-secret': (t) => {
    const out = t.replace(/(\b(?:api[_-]?key|secret|password|passwd|token|access[_-]?key)\b\s*[:=]\s*)['"][^'"]{6,}['"]/gi,
      (_m, lhs) => `${lhs}process.env.SECRET /* read from a managed secret store */`);
    return out !== t ? out : null;
  },
  'superlative-no-source': (t) => {
    const out = t.replace(/\b(world-class|best-in-class|the best|#1|number one|market-leading|industry-leading|unmatched|unrivalled|guaranteed)\b\s*/gi, '');
    return out !== t ? out.replace(/[ \t]{2,}/g, ' ') : null;
  },
  'missing-disclaimer': (t) => {
    if (/(not (financial|investment) advice|capital at risk|past performance)/i.test(t)) return null;
    return t.trimEnd() + '\n\n_Capital at risk. Not financial advice. Past performance is not indicative of future results._';
  },
};

/**
 * Deterministic remediator (default producer). Fixes the SINGLE highest-severity finding
 * that has a fixer — one disciplined fix per pass, then re-verify. Monotone by construction:
 * it can only remove a finding, never add one. Returns { text, fixedId } or { text, fixedId:null }
 * when nothing deterministic remains (→ the residual escalates to a human).
 */
export function remediate(artifact, findings, _ctx = {}) {
  for (const f of findings) {
    const fixer = FIXERS[f.id];
    if (!fixer) continue;
    const next = fixer(artifact);
    if (next != null && next !== artifact) return { text: next, fixedId: f.id };
  }
  return { text: artifact, fixedId: null };
}

const trajectory = (prev, cur, best) =>
  cur <= 0 ? 'pass'
    : prev == null ? 'baseline'
      : cur < prev ? 'converging'
        : cur > prev ? 'overshoot'
          : cur > best ? 'plateau-above-best' : 'plateau';

/**
 * The inner loop. opts:
 *   artifact, mission, intent, learnedRules
 *   produce(artifact, findings, ctx) → newArtifact   (default: remediate)
 *   maxIter (budget fuse, default 6), target (severity exit, default 8), patience (overshoot, default 2)
 * Returns { best, exitReason, iterations, severityHistory, trace, ironLaw, residual }.
 */
export function refineLoop(opts = {}) {
  const mission = opts.mission || {};
  const mid = mission.id || 'universal';
  const sctx = { mission, intent: opts.intent || { stated: false, goal: '', nonGoals: [] }, learnedRules: opts.learnedRules || [] };
  const produce = typeof opts.produce === 'function' ? opts.produce : remediate;
  const maxIter = Math.max(1, opts.maxIter || 6);
  const target = opts.target != null ? opts.target : 8;
  const patience = Math.max(1, opts.patience || 2);

  let artifact = String(opts.artifact || '');
  const buffer = [];           // { iter, artifact, score }
  const history = [];          // score per iteration
  const trace = [];            // { iter, what, why, pattern, fixedId, score, delta }
  let best = { iter: 0, artifact, score: Infinity };
  let worseStreak = 0;
  let exitReason = 'budget';
  let ironLaw = { crossed: false, trips: [] };
  let prevScore = null;

  for (let iter = 0; iter <= maxIter; iter++) {
    // iron law FIRST — a crossed red line halts before anything else
    const il = checkIronLaws(artifact, mid);
    const sv = severity(artifact, sctx);
    buffer.push({ iter, artifact, score: sv.score });
    history.push(sv.score);
    const isBest = sv.score < best.score;
    if (isBest) best = { iter, artifact, score: sv.score };

    const pattern = il.crossed ? 'iron-law' : trajectory(prevScore, sv.score, best.score);
    const delta = prevScore == null ? 0 : sv.score - prevScore;
    const topFix = sv.findings.find((f) => FIXERS[f.id]);
    trace.push({
      iter, score: sv.score, delta, pattern,
      what: `severity ${sv.score} (redteam ${sv.components.redteam} · grounding ${sv.components.grounding} · quality ${sv.components.quality} · ceremony ${sv.components.ceremony}${sv.components.learned ? ' · learned ' + sv.components.learned : ''}) — ${sv.counts.critical}C/${sv.counts.high}H/${sv.counts.medium}M/${sv.counts.low}L · grounding ${sv.grounding.grounded}G/${sv.grounding.ungrounded}U/${sv.grounding.contradicted}X · blind ${sv.blind}/100`,
      why: il.crossed ? `RED LINE crossed: ${il.trips.map((t) => t.id).join(', ')} — hard halt`
        : sv.score <= target ? `at/under target (${target}) — converged`
          : topFix ? `worst fixable finding: ${topFix.id} (${topFix.severity}) — ${topFix.message}`
            : sv.findings.length ? `residual is not deterministically fixable (${sv.findings[0].id}) — escalate to human`
              : 'clean',
      fixedId: null,
    });

    if (il.crossed) { ironLaw = il; exitReason = 'iron-law'; break; }
    if (sv.score <= target) { exitReason = 'pass'; break; }

    if (isBest) worseStreak = 0; else worseStreak++;
    if (worseStreak >= patience) { exitReason = 'overshoot-rollback'; break; }   // mechanism #2
    if (iter === maxIter) { exitReason = 'budget'; break; }                       // mechanism #4

    // FORCED AMNESIA — the producer sees only (artifact, findings), never the transcript.
    const produced = produce(artifact, sv.findings, { mission, intent: sctx.intent });
    const nextText = typeof produced === 'string' ? produced : (produced && produced.text) || artifact;
    if (produced && produced.fixedId) trace[trace.length - 1].fixedId = produced.fixedId;
    if (nextText === artifact) { exitReason = 'plateau'; break; }                 // nothing left to deterministically fix
    artifact = nextText;
    prevScore = sv.score;
  }

  // on overshoot, the SHIPPED artifact is the best-severity one — never a regressed version
  const shipped = exitReason === 'overshoot-rollback' ? best.artifact : (exitReason === 'iron-law' ? buffer[buffer.length - 1].artifact : best.artifact);
  const residual = severity(shipped, sctx);
  return {
    exitReason,
    iterations: trace.length,
    startScore: history[0], bestScore: best.score, endScore: residual.score,
    best: { artifact: shipped, score: residual.score },
    severityHistory: history, trace, ironLaw,
    residual: { score: residual.score, findings: residual.findings, counts: residual.counts, grounding: residual.grounding },
    rolledBack: exitReason === 'overshoot-rollback',
  };
}

const EXIT_NOTE = {
  pass: 'converged — severity at or under target',
  'overshoot-rollback': 'a producer regressed for too long — rolled back to the best version (the safety valve)',
  'iron-law': 'a RED LINE was crossed — hard-halted and escalated to a human',
  budget: 'hit the iteration budget (the fuse against runaway loops) — shipped the best version reached',
  plateau: 'no further deterministic fix available — shipped the best version; the residual is escalated to a human',
};

/** Markdown report for 07b-loop.md / the standalone --refine surface. */
export function loopBlock(r) {
  let md = `# Inner loop — produce → verify → (rollback) → repeat\n\n`;
  md += `**Exit:** ${r.exitReason.toUpperCase()} — ${EXIT_NOTE[r.exitReason] || ''}\n`;
  md += `**Severity:** start ${r.startScore} → best ${r.bestScore} → shipped ${r.endScore}  ·  ${r.iterations} iteration(s)  ·  trajectory ${r.severityHistory.join(' → ')}\n`;
  if (r.rolledBack) md += `**Rollback:** yes — a regressed version was discarded; the shipped artifact is the best-severity one.\n`;
  md += `\n## Introspection log — WHAT · WHY · PATTERN (audit trail)\n\n`;
  md += '| Iter | Severity | Δ | Pattern | What changed / why |\n|---:|---:|---:|---|---|\n';
  for (const t of r.trace) {
    const act = t.fixedId ? `fixed \`${t.fixedId}\` · ` : '';
    md += `| ${t.iter} | ${t.score} | ${t.delta > 0 ? '+' + t.delta : t.delta} | ${t.pattern} | ${act}${String(t.why).replace(/\|/g, '\\|')} |\n`;
  }
  if (r.ironLaw && r.ironLaw.crossed) {
    md += `\n## RED LINE crossed\n\n`;
    for (const t of r.ironLaw.trips) md += `- **${t.law}** — evidence \`${t.evidence}\` (${t.source})\n`;
    md += `\n> The loop hard-halted. A human decides whether to fix it or consciously override — the harness never crosses a red line silently.\n`;
  }
  const resid = r.residual;
  md += `\n## Residual — escalated to a human (not faked)\n\n`;
  if (!resid.findings.length) md += `_None — the loop drove severity to ${resid.score}._\n`;
  else {
    md += `Severity ${resid.score} · ${resid.counts.critical}C/${resid.counts.high}H/${resid.counts.medium}M/${resid.counts.low}L. The deterministic loop fixes what it can prove; the rest is surfaced, never silently "resolved":\n\n`;
    for (const f of resid.findings.slice(0, 12)) md += `- **${f.severity.toUpperCase()}** ${f.message} → ${f.fixHint}\n`;
  }
  md += `\n> The producer is pluggable: in-harness it is a deterministic remediator (monotone — it converges to a floor). Wire a host LLM as the producer and the overshoot-rollback guard above is what keeps it honest. The verifier, rollback, iron-laws and budget are deterministic ~0-token control.\n`;
  return md;
}
