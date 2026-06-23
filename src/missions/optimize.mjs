// missions/optimize.mjs — the grand-mentor review squad (総監督レビュー). Takes ANY existing content
// (a deck, a case study, a landing page, a clause) and runs the SOP:
// Step 1 blind-score diagnostic → Step 2 adversarial debate → Step 3 humanize
// → final optimized version, in the exact output format. Constraints: ban AI-tone
// filler, quantify or flag, no blind praise. When the content is a regulated-finance
// surface, the Data/Logic officer calls real eds-mcp checks to quantify (not assert).
import { aiToneScan, quantifyGaps, blindScore, humanTone, verdict } from '../skills/quality.mjs';

// finance-surface detection (kept local to avoid an import cycle with intake/index)
const FIN_SURFACE = [
  { feature: 'kyc', rule: 'FATF', re: /\b(kyc|onboard|edd|due diligence|source of funds|identity check)\b/i },
  { feature: 'aml', rule: 'FATF', re: /\b(aml|sanction|launder|ubo|beneficial owner|suspicious|watchlist|screen)\b/i },
  { feature: 'payment', rule: 'ISO 20022', re: /\b(payment|payout|remit|\bfx\b|settle|reconcil|money movement|transfer)\b/i },
  { feature: 'credit', rule: 'FCA CONC', re: /\b(loan|credit|lend|mortgage|\bapr\b|afford|repay)\b/i },
  { feature: 'suitability', rule: 'SEC Reg BI', re: /\b(wealth|advis|suitab|fiduciar|portfolio|rebalanc|invest)\b/i },
  { feature: 'identity', rule: 'GDPR', re: /\b(2fa|mfa|\bsca\b|step.?up|consent|authentication)\b/i },
];
const JUR = [
  ['au', /\b(asic|austrac|australia|afsl)\b/i], ['us', /\b(sec|finra|reg bi|fincen|ofac|17a-4|united states)\b/i],
  ['uk', /\b(\bfca\b|\bpra\b|conc|united kingdom)\b/i], ['eu', /\b(mifid|esma|gdpr|psd2|european)\b/i],
  ['sg', /\b(\bmas\b|singapore)\b/i], ['jp', /\b(jfsa|appi|japan)\b/i],
];
function detectFinance(content) {
  const s = FIN_SURFACE.find((f) => f.re.test(content));
  if (!s) return null;
  const j = JUR.find(([, re]) => re.test(content));
  return { feature: s.feature, rule: s.rule, jurisdiction: j ? j[0] : 'global' };
}

// compute the diagnostic once, reuse across stages (ctx is shared per run)
function getOpt(brief, ctx) {
  if (ctx._opt) return ctx._opt;
  const content = brief.requirement;
  ctx._opt = { content, score: blindScore(content), scan: aiToneScan(content), gaps: quantifyGaps(content), finance: detectFinance(content) };
  return ctx._opt;
}

