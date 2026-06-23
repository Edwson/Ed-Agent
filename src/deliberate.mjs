// deliberate.mjs — assembles the trust assessors into decision briefs + the open
// questions a human must answer. Used by (a) the orchestrator's phase checkpoints,
// (b) the standalone "point at an artifact/diff" audit, and (c) the MCP tools.
import { captureIntent, trustScore, globalCoherence, substanceScan } from './skills/trust.mjs';

/** Checkpoint 1 · Frame — is the intent captured, or is the agent guessing the project? */
export function frameAssessment(requirement, intent) {
  const questions = [];
  if (!intent.stated) {
    questions.push('What is the business GOAL? (the outcome it must produce — not the task)');
    questions.push('What is DONE in business terms? (the signal that it actually worked)');
    questions.push('What are the NON-GOALS / out of scope? (so a local optimum cannot dig a global pit)');
  }
  const md = `## Checkpoint · Frame the problem\n\n` + (intent.stated
    ? `- **Goal:** ${intent.goal || '—'}\n- **Done (business):** ${intent.doneBusiness || '—'}\n- **Non-goals:** ${intent.nonGoals.join('; ') || '—'}\n\n_Intent captured — confirm it is right before the build is trusted._\n`
    : `> ⚠ ${intent.risk}\n\n_${intent.inferred}_\n`);
  return { md, questions };
}

/** Checkpoint 2 · Trust & global — should you trust it, and does the local optimum serve the goal? */
export function trustAssessment({ text, decisions, intent, sig }) {
  const trust = trustScore(sig || { text });
  const coherence = globalCoherence(decisions || [], intent);
  const substance = substanceScan(text || '');
  const questions = [];
  if (trust.level === 'LOW') questions.push(`Trust is LOW (${trust.score}/100). Accept it, or fix first: ${trust.raise.slice(0, 3).join(' · ')}?`);
  for (const lo of coherence.localOptima) questions.push(`Local optimum — "${lo.decision}": ${lo.risk}. Intended?`);
  if (substance.verdict === 'CEREMONY') questions.push(`Reads as ceremony over substance (${substance.substanceScore}/100): ${substance.flags.slice(0, 2).join('; ') || 'low information density'}. Is there real payload, or is it defensive filler?`);

  let md = `## Checkpoint · Trust & global coherence\n\n`;
  md += `**Trust: ${trust.level} (${trust.score}/100)** — should you trust this, not "is it correct".\n`;
  md += trust.factors.map((f) => `- ${f.state === 'ok' ? '✓' : f.state === 'risk' ? '✗' : '·'} **${f.name}:** ${f.note}`).join('\n') + '\n';
  if (trust.raise.length) md += `\n_To raise trust:_ ${trust.raise.slice(0, 4).join(' · ')}\n`;
  md += `\n**Global coherence** — ${coherence.note}\n`;
  if (coherence.localOptima.length) md += coherence.localOptima.map((l) => `- ⚠ local optimum: "${l.decision}" — ${l.risk}`).join('\n') + '\n';
  if (coherence.drifted.length) md += `- _Could not auto-trace to the goal (confirm these serve it): ${coherence.drifted.slice(0, 4).map((d) => '"' + d.decision + '"').join(', ')}_\n`;
  md += `\n**Substance: ${substance.verdict} (${substance.substanceScore}/100)** — substance, or plausible-nonsense / over-defensive ceremony.\n`;
  if (substance.flags.length) md += substance.flags.map((f) => `- ⚠ ${f}`).join('\n') + '\n';
  return { md, questions, trust, coherence, substance };
}

/**
 * Standalone audit — point at any artifact / diff / design and ask "should I trust this?".
 * No build, no lifecycle. opts: { requirement, intent, done, not/nonGoals, provenance, verified }.
 */
export function auditArtifact(text, opts = {}) {
  const reqLabel = opts.requirement || '(artifact under audit)';
  const intent = captureIntent(reqLabel, opts);
  // each meaningful line is a candidate "decision" — so a non-goal violation buried
  // mid-artifact (e.g. "migrate the payments schema") is still checked, not swallowed.
  const decisions = String(text)
    .split(/\n+/)
    .map((s) => s.replace(/^\s*(?:#{1,6}\s*|[-*>]\s*|\d+\.\s*|\/\/+\s*)/, '').trim())
    .filter((s) => s.length > 6 && /[a-z]/i.test(s))
    .slice(0, 24);
  const frame = frameAssessment(reqLabel, intent);
  const a = trustAssessment({ text, decisions, intent, sig: { text, provenance: opts.provenance || null, verified: opts.verified != null ? opts.verified : null } });
  const questions = [...frame.questions, ...a.questions];
  const status = questions.length ? 'NEEDS DELIBERATION' : 'CLEAR (your sign-off)';
  const md = `# Deliberation audit\n\n**Status: ${status}** · ${questions.length} open question(s)\n\n${frame.md}\n${a.md}\n` +
    (questions.length
      ? `## Open questions — only you can answer these\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n_Ed Agent surfaces the question; the judgment is yours._\n`
      : `_No open questions — the assessors found nothing requiring a human call. The sign-off is still yours._\n`);
  return { md, status, questions, trust: a.trust, coherence: a.coherence, substance: a.substance, intent };
}
