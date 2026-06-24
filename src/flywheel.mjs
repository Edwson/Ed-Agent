// flywheel.mjs — the learning flywheel (v0.6). When a human rejects something at a
// checkpoint and writes WHY, that lesson should not evaporate. forge() distils the
// rejection into a durable, machine-checkable rule and appends it to the ## Learned rules
// block of Ed_agents_Claude.md; recallRules() reads them back; ruleHits() injects them
// into the next run's analysis + the loop's severity. Each rejection makes the next run
// stricter about exactly the thing the human flagged.
//
// HONEST FRAMING: this is deterministic recorded heuristics, not opaque ML "understanding".
// The trigger is regex extracted from the human's own words (a cited regulation token, a
// quoted phrase, or the load-bearing keywords); the message is the human's reason verbatim.
// The agent does not infer intent — it remembers what it was told, and re-checks for it.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { todayISO } from './util.mjs';

const HEADER = '## Learned rules';
const BLURB = '_Forged from human rejections (--reject / a resolved checkpoint). Deterministic re-checks the agent applies on later runs. Edit or delete freely._';

// regulation / standard tokens worth turning into a trigger, in priority order
const REG_TOKEN = /\b(MiFID(?:\s?II)?|Reg(?:ulation)?\s?[A-Z]{1,3}|Reg\s?BI|RG\s?\d{2,3}|FATF(?:\s?Rec\.?\s?\d+)?|FinCEN|FINRA(?:\s?\d{3,4})?|SEC(?:\s?Rule\s?\d[\w.-]*)?|ASIC|FCA(?:\s?[A-Z]{2,5})?|GDPR(?:\s?Art\.?\s?\d+)?|APPI|PSD2|SOX|BSA|OFAC|Article\s?\d+|Rule\s?\d[\w.-]*|17a-4|31\s?CFR\s?[\d.§]+|ISO\s?\d{3,5})\b/i;

const STOP = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'you', 'your', 'are', 'will', 'can', 'has', 'have', 'not', 'but', 'all', 'any', 'our', 'out', 'use', 'how', 'who', 'why', 'what', 'when', 'into', 'per', 'via', 'must', 'should', 'shall', 'does', 'because', 'violat\w*', 'against', 'without']);
const sevFromReason = (r) => /\b(never|must not|illegal|breach|violat|red line|forbidden|prohibit|critical|unsafe)\b/i.test(r) ? 'critical'
  : /\b(should not|avoid|risk|non-?compliant|missing|require)\b/i.test(r) ? 'high' : 'medium';

/** Extract a deterministic trigger from the human's reason: a regulation token, else a
 *  quoted phrase, else the two strongest content keywords. */
function deriveTrigger(reason) {
  const reg = reason.match(REG_TOKEN);
  if (reg) return { kind: 'regulation', pattern: reg[0].trim() };
  const quoted = reason.match(/["'“]([^"'”]{4,40})["'”]/);
  if (quoted) return { kind: 'phrase', pattern: quoted[1].trim() };
  const words = (reason.toLowerCase().match(/[a-z][a-z-]{3,}/g) || []).filter((w) => !STOP.has(w));
  const top = [...new Set(words)].slice(0, 2);
  return { kind: 'keywords', pattern: top.join(' ') || reason.slice(0, 24).trim() };
}

function ensure(memoryPath) {
  let txt = existsSync(memoryPath) ? readFileSync(memoryPath, 'utf8') : '';
  if (!txt.includes(HEADER)) {
    if (txt.includes('## Run ledger')) txt = txt.replace('## Run ledger', `${HEADER}\n\n${BLURB}\n\n## Run ledger`);
    else txt += `\n${HEADER}\n\n${BLURB}\n`;
    writeFileSync(memoryPath, txt, 'utf8');
  }
  return txt;
}

/**
 * Forge a learned rule from a rejection. { node, reason } → a durable rule.
 * Returns the rule. Idempotent on (pattern + node).
 */
export function forge(memoryPath, { node = 'review', reason }) {
  const why = String(reason || '').trim();
  if (!why) return null;
  ensure(memoryPath);
  const trig = deriveTrigger(why);
  const severity = sevFromReason(why);
  const id = 'LR-' + (trig.pattern.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'rule');
  const line = `- ${id} · [${severity}] · trigger(${trig.kind}): \`${trig.pattern}\` · ${why} _(— ${node} reject, ${todayISO()})_`;

  let txt = readFileSync(memoryPath, 'utf8');
  const m = txt.match(/## Learned rules\n([\s\S]*?)\n## Run ledger/) || txt.match(/## Learned rules\n([\s\S]*)$/);
  const body = m ? m[1] : '';
  const existing = new Set((body.match(/^- LR-.*/gm) || []).map((l) => l.replace(/_\(—[^)]*\)_\s*$/, '').trim()));
  if (existing.has(line.replace(/_\(—[^)]*\)_\s*$/, '').trim())) return { id, ...trig, severity, message: why, node, duplicate: true };
  const rebuilt = `## Learned rules\n\n${BLURB}\n\n${[...(body.match(/^- LR-.*/gm) || []), line].join('\n')}\n`;
  if (txt.match(/## Learned rules\n[\s\S]*?\n## Run ledger/)) txt = txt.replace(/## Learned rules\n[\s\S]*?\n## Run ledger/, rebuilt + '\n## Run ledger');
  else txt = txt.replace(/## Learned rules\n[\s\S]*$/, rebuilt);
  writeFileSync(memoryPath, txt, 'utf8');
  return { id, ...trig, severity, message: why, node };
}

/** Read the learned rules back as structured objects. */
export function recallRules(memoryPath) {
  if (!existsSync(memoryPath)) return [];
  const txt = readFileSync(memoryPath, 'utf8');
  const m = txt.match(/## Learned rules\n([\s\S]*?)\n## Run ledger/) || txt.match(/## Learned rules\n([\s\S]*)$/);
  if (!m) return [];
  const rules = [];
  for (const ln of (m[1].match(/^- LR-.*/gm) || [])) {
    const mm = ln.match(/^- (LR-[\w-]+) · \[(\w+)\] · trigger\((\w+)\): `([^`]+)` · (.*?)(?:\s*_\(—[^)]*\)_)?\s*$/);
    if (mm) rules.push({ id: mm[1], severity: mm[2], kind: mm[3], pattern: mm[4], message: mm[5].trim() });
  }
  return rules;
}

/** Which learned rules an artifact trips (deterministic — regex/substring on the trigger). */
export function ruleHits(text, rules) {
  const t = String(text || '');
  const lo = t.toLowerCase();
  const hits = [];
  for (const r of rules || []) {
    let hit = false;
    if (r.kind === 'regulation' || r.kind === 'phrase') hit = lo.includes(r.pattern.toLowerCase());
    else hit = r.pattern.split(/\s+/).filter(Boolean).every((w) => lo.includes(w));
    if (hit) hits.push({ rule: r, evidence: r.pattern });
  }
  return hits;
}

/** As injectable analysis concerns (so the next run lists what it learned to watch for). */
export const rulesAsConcerns = (rules) =>
  (rules || []).map((r) => `Learned rule ${r.id} [${r.severity}] — watch for "${r.pattern}": ${r.message}`);
