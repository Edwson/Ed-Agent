// skills/grounding.mjs — claim-level grounding, three states (v0.5). For ANY business,
// not just finance. Every load-bearing claim / decision is tagged Grounded (it traces to a
// cited source or to the stated goal), Ungrounded (confident, with nothing behind it), or
// Contradicted (it does what a non-goal forbids). The universal source is the captured
// intent + non-goals — so it runs with zero domain pack; missions add what else counts as a
// valid source (code: a spec/ticket/test; marketing: a number/data source; contract: a
// clause; finance: a regulation anchor). Deterministic, zero LLM calls.
import { globalCoherence } from './trust.mjs';

// what counts as a "cited source" INSIDE the artifact text, per mission (regex) + universal
const SOURCE_PATTERNS = {
  universal: [/\bsource\s*[:=]/i, /\baccording to\b/i, /\bper\b\s+[A-Z]/, /\]\(/, /\bhttps?:\/\//i, /\bn\s*=\s*\d/i, /\bcit(?:e|ed|ation)\b/i],
  code: [/\bspec\b/i, /\bticket\b/i, /\b[A-Z]{2,}-\d+\b/, /\btest(?:s|ed|\s+covers|\s+plan)?\b/i, /\bRFC\s?\d/i],
  marketing: [/\b\d{1,3}\s?%/, /\bGA4\b/i, /\bsurvey\b/i, /\bstudy\b/i, /\bbenchmark\b/i],
  contract: [/\bclause\b/i, /\bsection\s?\d/i, /\bschedule\s?[A-Z0-9]/i, /\bprecedent\b/i, /\bexhibit\b/i],
  finance: [/\b([A-Z]{2,}\s?\d|Rule\s?\d|Reg\s?[A-Z]|Article\s?\d|RG\s?\d|Notice\s?\d|FATF|FinCEN|MiFID|ASIC|FINRA|SEC|31\s?CFR)\b/],
};

// a "load-bearing" line = a decision/claim worth grounding (skip pure prose / headings)
const LOADBEARING = /\b(must|should|shall|will|use|build|add|store|encrypt|validate|deploy|charge|approve|reduce|increase|improve|guarantee|ensure|require|implement|migrat|integrat|expose|enable|disable|remove|grant|deny|\bcap\b|limit|disclose|verify|authenticate|process|collect|retain|share)\b/i;

const linesOf = (t) => String(t).split(/\n+/).map((s) => s.replace(/^\s*(?:#{1,6}\s*|[-*>]\s*|\d+\.\s*|\/\/+\s*)/, '').trim()).filter((s) => s.length > 6 && /[a-z]/i.test(s));
const wordsOf = (t) => (String(t).toLowerCase().match(/[a-z0-9']{2,}/g) || []);
const STOP = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'you', 'your', 'are', 'will', 'can', 'has', 'have', 'not', 'but', 'all', 'any', 'our', 'out', 'use', 'how', 'who', 'why', 'what', 'when', 'into', 'each', 'per', 'via', 'must', 'should', 'shall']);
const keyTerms = (t) => wordsOf(t).filter((w) => w.length >= 4 && !STOP.has(w));
const overlaps = (a, b) => { const B = new Set(keyTerms(b)); return keyTerms(a).some((w) => B.has(w)); };

/**
 * Tag load-bearing claims. artifact = text/code. ctx = { mission, intent }.
 * Returns { claims:[{text,state,tracedTo}], counts, coverageRatio }.
 */
export function groundClaims(artifact, ctx = {}) {
  const text = String(artifact || '');
  const mid = (ctx.mission && ctx.mission.id) || 'universal';
  const intent = ctx.intent || { stated: false, goal: '', nonGoals: [] };
  const pats = [...SOURCE_PATTERNS.universal, ...(SOURCE_PATTERNS[mid] || [])];
  const ls = linesOf(text);

  const contradicted = new Set();
  if (intent.stated && intent.goal) {
    for (const lo of globalCoherence(ls, intent).localOptima) contradicted.add(lo.decision);
  }

  const claims = [];
  for (const ln of ls) {
    if (!LOADBEARING.test(ln)) continue;
    let state, tracedTo = null;
    if (contradicted.has(ln)) { state = 'Contradicted'; tracedTo = 'violates a non-goal'; }
    else if (pats.some((re) => re.test(ln))) { state = 'Grounded'; tracedTo = 'cited source'; }
    else if (intent.stated && intent.goal && overlaps(ln, intent.goal)) { state = 'Grounded'; tracedTo = 'stated goal'; }
    else state = 'Ungrounded';
    claims.push({ text: ln.length > 120 ? ln.slice(0, 117) + '…' : ln, state, tracedTo });
    if (claims.length >= 40) break;
  }
  const counts = { grounded: 0, ungrounded: 0, contradicted: 0 };
  for (const c of claims) counts[c.state.toLowerCase()]++;
  const coverageRatio = claims.length ? Math.round((counts.grounded / claims.length) * 100) : 0;
  return { mission: mid, claims, counts, coverageRatio };
}

/** Contradicted claims as human questions (used by --strict). */
export function groundingQuestions(report) {
  return report.claims.filter((c) => c.state === 'Contradicted')
    .map((c) => `Grounding (Contradicted) — "${c.text}" does what a non-goal forbids. Remove, or consciously accept?`);
}

export function groundingBlock(report) {
  const c = report.counts;
  let md = `\n## Claim grounding — three states (mission: ${report.mission})\n\n`;
  md += `**Grounded ${c.grounded} · Ungrounded ${c.ungrounded} · Contradicted ${c.contradicted}**  ·  grounded ratio ${report.coverageRatio}%\n\n`;
  if (!report.claims.length) md += '_No load-bearing claims to ground._\n';
  else {
    md += '| State | Claim | Traces to |\n|---|---|---|\n';
    for (const cl of report.claims.slice(0, 24)) md += `| ${cl.state} | ${String(cl.text).replace(/\|/g, '\\|')} | ${cl.tracedTo || '—'} |\n`;
  }
  md += `\n> Deterministic: Grounded = traces to a cited source or the stated goal; Ungrounded = a confident claim with nothing behind it; Contradicted = it violates a declared non-goal. The universal source is the captured intent, so this runs for any business — with or without a domain pack.\n`;
  return md;
}
