// skills/trust.mjs — the trust & global-judgment disciplines. Deterministic,
// zero-dependency. Answers the questions that matter once AI writes the code:
//   - should you TRUST this (not "is it correct")?
//   - was the INTENT captured, or is the agent guessing the project?
//   - does this LOCAL optimum still serve the GLOBAL goal?
//   - is it SUBSTANCE, or plausible-nonsense / over-defensive ceremony?
// Every assessor surfaces a question for the human; none of them makes the call.
import { uniq } from '../util.mjs';

const wordsOf = (t) => (String(t).toLowerCase().match(/[a-z0-9']{2,}/g) || []);
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const STOP = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'you', 'your', 'are', 'will', 'can', 'has', 'have', 'not', 'but', 'all', 'any', 'our', 'out', 'use', 'how', 'who', 'why', 'what', 'when', 'into', 'each', 'per', 'via', 'a', 'an', 'of', 'to', 'in', 'on', 'is', 'it', 'be', 'as', 'or', 'if', 'so', 'we', 'i']);
const content = (t) => wordsOf(t).filter((w) => w.length >= 4 && !STOP.has(w));
const overlap = (a, b) => { const B = new Set(content(b)); return uniq(content(a)).filter((w) => B.has(w)); };

// ── 1. INTENT — capture it, or flag that the agent is guessing the project ──
export function captureIntent(requirement, opts = {}) {
  const goal = (opts.intent || '').trim();
  const doneBusiness = (opts.done || '').trim();
  const nonGoals = String(opts.nonGoals || opts.not || '').split(/[;,]|\band\b/i).map((s) => s.trim()).filter(Boolean);
  const stated = !!(goal || doneBusiness || nonGoals.length);
  const inferred = `Inferred from the requirement text only: "${String(requirement).slice(0, 120)}". This is a guess, not the stated business intent.`;
  const risk = stated ? null
    : 'Intent is UNSTATED. The agent can only infer the goal from the requirement text — which is the #1 source of "technically right, business-wrong" outcomes. State the business goal, the business definition of done, and the non-goals.';
  return { goal, doneBusiness, nonGoals, stated, inferred, risk };
}

// ── 2. TRUST — should you trust this, not "is it correct" ──
const HIGH_BLAST = /\b(deploy|production|\bprod\b|migrat|schema|database|\bauth\b|password|secret|token|payment|money|fund|transfer|delete|drop|irreversible|live|customer data|pii)\b/i;
const CONFIDENCE = /\b(always|never|guaranteed|guarantee|fully|complete(?:ly)?|100%|handles all|every case|ensures?|bullet[- ]?proof|robust|comprehensive|enterprise[- ]grade|production[- ]ready|scalable|seamless)\b/gi;

/**
 * Assess trustworthiness from whatever signals exist. Unknowns become questions.
 * sig: { text, provenance:'derived'|'inferred'|null, verified:bool|null, filesWritten, testsScaffolded, reviewIssues, numbers }
 */
export function trustScore(sig = {}) {
  const text = String(sig.text || '');
  const numbers = sig.numbers != null ? sig.numbers : (text.match(/\d/g) || []).length;
  const confidence = (text.match(CONFIDENCE) || []).length;
  const blastHits = (text.match(new RegExp(HIGH_BLAST.source, 'gi')) || []).length;
  const factors = [];
  let score = 100;

  // provenance
  if (sig.provenance === 'derived') factors.push({ name: 'Provenance', state: 'ok', note: 'derived from a cited source / real engine, not guessed' });
  else if (sig.provenance === 'inferred') { score -= 22; factors.push({ name: 'Provenance', state: 'risk', note: 'inferred / guessed — no source or engine behind it' }); }
  else { score -= 12; factors.push({ name: 'Provenance', state: 'unknown', note: 'unknown — was this derived from a source, or guessed?' }); }

  // verification
  if (sig.verified === true || sig.testsScaffolded > 0) factors.push({ name: 'Verification', state: 'ok', note: `a real check exercises it${sig.testsScaffolded ? ` (${sig.testsScaffolded} test(s))` : ''}` });
  else if (sig.verified === false) { score -= 24; factors.push({ name: 'Verification', state: 'risk', note: 'no check actually exercises this — defects would pass silently' }); }
  else { score -= 14; factors.push({ name: 'Verification', state: 'unknown', note: 'unknown — does any test or check actually exercise this?' }); }

  // blast radius
  if (blastHits >= 2) { score -= 18; factors.push({ name: 'Blast radius', state: 'risk', note: `touches high-impact surfaces (${blastHits} signal(s): deploy/auth/money/migration/…) — a defect here is a production incident` }); }
  else if (blastHits === 1) { score -= 8; factors.push({ name: 'Blast radius', state: 'watch', note: 'touches a sensitive surface — confirm the blast radius' }); }
  else factors.push({ name: 'Blast radius', state: 'ok', note: 'low — limited surface' });

  // reversibility (same surfaces, framed as rollback cost)
  if (blastHits >= 1 && HIGH_BLAST.test(text)) { score -= 8; factors.push({ name: 'Reversibility', state: 'watch', note: 'may be hard to roll back (migration / money / production) — define the rollback before sign-off' }); }
  else factors.push({ name: 'Reversibility', state: 'ok', note: 'reversible at low cost' });

  // confidence-vs-evidence gap
  if (confidence >= 2 && numbers < confidence) { score -= 16; factors.push({ name: 'Confidence-vs-evidence', state: 'risk', note: `${confidence} absolute claim(s) ("always/fully/robust/…") but only ${numbers} number(s) — confident, thinly evidenced` }); }
  else factors.push({ name: 'Confidence-vs-evidence', state: 'ok', note: 'claims are proportionate to the evidence' });

  // open review issues
  if (sig.reviewIssues > 0) { score -= Math.min(18, sig.reviewIssues * 4); factors.push({ name: 'Open issues', state: 'risk', note: `${sig.reviewIssues} unresolved review issue(s)` }); }

  score = clamp(score);
  const level = score >= 76 ? 'HIGH' : score >= 50 ? 'MEDIUM' : 'LOW';
  const raise = factors.filter((f) => f.state === 'risk' || f.state === 'unknown' || f.state === 'watch')
    .map((f) => `${f.name}: ${f.note}`);
  return { level, score, factors, raise };
}

// ── 3. GLOBAL COHERENCE — does the local optimum still serve the global goal? ──
/**
 * decisions: string[] (sub-requirements, or the sections of an artifact).
 * intent: { goal, nonGoals } from captureIntent.
 * Heuristic traceability — framed as questions for the human, never a verdict.
 */
export function globalCoherence(decisions, intent) {
  const list = (decisions || []).map((d) => String(d).trim()).filter(Boolean);
  if (!intent || !intent.stated || !intent.goal) {
    return { runnable: false, aligned: [], drifted: [], localOptima: [], note: 'Cannot check global alignment: the business goal is unstated. State it first.' };
  }
  const aligned = [], drifted = [], localOptima = [];
  for (const d of list) {
    const goalHit = overlap(d, intent.goal).length;
    const ngHit = (intent.nonGoals || []).find((ng) => overlap(d, ng).length >= 1);
    if (ngHit) localOptima.push({ decision: d, risk: `appears to do what was declared a NON-GOAL ("${ngHit}") — a locally reasonable step that may dig a global pit` });
    else if (goalHit >= 1) aligned.push(d);
    else drifted.push({ decision: d, why: 'no traceable link to the stated business goal — it may serve a sub-task while orphaned from the objective' });
  }
  return { runnable: true, aligned, drifted, localOptima, note: `${aligned.length}/${list.length} decision(s) trace to the goal · ${drifted.length} orphan(s) · ${localOptima.length} possible local optimum/optima` };
}

// ── 4. SUBSTANCE — substance, or plausible-nonsense / over-defensive ceremony? ──
const DEFENSIVE = [
  [/try\s*\{[^}]*\}\s*catch\s*\([^)]*\)\s*\{\s*\}/g, 'empty catch — swallows the error it pretends to handle'],
  [/catch\s*\([^)]*\)\s*\{\s*(\/\/[^\n]*|return\s*;?)\s*\}/g, 'catch that hides the failure'],
  [/\b(TODO|FIXME|placeholder|stub|not implemented|coming soon|xxx)\b/gi, 'placeholder / unfinished marker'],
  [/\bif\s*\([^)]*\)\s*\{\s*return\s*;?\s*\}/g, 'guard clause with no real branch'],
];
const CEREMONY_CLAIM = /\b(robust|comprehensive|enterprise[- ]grade|production[- ]ready|fully|seamless|scalable|handles all|best[- ]practice|industry[- ]standard|state[- ]of[- ]the[- ]art)\b/gi;
const HEDGE = /\b(may|might|could|should|generally|typically|in most cases|as needed|where appropriate|if necessary)\b/gi;

