// prefs.mjs — the learning layer. Records the operator's preferences, likes,
// dislikes and concepts into the ## Preferences block of Ed_agents_Claude.md,
// recalls them at the Context stage, and applies them to a run's options.
// Deterministic recorded memory — not opaque ML.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { uniq } from './util.mjs';

const HEADER = '## Preferences';

function ensure(memoryPath) {
  let txt = existsSync(memoryPath) ? readFileSync(memoryPath, 'utf8') : '';
  if (!txt.includes(HEADER)) {
    // insert a Preferences block just before the Run ledger (or append)
    if (txt.includes('## Run ledger')) txt = txt.replace('## Run ledger', `${HEADER}\n\n_Recorded preferences the agent recalls and applies. Edit freely._\n\n## Run ledger`);
    else txt += `\n${HEADER}\n\n_Recorded preferences the agent recalls and applies. Edit freely._\n`;
    writeFileSync(memoryPath, txt, 'utf8');
  }
  return txt;
}

/** items: [{ kind:'prefer'|'like'|'dislike'|'concept', text }] — `prefer` text is "key: value". */
export function record(memoryPath, items) {
  ensure(memoryPath);
  let txt = readFileSync(memoryPath, 'utf8');
  const m = txt.match(/## Preferences\n([\s\S]*?)\n## Run ledger/) || txt.match(/## Preferences\n([\s\S]*)$/);
  const body = m ? m[1] : '';
  const existing = new Set((body.match(/^- .*/gm) || []).map((l) => l.trim()));
  for (const it of items) {
    const line = `- ${it.kind}: ${it.text.trim()}`;
    if (!existing.has(line)) existing.add(line);
  }
  const rebuilt = `## Preferences\n\n_Recorded preferences the agent recalls and applies. Edit freely._\n\n${[...existing].filter(Boolean).join('\n')}\n`;
  if (txt.match(/## Preferences\n[\s\S]*?\n## Run ledger/)) txt = txt.replace(/## Preferences\n[\s\S]*?\n## Run ledger/, rebuilt + '\n## Run ledger');
  else txt = txt.replace(/## Preferences\n[\s\S]*$/, rebuilt);
  writeFileSync(memoryPath, txt, 'utf8');
  return items.length;
}

export function recall(memoryPath) {
  const out = { prefs: {}, likes: [], dislikes: [], concepts: [], count: 0 };
  if (!existsSync(memoryPath)) return out;
  const txt = readFileSync(memoryPath, 'utf8');
  const m = txt.match(/## Preferences\n([\s\S]*?)\n## Run ledger/) || txt.match(/## Preferences\n([\s\S]*)$/);
  if (!m) return out;
  for (const line of (m[1].match(/^- (prefer|like|dislike|concept): (.*)$/gm) || [])) {
    const mm = line.match(/^- (\w+): (.*)$/);
    if (!mm) continue;
    const kind = mm[1], rest = mm[2].trim();
    out.count++;
    if (kind === 'prefer') { const kv = rest.match(/^([\w-]+)\s*:\s*(.+)$/); if (kv) out.prefs[kv[1].toLowerCase()] = kv[2].trim(); }
    else if (kind === 'like') out.likes.push(rest);
    else if (kind === 'dislike') out.dislikes.push(rest);
    else if (kind === 'concept') out.concepts.push(rest);
  }
  out.likes = uniq(out.likes); out.dislikes = uniq(out.dislikes); out.concepts = uniq(out.concepts);
  return out;
}

/** Fill unset run options from recalled preferences. Returns { opts, applied:[] }. */
export function apply(prefs, opts) {
  const applied = [];
  const o = { ...opts };
  if (!o.mission && prefs.prefs.mission) { o.mission = prefs.prefs.mission; applied.push(`mission=${o.mission}`); }
  if (!o.jurisdiction && prefs.prefs.jurisdiction) { o.jurisdiction = prefs.prefs.jurisdiction; applied.push(`jurisdiction=${o.jurisdiction}`); }
  if (prefs.prefs.tone) applied.push(`tone=${prefs.prefs.tone}`);
  return { opts: o, applied };
}
