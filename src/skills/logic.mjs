// skills/logic.mjs — the shared reasoning skill. Deterministic helpers every
// mission composes: decompose, constraints, assumptions, contradiction scan,
// claim compression, and a generic cross-compare over sourced evidence.
import { clauses, uniq } from '../util.mjs';

/** Decompose a requirement into candidate sub-requirements. */
export const decompose = (requirement) => uniq(clauses(requirement)).slice(0, 8);

/** Strip the leading subject + modal so only the load-bearing clause remains. */
export function compressClaim(claim) {
  let s = String(claim).trim();
  s = s.replace(/^(A |An |The )?[A-Za-z ,'/-]{0,60}?\b(must|should|shall|are required to|is required to|need to|needs to|will|can)\b\s*/i, '');
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (s.length > 140) {
    const cut = s.lastIndexOf(',', 140);
    s = (cut > 60 ? s.slice(0, cut) : s.slice(0, 139)).trim() + '…';
  }
  return s;
}

const UNVERIFIED = /UNVERIFIED|whitepaper|draft|internal-policy|blog|forum|reddit|unsourced/i;

/**
 * Cross-compare sourced evidence grouped by a key field.
 * entries: [{ group, source, rule|ref, claim, key }]
 * Returns findings with status corroborated|single-source|conflict|uncovered,
 * compressed clauses, and quarantined (unverified) claims.
 */
export function crossCompare(groups, entriesByGroup) {
  const findings = [];
  const conflicts = [];
  const sources = new Set();
  for (const group of groups) {
    const cands = entriesByGroup(group);
    if (!cands.length) {
      findings.push({ group, status: 'uncovered', anchors: [], sources: [], compressed: [], quarantined: [] });
      continue;
    }
    const verified = cands.filter((e) => !UNVERIFIED.test((e.rule || e.ref || '') + ' ' + e.source));
    const unverified = cands.filter((e) => UNVERIFIED.test((e.rule || e.ref || '') + ' ' + e.source));
    let status;
    if (unverified.length && verified.length) {
      status = 'conflict';
      conflicts.push({ group, detail: `Unverified source (${unverified.map((u) => u.source).join(', ')}) contradicts the authoritative position; quarantined for human review.` });
    } else if (verified.length >= 2) status = 'corroborated';
    else status = 'single-source';
    const used = verified.length ? verified : cands;
    used.forEach((e) => sources.add(e.source));
    findings.push({
      group, status,
      anchors: uniq(used.map((e) => e.rule || e.ref).filter(Boolean)),
      sources: uniq(used.map((e) => e.source)),
      compressed: used.map((e) => ({ source: e.source, ref: e.rule || e.ref || '', clause: compressClaim(e.claim) })),
      quarantined: unverified.map((u) => ({ source: u.source, ref: u.rule || u.ref || '', clause: compressClaim(u.claim) })),
    });
  }
  const covered = findings.filter((f) => f.status !== 'uncovered').length;
  return { findings, conflicts, coverage: { covered, total: groups.length, pct: groups.length ? Math.round((covered / groups.length) * 100) : 0 }, sources: [...sources] };
}

/** Render a findings set to a markdown brief. */
export function renderFindings(title, cc) {
  let md = `# ${title}\n\n**Coverage:** ${cc.coverage.pct}% (${cc.coverage.covered}/${cc.coverage.total}) · **Sources:** ${cc.sources.join(', ') || '—'}\n\n`;
  for (const f of cc.findings) {
    md += `## ${f.group} — ${f.status.toUpperCase()}\n`;
    if (f.anchors.length) md += `**Anchors:** ${f.anchors.join(' · ')}\n\n`;
    for (const c of f.compressed) md += `- ${c.clause} *(— ${c.source}${c.ref ? ', ' + c.ref : ''})*\n`;
    if (f.quarantined && f.quarantined.length) {
      md += `\n> ⚠ Quarantined (unverified, not used as fact):\n`;
      for (const q of f.quarantined) md += `> - ${q.clause} *(— ${q.source}${q.ref ? ', ' + q.ref : ''})*\n`;
    }
    md += '\n';
  }
  return md;
}

/** Flag vague / ambiguous terms in text — used by the contract logic reviewer. */
const VAGUE = ['reasonable', 'promptly', 'as soon as possible', 'best efforts', 'material', 'from time to time', 'including but not limited to', 'satisfactory', 'appropriate', 'substantial', 'good faith', 'commercially reasonable'];
export function ambiguityScan(text) {
  const t = String(text).toLowerCase();
  return VAGUE.filter((v) => t.includes(v)).map((term) => ({ term, why: 'undefined standard — bind it to a measurable test or a definitions clause' }));
}
