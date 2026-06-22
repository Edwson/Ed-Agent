// research.mjs — Stage 4. The Data agent.
// Gather evidence → cross-compare sources per trigger → flag corroboration vs
// conflict → compress each claim to the load-bearing clause → legal/regulatory check.
//
// Offline + deterministic over knowledge/regulatory.json. A live-retrieval hook is
// pluggable: pass opts.knowledge (an array of entries) to replace the offline base.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const KB_PATH = join(here, '..', 'knowledge', 'regulatory.json');

const UNVERIFIED = /UNVERIFIED|whitepaper|draft|internal-policy|blog|forum/i;

/** Strip the leading subject + modal so only the load-bearing clause remains. */
export function compressClaim(claim) {
  let s = String(claim).trim();
  s = s.replace(/^(A |An |The )?[A-Za-z ,'/-]{0,60}?\b(must|should|shall|are required to|is required to|need to|needs to)\b\s*/i, '');
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (s.length > 140) {
    const cut = s.lastIndexOf(',', 140);
    s = (cut > 60 ? s.slice(0, cut) : s.slice(0, 139)).trim() + '…';
  }
  return s;
}

function loadKnowledge(opts) {
  if (opts && Array.isArray(opts.knowledge)) return opts.knowledge;
  return JSON.parse(readFileSync(KB_PATH, 'utf8')).entries;
}

const jurMatch = (entryJur, jur) => entryJur === jur || entryJur === 'global' || entryJur === 'any';

export function research(analyzeOut, intk, opts = {}) {
  const kb = loadKnowledge(opts);
  const triggers = analyzeOut.regulatoryTriggers;
  const findings = [];
  const conflicts = [];
  const sourcesUsed = new Set();

  for (const trigger of triggers) {
    // candidate evidence: same trigger, jurisdiction-compatible
    const cands = kb.filter((e) => e.trigger === trigger && jurMatch(e.jurisdiction, intk.jurisdiction));
    if (!cands.length) {
      findings.push({ trigger, status: 'uncovered', anchors: [], sources: [], compressed: [], note: 'No evidence in the knowledge base — flag for live retrieval / counsel.' });
      continue;
    }
    const verified = cands.filter((e) => !UNVERIFIED.test(e.rule + ' ' + e.source));
    const unverified = cands.filter((e) => UNVERIFIED.test(e.rule + ' ' + e.source));

    let status;
    if (unverified.length && verified.length) {
      status = 'conflict';
      conflicts.push({
        trigger,
        detail: `An unverified source (${unverified.map((u) => u.source).join(', ')}) contradicts the regulator position. Engine keeps the regulator claim; the unverified one is quarantined for human review.`,
      });
    } else if (verified.length >= 2) {
      status = 'corroborated';
    } else {
      status = 'single-source';
    }

    const used = verified.length ? verified : cands; // never surface only-unverified as fact
    used.forEach((e) => sourcesUsed.add(e.source));
    findings.push({
      trigger,
      status,
      anchors: [...new Set(used.map((e) => e.rule))],
      sources: [...new Set(used.map((e) => e.source))],
      compressed: used.map((e) => ({ source: e.source, rule: e.rule, clause: compressClaim(e.claim), anchorPhrase: e.key })),
      quarantined: unverified.map((u) => ({ source: u.source, rule: u.rule, clause: compressClaim(u.claim) })),
      note: status === 'single-source' ? 'Single regulator source — acceptable, but corroboration recommended.' : '',
    });
  }

  const covered = findings.filter((f) => f.status === 'corroborated' || f.status === 'single-source' || f.status === 'conflict').length;
  return {
    findings,
    conflicts,
    coverage: { covered, total: triggers.length, pct: triggers.length ? Math.round((covered / triggers.length) * 100) : 0 },
    sourcesUsed: [...sourcesUsed],
  };
}
