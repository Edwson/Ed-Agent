// missions/marketing.mjs — the growth squad: Creative Director · Conversion
// Analyst · Consumer Psychologist · SEO.
import { decompose, crossCompare, renderFindings } from '../skills/logic.mjs';
import { uniq } from '../util.mjs';

const KB = [
  { group: 'Persuasion principles', source: 'Cialdini', ref: 'Influence', claim: 'Reciprocity, commitment, social proof, authority, liking and scarcity drive a decision — use them honestly.' },
  { group: 'Value proposition', source: 'NN/g', ref: 'Usability', claim: 'A landing page must answer what / for whom / why now within the first viewport.' },
  { group: 'Funnel friction', source: 'Baymard', ref: 'Checkout research', claim: 'Each extra form field measurably lowers completion; remove every non-essential step.' },
  { group: 'Funnel friction', source: 'NN/g', ref: 'Forms', claim: 'Show progress, validate inline, and never make the user re-enter known data.' },
  { group: 'Measurement', source: 'Google Analytics', ref: 'GA4 funnels', claim: 'Define the funnel and the conversion event before launch, not after.' },
  { group: 'Claim compliance', source: 'FTC', ref: 'Endorsement Guides', claim: 'Every performance or testimonial claim must be substantiated and disclosed.' },
  { group: 'Audience clarity', source: 'JTBD', ref: 'Jobs to be Done', claim: 'People hire a product for a job; segment by the job, not by demographics alone.' },
  { group: 'Channel fit', source: 'benchmark report', ref: 'industry (UNVERIFIED)', claim: 'Paid social always beats SEO for early-stage SaaS.' },
];
const CONCERN_RE = [
  [/\b(audience|segment|persona|who|target)\b/i, 'Audience clarity'],
  [/\b(value|benefit|proposition|why|differen)\b/i, 'Value proposition'],
  [/\b(funnel|signup|checkout|form|onboard|conver)\b/i, 'Funnel friction'],
  [/\b(channel|seo|social|email|ad|paid|organic)\b/i, 'Channel fit'],
  [/\b(track|measure|analytic|metric|kpi)\b/i, 'Measurement'],
  [/\b(claim|testimonial|guarantee|result|roi)\b/i, 'Claim compliance'],
];

