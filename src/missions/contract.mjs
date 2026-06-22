// missions/contract.mjs — the legal squad: Senior Lawyer · Risk-Control Officer ·
// Negotiation Expert · Semantic-Logic reviewer.
import { decompose, crossCompare, renderFindings, ambiguityScan } from '../skills/logic.mjs';
import { uniq } from '../util.mjs';

const KB = [
  { group: 'Limitation of liability', source: 'model clause', ref: 'common standard', claim: 'Liability should be capped (commonly at fees paid in the prior 12 months) with carve-outs for IP, confidentiality and wilful misconduct.' },
  { group: 'Indemnity', source: 'model clause', ref: 'common standard', claim: 'Indemnities should be mutual and scoped to third-party claims, not consequential loss.' },
  { group: 'IP ownership', source: 'model clause', ref: 'common standard', claim: 'Pre-existing IP stays with its owner; deliverables transfer on payment, with a licence-back where needed.' },
  { group: 'Termination', source: 'model clause', ref: 'common standard', claim: 'Provide termination for cause (with cure period) and for convenience (with notice), plus survival of key clauses.' },
  { group: 'Confidentiality', source: 'model clause', ref: 'common standard', claim: 'Define confidential information, carve out public/independently-developed info, and set a return/destroy obligation.' },
  { group: 'Governing law', source: 'model clause', ref: 'common standard', claim: 'State the governing law and the dispute forum explicitly; do not leave it implied.' },
  { group: 'Payment terms', source: 'model clause', ref: 'common standard', claim: 'State amount, schedule, late-payment interest and the consequences of non-payment.' },
  { group: 'Data protection', source: 'model clause', ref: 'GDPR/DPA', claim: 'Where personal data is processed, a data-processing addendum with roles and SCCs is required.' },
  { group: 'Limitation of liability', source: 'vendor template', ref: 'one-sided (UNVERIFIED)', claim: 'The supplier should bear unlimited liability for all losses of any kind.' },
];
const CONCERN_RE = [
  [/\b(liab|cap|damages|loss)\b/i, 'Limitation of liability'],
  [/\b(indemn|hold harmless)\b/i, 'Indemnity'],
  [/\b(ip|intellectual property|ownership|deliverable|work product)\b/i, 'IP ownership'],
  [/\b(terminat|cancel|exit|expire)\b/i, 'Termination'],
  [/\b(confiden|nda|non-disclos|secret)\b/i, 'Confidentiality'],
  [/\b(govern|jurisdiction|law|dispute|arbitrat)\b/i, 'Governing law'],
  [/\b(pay|fee|invoice|price|compensat)\b/i, 'Payment terms'],
  [/\b(data|personal|privacy|gdpr|process)\b/i, 'Data protection'],
];

export const contract = {
  id: 'contract',
  name: 'Contract / legal',
  detect: /\b(contract|agreement|nda|msa|sow|clause|terms|licen[cs]e|lease|employment|liability|indemnif|warranty|sla|counterparty|redline|t&c|tos)\b/i,
  build: 'skills',
  squad: [
    { id: 'lawyer', name: 'Senior Lawyer', role: 'Clause architecture', one: 'Maps the clauses the agreement must contain and the standard position for each.' },
    { id: 'risk', name: 'Risk-Control Officer', role: 'Risk register', one: 'Scores each term by severity × likelihood; sets the acceptable position.' },
    { id: 'negotiator', name: 'Negotiation Expert', role: 'Positions', one: 'Sets ideal / acceptable / walk-away for every key term.' },
    { id: 'semantic', name: 'Semantic-Logic Reviewer', role: 'Ambiguity check', one: 'Hunts vague terms and undefined standards; binds them to a measurable test.' },
  ],
  stageOwners: { research: 'lawyer', plan: 'lawyer', produce: 'negotiator', review: 'semantic', certify: 'risk' },

  concerns(req) {
    const out = CONCERN_RE.filter(([re]) => re.test(req)).map(([, n]) => n);
    return uniq(['Limitation of liability', 'IP ownership', 'Termination', 'Governing law', ...out]);
  },

  research(brief, ctx) {
    const cc = crossCompare(brief.concerns, (g) => KB.filter((e) => e.group === g));
    const md = renderFindings('04 · Legal research (standard positions + flagged one-sided terms)', cc);
    const out = ctx.wa('04-research-brief.md', md);
    return { text: md, out, coverage: cc.coverage.pct, conflicts: cc.conflicts.length, findings: cc.findings.length, sources: cc.sources, summary: `${cc.coverage.pct}% coverage · ${cc.conflicts.length} one-sided term quarantined` };
  },

  plan(brief, ctx) {
    const map = brief.concerns.map((c, i) => `- **§${i + 1} ${c}** — ${(KB.find((e) => e.group === c && !/UNVERIFIED/.test(e.ref)) || {}).claim || 'standard clause'}`).join('\n');
    const md = `# 06 · Clause map (Senior Lawyer)\n\n${map}\n\nPlus the boilerplate every agreement needs: parties & recitals, definitions, entire-agreement, assignment, notices, severability, counterparts.\n\n> Legal judgment stays human — the Lawyer proposes the map; the operator (and counsel) approve at the gate.\n`;
    const out = ctx.wa('06-plan.md', md);
    return { text: md, out, summary: `${brief.concerns.length} core clauses mapped` };
  },

  produce(brief, ctx) {
    const risk = `# Risk register (Risk-Control Officer)\n\n| Clause | Severity | Likelihood | Position |\n|---|---|---|---|\n${brief.concerns.map((c) => `| ${c} | High | Medium | hold the standard position; escalate deviations |`).join('\n')}\n`;
    const pos = `# Negotiation positions (Negotiation Expert)\n\n${brief.concerns.map((c) => `## ${c}\n- **Ideal:** the position most protective of us\n- **Acceptable:** the market-standard middle\n- **Walk-away:** the term we will not sign past`).join('\n\n')}\n`;
    ctx.wa('07-build/risk-register.md', risk);
    ctx.wa('07-build/negotiation-positions.md', pos);
    ctx.wa('07-build/_manifest.md', `# 07 · Produce\n\nWritten: risk-register.md, negotiation-positions.md (${brief.concerns.length} terms).\n`);
    return { text: risk + pos, out: '07-build/', files: 2, summary: `risk register + positions for ${brief.concerns.length} terms` };
  },

  review(brief, ctx) {
    const amb = ambiguityScan(brief.requirement);
    const md = `# 08 · Semantic & logic review (Semantic-Logic Reviewer)\n\n## Ambiguous / undefined terms\n${amb.length ? amb.map((a) => `- "${a.term}" — ${a.why}`).join('\n') : '- none flagged in the brief (re-run against the full draft)'}\n\n## Logic checks\n- every obligation has a corresponding remedy\n- defined terms are used consistently (capitalisation)\n- cross-references resolve; no orphaned definitions\n- numbers, dates and currencies are exact and consistent\n`;
    const out = ctx.wa('08-review.md', md);
    return { text: md, out, issues: amb.length, summary: `${amb.length} ambiguit(ies) flagged` };
  },

  certify(brief, ctx) {
    const checklist = ['parties + entity names verified', 'every mapped clause present', 'risk register accepted by owner', 'ambiguities resolved or defined', 'governing law + signature blocks correct', 'counsel review (human) complete'];
    const md = `# 09 · Pre-signature checklist (Risk-Control Officer)\n\n${checklist.map((c) => `- [ ] ${c}`).join('\n')}\n`;
    ctx.wa('09-conformance.md', md);
    return { text: md, count: checklist.length, summary: `${checklist.length}-item pre-signature checklist` };
  },
};
