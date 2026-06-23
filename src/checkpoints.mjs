// checkpoints.mjs — deliberation checkpoints. Unlike a sign-off gate (a yes/no at
// the end), a checkpoint sits at a PHASE BOUNDARY: the agent stops, surfaces the
// questions only a human can answer, and the run stays "in deliberation" until you
// answer them. A checkpoint clears when EITHER it raised no open question OR a human
// resolved it. The harness records the checkpoint; it never fabricates the answer.

export function checkpoint(id, name, phase, { questions = [], assessment = '', resolution = null }) {
  const resolved = !!(resolution && String(resolution).trim());
  const cleared = resolved || questions.length === 0;
  return {
    id, name, phase, questions, assessment,
    status: cleared ? 'cleared' : 'open',
    resolved, by: resolved ? String(resolution).trim() : null,
  };
}

export const allCheckpointsCleared = (cps) => cps.every((c) => c.status === 'cleared');
export const openCheckpoints = (cps) => cps.filter((c) => c.status === 'open');
export const openQuestions = (cps) => openCheckpoints(cps).flatMap((c) => c.questions.map((q) => ({ node: c.id, question: q })));

export const checkpointLine = (c) =>
  c.status === 'cleared'
    ? (c.resolved ? `✓ ${c.name} — resolved by ${c.by}` : `✓ ${c.name} — cleared (no open question)`)
    : `◆ ${c.name} — IN DELIBERATION · ${c.questions.length} question(s) for you`;

/** Parse `--resolve "node: answer"` entries (string or array) into { node: answer }. */
export function parseResolutions(resolveOpt) {
  const map = {};
  const arr = Array.isArray(resolveOpt) ? resolveOpt : (resolveOpt ? [resolveOpt] : []);
  for (const r of arr) {
    const s = String(r);
    const i = s.indexOf(':');
    if (i > 0) map[s.slice(0, i).trim().toLowerCase()] = s.slice(i + 1).trim();
  }
  return map;
}