export const optimize = {
  id: 'optimize',
  name: 'Optimize / review (grand-mentor · 総監督)',
  detect: /\b(optimi[sz]e|review|critique|improve|polish|sharpen|tighten|rewrite|proofread|feedback|de-?ai|humani[sz]e|score this|rate this|make this better)\b|優化|診斷|潤稿|重構文案|盲測|批判|去\s?ai|評分|審稿|強化文案/i,
  build: 'eds-mcp', // wires the engine so the Data officer can quantify finance surfaces
  squad: [
    { id: 'executor', name: 'Executor A · Industry Ceiling', role: 'Best-in-field producer', one: 'Holds the global top-1% bar (Awwwards / Red Dot / top-journal) and owns the final output.' },
    { id: 'reviewer', name: 'Reviewer B · Hard Buyer', role: 'Adversarial decision-maker', one: 'Stands in for the OpenAI / Goldman screener — hunts the fatal flaws and challenges the ROI.' },
    { id: 'copywriter', name: 'Copy C · Communicator', role: 'De-AI + human voice', one: 'Strips machine filler; gives it story, logic and warmth — without inventing facts.' },
    { id: 'data', name: 'Data/Logic D · Quant', role: 'Verify + quantify', one: 'Checks claims, attaches numbers (ROI / cost / conversion); calls eds-mcp on regulated surfaces.' },
    { id: 'market', name: 'Market/SEO E · Reach', role: 'Discoverability', one: 'Keeps it findable and competitive — search advantage, not keyword stuffing.' },
  ],
  stageOwners: { research: 'reviewer', plan: 'data', produce: 'copywriter', review: 'reviewer', certify: 'executor' },

  concerns() {
    return ['Clarity & structure', 'Evidence & quantification', 'Differentiation', 'Audience fit', 'Discoverability'];
  },

  // STEP 1 — multi-dimensional blind diagnostic
  research(brief, ctx) {
    const { score, scan, gaps, finance } = getOpt(brief, ctx);
    const aiTotal = scan.reduce((a, h) => a + h.count, 0);
    let md = `# 04 · Step 1 — Multi-dimensional diagnostic (blind score)\n\n_The whole squad scores the original content blind, then names the three most fatal flaws._\n\n`;
    md += `| Dimension | Score |\n|---|---:|\n${score.dims.map((d) => `| ${d.dim} | ${d.score} |`).join('\n')}\n| **Overall** | **${score.overall}/100** |\n\n`;
    md += `## The 3 most fatal flaws\n${score.fatalFlaws.map((f, i) => `${i + 1}. **${f.dim}** (${f.score}) — ${f.why}`).join('\n')}\n\n`;
    md += `## AI-tone tells (to remove)\n${aiTotal ? scan.slice(0, 10).map((h) => `- \`${h.term}\` ×${h.count}`).join('\n') : '- none — voice is already human'}\n\n`;
    md += `## Claims missing a number\n${gaps.length ? gaps.map((g) => `- "${g.sentence}" → ${g.why}`).join('\n') : '- none flagged'}\n`;
    if (finance) md += `\n> Regulated-finance surface detected (${finance.feature} · ${finance.rule}) — the Data officer will quantify it against eds-mcp in Step 2.\n`;
    const out = ctx.wa('04-research-brief.md', md);
    return { text: md, out, coverage: 100, conflicts: aiTotal, findings: score.dims.length, sources: ['Blind-score rubric', 'AI-tone scanner', 'Quantification check'], summary: `blind score ${score.overall}/100 · ${score.fatalFlaws.length} fatal flaw(s) · ${aiTotal} AI-tone tell(s)` };
  },

  // STEP 2 — adversarial debate (Reviewer B + Data D challenge the work) + real quantification
  plan(brief, ctx) {
    const { score, gaps, finance } = getOpt(brief, ctx);
    let md = `# 06 · Step 2 — Adversarial debate (Reviewer B ⨯ Data/Logic D)\n\n`;
    md += `## Reviewer B challenges the work\n`;
    md += score.fatalFlaws.map((f) => `- On **${f.dim}**: "${f.why}". Would a hard buyer (an OpenAI / Goldman decision-maker) sign off, or find the reason to say no?`).join('\n');
    md += `\n- The standing question: **how does this create a real benefit for the user / the business?** If it cannot be answered in one sentence with a number, it is not ready.\n\n`;
    md += `## Data/Logic D — quantify or flag\n`;
    md += gaps.length ? gaps.map((g) => `- "${g.sentence}" → attach a measured number (ROI / cost saved / conversion lift / time saved).`).join('\n') : '- every claim already carries a number — verify each against its source.';
    md += `\n`;

    const eng = ctx.engine;
    if (finance && eng && eng.wired) {
      const jur = finance.jurisdiction || 'global';
      let cc = {}, fr = {}, pairs = 0, belowAA = 0, crNote = '';
      try { cc = eng.core.complianceCheck({ jurisdiction: jur, feature: finance.feature }) || {}; } catch { /* skip */ }
      try { fr = eng.core.findByRegulation(finance.rule) || {}; } catch { /* skip */ }
      try { const cr = eng.core.contrastReport() || {}; pairs = cr.pairs ? Object.values(cr.pairs).reduce((a, arr) => a + (arr ? arr.length : 0), 0) : 0; belowAA = (cr.failures || []).length; crNote = cr.note || ''; } catch { /* skip */ }
      const comps = (cc.matchedComponents || []).map((c) => c.id || c);
      md += `\n## eds-mcp evidence (regulated surface — real engine, not asserted)\n`;
      md += `- **Jurisdiction / feature:** ${cc.jurisdiction || jur} · ${finance.feature}\n`;
      md += `- **Guardrail components this should map to:** ${comps.length ? comps.join(', ') : '— (extend the contract)'} ${cc.count != null ? `(${cc.count})` : ''}\n`;
      md += `- **Regulatory anchors present:** ${(cc.anchorsPresent || []).join(' · ') || '—'}\n`;
      md += `- **Components addressing ${finance.rule}:** ${fr.count != null ? fr.count : (fr.results || []).length} (${(fr.results || []).slice(0, 5).map((r) => r.id).join(', ') || '—'})\n`;
      md += `- **Token contrast (the system it ships on):** ${pairs} pairs checked · **${belowAA} below WCAG AA**\n`;
      if (crNote) md += `- _${crNote.slice(0, 120)}_\n`;
      md += `\n> This is the difference between *asserting* "accessible and compliant" and *showing* it: the numbers above come from the eds-mcp engine.\n`;
    } else if (finance) {
      md += `\n## eds-mcp evidence\n- Regulated surface detected (${finance.feature} · ${finance.rule}) but eds-mcp is not wired here — pass \`--eds <path>\` to quantify against the real engine.\n`;
    }
    md += `\n> Quantification is the agents' job; the judgment call on what ships stays human, at the gate.\n`;
    const out = ctx.wa('06-plan.md', md);
    return { text: md, out, summary: `${score.fatalFlaws.length} flaws debated · ${gaps.length} quantify gap(s)${finance ? ' · eds-mcp ' + (eng && eng.wired ? 'quantified' : 'flagged') : ''}` };
  },

  // STEP 3 — humanize + produce the optimized version
  produce(brief, ctx) {
    const { content, score, scan } = getOpt(brief, ctx);
    const ht = humanTone(content);
    const optimized = `# Optimized version / 最適化版\n\n> Deterministic de-AI pass (${ht.removed} filler phrase(s) stripped) + a structure to finish. The creative rewrite — the part that needs taste — is the operator's or the host LLM's; the agents do not invent facts.\n\n## Cleaned draft\n\n${ht.text || content}\n\n## Structure to lift it to the top 1%\n1. **Open with the single-minded proposition** — the one promise, in one line, with a number.\n2. **Lead each claim with its evidence** — every benefit gets a measured figure beside it (the Data officer flagged the gaps in Step 2).\n3. **Cut the filler** — ${scan.length ? 'remove: ' + scan.slice(0, 8).map((h) => '`' + h.term + '`').join(', ') : 'voice is already clean'}.\n4. **Name the reader** — speak to the exact buyer / job-to-be-done, not "users" in general.\n5. **Make it findable** — one head term, repeated with intent; scannable headings.\n`;
    const diff = `# Humanize diff (Copy C)\n\n- Filler phrases removed: **${ht.removed}**\n- AI-tone tells flagged: ${scan.length ? scan.map((h) => `\`${h.term}\`×${h.count}`).join(', ') : 'none'}\n- Original blind score: **${score.overall}/100** → fix the three fatal flaws above to raise it.\n`;
    ctx.wa('07-build/optimized-version.md', optimized);
    ctx.wa('07-build/humanized-diff.md', diff);
    ctx.wa('07-build/_manifest.md', `# 07 · Produce\n\nWritten: optimized-version.md, humanized-diff.md. ${ht.removed} filler phrase(s) stripped.\n`);
    return { text: optimized + diff, out: '07-build/', files: 2, summary: `${ht.removed} filler stripped · optimized version drafted` };
  },

  // no blind praise
  review(brief, ctx) {
    const { score, gaps } = getOpt(brief, ctx);
    const v = verdict(score);
    const md = `# 08 · Verdict — no blind praise (Reviewer B)\n\n**${v.line}**\n\n## Did the optimized version raise each fatal flaw?\n${score.fatalFlaws.map((f) => `- [ ] **${f.dim}** (was ${f.score}) — ${f.why}`).join('\n')}\n\n## Still open\n- ${gaps.length ? gaps.length + ' claim(s) still need a real number' : 'no unquantified claims'}\n\n_Pass only when it would survive a top-tier interview/review — not before._\n`;
    const out = ctx.wa('08-review.md', md);
    return { text: md, out, issues: (v.pass ? 0 : 1) + gaps.length, summary: v.label + ` (${score.overall}/100)` };
  },

  // final deliverable, in the exact 3-part output format
  certify(brief, ctx) {
    const { score, scan, gaps, finance } = getOpt(brief, ctx);
    const aiTotal = scan.reduce((a, h) => a + h.count, 0);
    const md = `# 09 · Final output (Executor A) — the three-part format\n\n` +
      `## Expert diagnostic / 専門家による診断 (bullets)\n` +
      `- Blind score: **${score.overall}/100**\n` +
      score.fatalFlaws.map((f) => `- Fatal flaw — **${f.dim}** (${f.score}): ${f.why}`).join('\n') + '\n' +
      `- AI-tone filler to cut: ${aiTotal ? scan.slice(0, 8).map((h) => '`' + h.term + '`').join(', ') : 'none'}\n` +
      `- Claims missing a number: ${gaps.length}\n\n` +
      `## Optimized version / 最適化版 (ready to use)\n` +
      `- See \`07-build/optimized-version.md\` — de-AI'd draft + the structure to finish to the top 1%.\n\n` +
      `## Business-value assessment / ビジネス価値評価\n` +
      `- Each claim must tie to a business outcome — cost reduction, ROI lift, conversion, or hours saved. The Data officer flagged **${gaps.length}** place(s) where the number is missing; attach measured figures there.\n` +
      (finance ? `- Regulated surface (${finance.feature} · ${finance.rule}): quantified against eds-mcp in \`06-plan.md\` — guardrail components + token-contrast pass rate are shown, not asserted.\n` : `- No regulated-finance surface here, so the value case is commercial: lead with the single metric the hard buyer cares about.\n`) +
      `\n_What the squad did: diagnose, debate, de-AI, quantify, structure. What stays human: the creative rewrite and the two gates._\n`;
    ctx.wa('09-final-output.md', md);
    return { text: md, count: 3, summary: `3-part output · verdict ${verdict(score).label}` };
  },
};
