// skills/redteam.mjs — the mission-aware red team (v0.5). A deterministic adversarial
// pass whose only job is to ATTACK the produced artifact for what THIS mission cares
// about. The universal layer reuses the already-verified assessors, reframed as findings
// + severity; domain overlays (code / marketing / contract / finance) add anti-pattern
// catalogs keyed by mission.id. Zero-dependency, zero LLM calls. Honest by construction:
// it states its own coverage and never claims to be exhaustive or to replace a human
// expert — so it passes its own "no confident nonsense" test.
import { aiToneScan, quantifyGaps } from './quality.mjs';
import { substanceScan, globalCoherence } from './trust.mjs';
import { ambiguityScan } from './logic.mjs';

const COVERAGE = 'The red team checks against the loaded rule catalog + known anti-patterns. It is NOT exhaustive and does NOT replace a human expert (security / legal / compliance). Absence of a finding is not proof of safety.';

const SEV = { critical: 0, high: 1, medium: 2, low: 3 };

// ── domain overlay catalogs — deterministic regex / structural patterns, keyed by mission.id.
// Each rule: { id, severity, category, re | test, message, fixHint, source, detail? }
const CATALOGS = {
  code: [
    { id: 'injection-sink', severity: 'critical', category: 'security', re: /\beval\s*\(|new Function\s*\(|child_process|(?:^|[^.\w])exec\s*\(|innerHTML\s*=/g, message: 'possible injection sink (eval / exec / innerHTML) — untrusted input could execute', fixHint: 'parameterise / escape / avoid dynamic execution', source: 'OWASP A03' },
    { id: 'hardcoded-secret', severity: 'critical', category: 'secrets', re: /\b(api[_-]?key|secret|password|passwd|token|access[_-]?key)\b\s*[:=]\s*['"][^'"]{6,}['"]/gi, message: 'hardcoded secret literal', fixHint: 'read from env / a managed secret store (12-Factor III)', source: 'OWASP ASVS V6' },
    { id: 'empty-catch', severity: 'high', category: 'error-handling', re: /catch\s*\([^)]*\)\s*\{\s*(\/\/[^\n]*\s*)?\}/g, message: 'empty catch — swallows the error it pretends to handle', fixHint: 'log with context + fail closed, or rethrow', source: 'OWASP / Google SRE' },
    { id: 'todo-in-ship', severity: 'medium', category: 'completeness', re: /\b(TODO|FIXME|XXX|not implemented|placeholder|coming soon)\b/gi, message: 'unfinished marker in a shippable path', fixHint: 'finish it, or move it out of the ship path', source: '—' },
  ],
  marketing: [
    { id: 'superlative-no-source', severity: 'high', category: 'unsubstantiated', re: /\b(world-class|best-in-class|the best|#1|number one|market-leading|industry-leading|unmatched|unrivalled|guaranteed)\b/gi, message: 'superlative with no cited source — an unsubstantiated claim a regulator or skeptic will challenge', fixHint: 'cite the number / source, or cut the superlative', source: 'house rule' },
    { id: 'fabricated-stat-shape', severity: 'medium', category: 'evidence', test: (t) => /\b\d{1,3}\s?%/.test(t) && !/(source|n\s*=|per\s|study|survey|\bdata\b|measured|GA4|according to)/i.test(t), message: 'a percentage claim with no visible source / sample', fixHint: 'attach the source, sample size, or window', source: 'house rule' },
    { id: 'missing-disclaimer', severity: 'medium', category: 'compliance', test: (t) => /\b(returns?|guarantee|risk-free|profit|yield|outperform)\b/i.test(t) && !/(not (financial|investment) advice|capital at risk|past performance|disclaimer)/i.test(t), message: 'performance / return language with no risk disclaimer', fixHint: 'add the risk disclaimer appropriate to the jurisdiction', source: 'house rule' },
  ],
  contract: [
    { id: 'ambiguous-quantifier', severity: 'high', category: 'ambiguity', test: (t) => ambiguityScan(t).length > 0, detail: (t) => ambiguityScan(t).map((a) => a.term).join(', '), message: 'undefined standard(s) — an unbounded obligation', fixHint: 'bind each to a measurable test or a definitions clause', source: 'house rule' },
    { id: 'unilateral-right', severity: 'medium', category: 'balance', re: /\b(sole discretion|at any time|without notice|unilateral(?:ly)?|for any reason)\b/gi, message: 'unilateral right with no reciprocal — a one-sided clause', fixHint: 'add reciprocity, notice, or a cure period', source: 'house rule' },
    { id: 'missing-carveout', severity: 'medium', category: 'completeness', test: (t) => /\b(indemnif|liabilit|confidential)\w*/i.test(t) && !/\b(carve-?out|except|exclud|limitation of liability|\bcap\b)\b/i.test(t), message: 'indemnity / liability / confidentiality with no visible carve-out or cap', fixHint: 'add the standard carve-outs + a liability cap', source: 'house rule' },
  ],
  finance: [
    // the engine-backed anchor check runs in the finance mission; here the red team flags the
    // SHAPE of a regulated obligation that carries no citation at all.
    { id: 'regulated-claim-no-anchor', severity: 'high', category: 'compliance', test: (t) => /\b(KYC|AML|CDD|EDD|suitability|best execution|sanctions|source of funds|disclosure)\b/i.test(t) && !/\b([A-Z]{2,}\s?\d|Rule\s?\d|Reg\s?[A-Z]|Article\s?\d|RG\s?\d|Notice\s?\d|FATF|FinCEN|MiFID|ASIC|FINRA|SEC|31\s?CFR)\b/.test(t), message: 'a regulated obligation stated with no citation / anchor', fixHint: 'cite the rule — the eds-mcp regulation map supplies the anchor for the jurisdiction', source: 'eds-mcp regulation map' },
  ],
  optimize: [], // optimize already runs the full quality + trust discipline; no extra catalog
};

const decisionsOf = (text) => String(text)
  .split(/\n+/)
  .map((s) => s.replace(/^\s*(?:#{1,6}\s*|[-*>]\s*|\d+\.\s*|\/\/+\s*)/, '').trim())
  .filter((s) => s.length > 6 && /[a-z]/i.test(s))
  .slice(0, 24);

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/**
 * Adversarial scan. artifact = the produced text / code. ctx = { mission, intent }.
 * Universal findings (any mission) reuse the verified assessors; the domain overlay adds
 * the mission catalog. Returns findings + counts + the honest coverage statement.
 */
export function redTeamScan(artifact, ctx = {}) {
  const text = String(artifact || '');
  const mid = (ctx.mission && ctx.mission.id) || 'universal';
  const intent = ctx.intent || { stated: false, goal: '', nonGoals: [] };
  const findings = [];

  // ── universal layer (reuse verified assessors, reframed as attack findings) ──
  for (const g of quantifyGaps(text)) findings.push({ id: 'unquantified-claim', severity: 'medium', category: 'evidence', message: `claim with no number: "${g.sentence}"`, fixHint: g.why, source: 'quality.quantifyGaps' });
  const ai = aiToneScan(text).reduce((a, h) => a + h.count, 0);
  if (ai) findings.push({ id: 'ai-tone-filler', severity: 'low', category: 'voice', message: `${ai} AI-tone filler tell(s) — reads generic`, fixHint: 'cut the filler; say the specific thing', source: 'quality.aiToneScan' });
  const ss = substanceScan(text);
  if (ss.verdict === 'CEREMONY') for (const f of ss.flags) findings.push({ id: 'empty-ceremony', severity: 'medium', category: 'substance', message: f, fixHint: 'replace ceremony with real payload', source: 'trust.substanceScan' });
  if (intent.stated && intent.goal) {
    const coh = globalCoherence(decisionsOf(text), intent);
    for (const lo of coh.localOptima) findings.push({ id: 'contradicts-non-goal', severity: 'critical', category: 'coherence', message: `does what was declared a NON-GOAL — "${lo.decision}"`, fixHint: 'remove it, or the human must consciously accept the trade-off', source: 'trust.globalCoherence' });
  }

  // ── domain overlay (mission catalog, keyed by mission.id) ──
  for (const rule of (CATALOGS[mid] || [])) {
    if (rule.re) {
      const re = new RegExp(rule.re.source, rule.re.flags.includes('g') ? rule.re.flags : rule.re.flags + 'g');
      const seen = new Set();
      let m;
      while ((m = re.exec(text)) !== null) {
        const ln = lineOf(text, m.index);
        if (!seen.has(ln)) { seen.add(ln); findings.push({ id: rule.id, severity: rule.severity, category: rule.category, line: ln, message: rule.message, fixHint: rule.fixHint, source: rule.source }); }
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    } else if (rule.test && rule.test(text)) {
      const detail = rule.detail ? ` (${rule.detail(text)})` : '';
      findings.push({ id: rule.id, severity: rule.severity, category: rule.category, message: rule.message + detail, fixHint: rule.fixHint, source: rule.source });
    }
  }

  findings.sort((a, b) => (SEV[a.severity] - SEV[b.severity]));
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) counts[f.severity]++;
  return { mission: mid, findings, counts, coverage: COVERAGE, block: counts.critical > 0 };
}

/** Critical findings as the questions a human must consciously accept (used by --strict). */
export function redTeamQuestions(report) {
  return report.findings.filter((f) => f.severity === 'critical')
    .map((f) => `Red team (critical) — ${f.message}. ${f.fixHint}. Fix, or consciously accept?`);
}

/** Markdown block appended to the review artifact. */
export function redTeamBlock(report) {
  const c = report.counts;
  let md = `\n## Red team — adversarial pass (mission: ${report.mission})\n\n`;
  md += `**Findings:** ${report.findings.length}  ·  critical ${c.critical} · high ${c.high} · medium ${c.medium} · low ${c.low}\n\n`;
  if (!report.findings.length) md += '_No findings against the loaded catalog._\n';
  else {
    md += '| Severity | Finding | Fix |\n|---|---|---|\n';
    for (const f of report.findings.slice(0, 24)) md += `| ${f.severity.toUpperCase()}${f.line ? ` · L${f.line}` : ''} | ${String(f.message).replace(/\|/g, '\\|')} | ${String(f.fixHint).replace(/\|/g, '\\|')} |\n`;
  }
  md += `\n> ${report.coverage}\n`;
  return md;
}
