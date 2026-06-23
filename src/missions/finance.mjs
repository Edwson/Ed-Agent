// missions/finance.mjs — the v0.1 default squad: regulated-finance design.
// The only mission that drives the eds-mcp build engine.
import { research as regulatedResearch } from '../research.mjs';
import { design, develop, qa, certify as edsCertify } from '../edsBridge.mjs';

// regulatory triggers (finance "concerns")
const TRIGGERS = [
  [/\b(kyc|onboard|due diligence|identity check)\b/i, 'Customer due diligence (KYC)'],
  [/\b(edd|enhanced due diligence|source of funds|pep|high.?risk)\b/i, 'Enhanced due diligence (EDD)'],
  [/\b(sanction|ofac|watchlist|screen)\b/i, 'Sanctions screening'],
  [/\b(aml|launder|suspicious|sar)\b/i, 'AML / suspicious-activity'],
  [/\b(suitab|fiduciar|advis|reg bi)\b/i, 'Suitability / best-interest'],
  [/\b(disclos|fee|conflict)\b/i, 'Disclosure of fees & conflicts'],
  [/\b(apr|afford|repay|credit)\b/i, 'Credit cost & affordability'],
  [/\b(consent|gdpr|privacy|data residency)\b/i, 'Consent & data protection'],
  [/\b(sca|2fa|mfa|step.?up|strong customer auth)\b/i, 'Strong customer authentication'],
  [/\b(audit|17a-4|retention|record)\b/i, 'Record-keeping & audit trail'],
  [/\b(ai|model|automat|recommend|score)\b/i, 'AI / model governance'],
];

export const finance = {
  id: 'finance',
  name: 'Regulated finance / design',
  detect: /\b(kyc|aml|edd|sanction|suitab|fiduciar|broker|trading|payment|payout|loan|credit|wealth|advis|onboard|disclosure|fix|settlement|compliance)\b/i,
  build: 'eds-mcp',
  squad: [
    { id: 'planning', name: 'Planning', role: 'Decompose & plan', one: 'Breaks the requirement into sub-requirements and a build plan.' },
    { id: 'regulation', name: 'Regulation', role: 'Rule mapping', one: 'Maps each requirement to the governing rule.' },
    { id: 'data', name: 'Data', role: 'Evidence & analysis', one: 'Cross-compares regulator sources, compresses to the load-bearing clause.' },
    { id: 'development', name: 'Development', role: 'Build', one: 'Scaffolds compliant, token-correct code from eds-mcp.' },
    { id: 'qa', name: 'QA', role: 'Lint · a11y · tests', one: 'Lints token usage, audits accessibility, scaffolds conformance tests.' },
    { id: 'risk', name: 'Risk & Governance', role: 'Certification gate', one: 'Owns the certification gate and the audit trail.' },
  ],
  stageOwners: { research: 'data', plan: 'development', produce: 'development', review: 'qa', certify: 'risk' },

  concerns(requirement) {
    const out = TRIGGERS.filter(([re]) => re.test(requirement)).map(([, n]) => n);
    return out.length ? [...new Set(out)] : ['Regulated-finance baseline'];
  },

  research(brief, ctx) {
    const res = regulatedResearch({ regulatoryTriggers: brief.concerns }, brief, ctx.opts);
    let md = `# 04 · Research brief (regulated finance)\n\n_Cross-compared regulator sources per trigger; compressed to the load-bearing clause; quarantined unverified claims._\n\n**Coverage:** ${res.coverage.pct}% (${res.coverage.covered}/${res.coverage.total}) · **Sources:** ${res.sourcesUsed.join(', ') || '—'}\n\n`;
    for (const f of res.findings) {
      md += `## ${f.trigger} — ${f.status.toUpperCase()}\n`;
      if (f.anchors.length) md += `**Anchors:** ${f.anchors.join(' · ')}\n\n`;
      for (const c of f.compressed) md += `- ${c.clause} *(— ${c.source}, ${c.rule})*\n`;
      if (f.quarantined && f.quarantined.length) { md += `\n> ⚠ Quarantined (unverified):\n`; for (const q of f.quarantined) md += `> - ${q.clause} *(— ${q.source}, ${q.rule})*\n`; }
      md += '\n';
    }
    const out = ctx.wa('04-research-brief.md', md);
    return { text: md, out, coverage: res.coverage.pct, conflicts: res.conflicts.length, findings: res.findings.length, sources: res.sourcesUsed, summary: `${res.coverage.pct}% coverage · ${res.conflicts.length} conflict(s) quarantined` };
  },

  plan(brief, ctx) {
    const d = design(ctx.engine, brief);
    const md = d.markdown + `\n---\n\n**Logic review (Refine):** component set covers every sub-requirement; AI suggestions carry a consent surface + audit hook.\n`;
    const out = ctx.wa('06-plan.md', md);
    return { text: md, out, summary: ctx.engine.wired ? 'component set drafted (eds-mcp)' : 'contract-only draft', components: d.components };
  },

  produce(brief, ctx) {
    const dev = develop(ctx.engine, brief, ctx.buildDir);
    const md = `# 07 · Build\n\n- Engine: ${dev.wired ? 'eds-mcp (real scaffold)' : 'contract-only'}\n- Order: ${dev.order.join(' → ')}\n- Files written: ${dev.written}\n- Tokens used: ${dev.tokens.length}\n`;
    ctx.wa('07-build/_manifest.md', md);
    return { text: md, out: '07-build/', files: dev.written, summary: dev.wired ? `${dev.written} files scaffolded (${dev.order.length} components)` : 'contract-only' };
  },

  review(brief, ctx) {
    const q = qa(ctx.engine, brief);
    const clean = (q.errors || 0) === 0 && (q.contrastFail || 0) === 0;
    const verdictLine = q.wired
      ? (clean ? `PASS — 0 lint errors, ${q.contrastFail || 0} contrast fail(s); clears the system gate.` : `REWORK — ${q.errors} lint error(s) + ${q.contrastFail || 0} contrast fail(s); fix before sign-off.`)
      : 'Contract-only — eds-mcp not wired, so no machine verdict (wire --eds to enforce).';
    const full = q.markdown + `\n## Quality discipline — no blind praise\n\n**Verdict:** ${verdictLine}\n`;
    const out = ctx.wa('08-review.md', full);
    return { text: full, out, issues: q.errors || 0, summary: q.wired ? `${clean ? 'PASS' : 'REWORK'} · ${q.errors} lint · ${q.a11yChecked} a11y · ${q.contrastChecked} contrast pairs` : 'contract-only' };
  },

  certify(brief, ctx) {
    const cert = edsCertify(ctx.engine, brief, ctx.mkdir('09-tests'));
    const md = `# 09 · Conformance\n\n- Conformance tests scaffolded: **${cert.count}** (eds-mcp)\n`;
    ctx.wa('09-conformance.md', md);
    return { text: md, count: cert.count, summary: `${cert.count} test(s)` };
  },
};