export function substanceScan(text) {
  const t = String(text || '');
  const ws = wordsOf(t);
  const cWords = content(t);
  const density = ws.length ? clamp((uniq(cWords).length / ws.length) * 100) : 0;
  const sentences = t.split(/[.!?。！？\n]+/).map((s) => s.trim()).filter((s) => s.length > 2);
  const structureLines = (t.match(/^\s*(#+\s|\*\s|-\s|\d+\.\s)/gm) || []).length;
  const ratio = sentences.length ? structureLines / sentences.length : structureLines;
  const numbers = (t.match(/\d/g) || []).length;

  const flags = [];
  for (const [re, why] of DEFENSIVE) { const n = (t.match(re) || []).length; if (n) flags.push(`${why} ×${n}`); }
  const claims = (t.match(CEREMONY_CLAIM) || []).length;
  if (claims >= 2 && numbers < claims) flags.push(`${claims} grand claim(s) ("robust/comprehensive/…") with ${numbers} number(s) — ceremony over substance`);
  const hedges = (t.match(HEDGE) || []).length;
  if (hedges >= 4) flags.push(`${hedges} hedge word(s) ("may/should/generally/…") — commitment-free language`);
  if (ratio > 0.6 && cWords.length / Math.max(1, sentences.length) < 8) flags.push('high structure, low payload — lots of headings/bullets, little actual content per line');

  let s = density;
  s -= flags.length * 9;
  s -= Math.max(0, claims - numbers) * 4;
  const substanceScore = clamp(s + 20); // baseline lift so clean dense prose scores well
  const verdict = substanceScore >= 55 && flags.length < 2 ? 'SUBSTANCE' : 'CEREMONY';
  return { density, substanceScore, ratio: Math.round(ratio * 100) / 100, flags, verdict, claims, numbers };
}