export const marketing = {
  id: 'marketing',
  name: 'Marketing / growth',
  detect: /\b(campaign|launch|landing|ad|advert|seo|conversion|funnel|email|social|brand|growth|acquisition|copy|audience|promotion|newsletter|outreach|positioning)\b/i,
  build: 'skills',
  squad: [
    { id: 'creative', name: 'Creative Director', role: 'Concept & message', one: 'Owns the single-minded proposition, tone and hero message.' },
    { id: 'conversion', name: 'Conversion Analyst', role: 'Funnel math', one: 'Models the funnel and the conversion economics — honestly labelled assumptions.' },
    { id: 'psych', name: 'Consumer Psychologist', role: 'Behavioural lens', one: 'Applies persuasion principles ethically; flags dark patterns.' },
    { id: 'seo', name: 'SEO', role: 'Discoverability', one: 'Keyword clusters + on-page plan so the page is found.' },
  ],
  stageOwners: { research: 'psych', plan: 'creative', produce: 'conversion', review: 'psych', certify: 'creative' },

  concerns(req) {
    const out = CONCERN_RE.filter(([re]) => re.test(req)).map(([, n]) => n);
    return uniq(['Audience clarity', 'Value proposition', 'Funnel friction', 'Measurement', ...out]);
  },

  research(brief, ctx) {
    const groups = uniq([...brief.concerns, 'Persuasion principles', 'Channel fit']);
    const cc = crossCompare(groups, (g) => KB.filter((e) => e.group === g));
    const md = renderFindings('04 · Market & audience research (behavioural + benchmark sources)', cc);
    const out = ctx.wa('04-research-brief.md', md);
    return { text: md, out, coverage: cc.coverage.pct, conflicts: cc.conflicts.length, findings: cc.findings.length, sources: cc.sources, summary: `${cc.coverage.pct}% coverage · ${cc.conflicts.length} unverified claim quarantined` };
  },

  plan(brief, ctx) {
    const md = `# 06 · Creative brief (Creative Director)\n\n- **Objective:** ${brief.requirement}\n- **Audience:** the job-to-be-done behind the requirement (segment by job, not demographics alone)\n- **Single-minded proposition:** one promise the page must land\n- **Tone:** confident, specific, claim-substantiated\n- **Hero message:** answer what / for whom / why-now in the first viewport\n- **Channels (hypothesis):** test ≥2, measure, double down on the winner\n\n> Creative judgment stays human — the Director proposes; the operator approves at the gate.\n`;
    const out = ctx.wa('06-plan.md', md);
    return { text: md, out, summary: 'creative brief drafted' };
  },

  produce(brief, ctx) {
    // conversion model — explicit, labelled assumptions
    const imp = 100000, ctr = 0.02, lp2signup = 0.08, signup2act = 0.40, act2paid = 0.25;
    const clicks = Math.round(imp * ctr), signups = Math.round(clicks * lp2signup), activated = Math.round(signups * signup2act), paid = Math.round(activated * act2paid);
    const funnel = `# Conversion model (Conversion Analyst)\n\n> **Assumed industry-ballpark rates — not measured. Replace each rate with your own analytics.**\n\n| Stage | Rate (assumed) | Count |\n|---|---:|---:|\n| Impressions | — | ${imp.toLocaleString()} |\n| Clicks | ${(ctr * 100).toFixed(1)}% CTR | ${clicks.toLocaleString()} |\n| Sign-ups | ${(lp2signup * 100).toFixed(0)}% LP→signup | ${signups.toLocaleString()} |\n| Activated | ${(signup2act * 100).toFixed(0)}% | ${activated.toLocaleString()} |\n| Paid | ${(act2paid * 100).toFixed(0)}% | ${paid.toLocaleString()} |\n\n**End-to-end:** ${imp.toLocaleString()} impressions → **${paid.toLocaleString()} paid** (${((paid / imp) * 100).toFixed(3)}%). Move the **sign-up** rate first — it is usually the cheapest lever (cut form friction).\n`;
    // SEO plan — keyword clusters from the requirement
    const words = uniq(brief.requirement.toLowerCase().match(/\b[a-z]{4,}\b/g) || []).filter((w) => !['with', 'that', 'this', 'from', 'your', 'them', 'when', 'what'].includes(w)).slice(0, 5);
    const head = words.slice(0, 2).join(' ') || 'product';
    const seo = `# SEO plan (SEO)\n\n## Keyword clusters\n- **Head:** ${head}\n- **Long-tail:** ${words.map((w) => `"best ${w}", "how to ${w}", "${w} for teams"`).join(', ')}\n\n## On-page checklist\n- [ ] one H1 matching search intent\n- [ ] title + meta description with the head term\n- [ ] semantic headings, internal links, alt text\n- [ ] JSON-LD where a rich result applies\n- [ ] Core Web Vitals budget met\n`;
    const copy = `# Copy outline (Creative + Psychologist)\n\n## Headline options\n1. <benefit> without <pain>\n2. The <category> that <single-minded proposition>\n3. <social proof number> teams use <product> to <job>\n\n## CTA\n- primary: start / get / see (one verb, one outcome)\n- supporting: risk reducer (no card, cancel anytime — if true)\n`;
    ctx.wa('07-build/conversion-model.md', funnel);
    ctx.wa('07-build/seo-plan.md', seo);
    ctx.wa('07-build/copy-outline.md', copy);
    ctx.wa('07-build/_manifest.md', `# 07 · Produce\n\nWritten: conversion-model.md, seo-plan.md, copy-outline.md. Projected paid (assumed rates): ${paid}.\n`);
    return { text: funnel + seo + copy, out: '07-build/', files: 3, summary: `funnel model (→ ${paid} paid, assumed) · SEO plan · copy outline` };
  },

  review(brief, ctx) {
    const claims = (brief.requirement.match(/\b(\d+%|\d+x|best|fastest|guaranteed|#1|leading)\b/gi) || []);
    const md = `# 08 · Conversion + claims review (Consumer Psychologist)\n\n## Persuasion principles applied (ethically)\n- social proof, authority, scarcity — only where true\n- no dark patterns (no fake urgency, no forced continuity)\n\n## Unsubstantiated-claim flags\n${claims.length ? claims.map((c) => `- "${c}" — substantiate or remove (FTC endorsement guides)`).join('\n') : '- none flagged'}\n\n## Measurement\n- conversion event + funnel defined before launch (GA4)\n`;
    const out = ctx.wa('08-review.md', md);
    return { text: md, out, issues: claims.length, summary: `${claims.length} claim(s) to substantiate` };
  },

  certify(brief, ctx) {
    const checklist = ['tracking + conversion event installed', 'all claims substantiated + disclosed', 'A/B test plan defined', 'brand + legal approved', 'one channel chosen to measure first'];
    const md = `# 09 · Launch checklist (Creative Director)\n\n${checklist.map((c) => `- [ ] ${c}`).join('\n')}\n`;
    ctx.wa('09-conformance.md', md);
    return { text: md, count: checklist.length, summary: `${checklist.length}-item launch checklist` };
  },
};
