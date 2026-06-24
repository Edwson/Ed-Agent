// dashboard/data.mjs — the control-room data layer. Parses the SAME human-readable
// Ed_agents_Claude.md the CLI writes (the single source of truth) into structured state
// for the dashboard. Zero-dependency; reuses the verified prefs + flywheel readers so the
// dashboard never re-implements (and never drifts from) the engine. Read-only over runs.
//
// HONESTY: token figures are ESTIMATES (~4 chars/token) the ledger already labels as
// DesignOps cost-governance framing — not billed figures. The dashboard carries that label
// through verbatim; it never presents them as a bill.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { recall as recallPrefs, record as recordPref } from '../src/prefs.mjs';
import { recallRules } from '../src/flywheel.mjs';

const num = (s) => Number(String(s).replace(/[*,\s]/g, '')) || 0;

/** Parse the append-only Run ledger into structured runs (oldest → newest as written). */
export function parseRuns(text) {
  const runs = [];
  const ledger = text.split('## Run ledger')[1] || '';
  const blocks = ledger.split(/(?=^## Run \d{4}-)/m).filter((b) => /^## Run \d{4}-/.test(b));
  for (const b of blocks) {
    const head = b.match(/^## Run (\d{4}-\d{2}-\d{2}) · (.+)$/m);
    if (!head) continue;
    const get = (label) => { const m = b.match(new RegExp('^- \\*\\*' + label + ':\\*\\* (.+)$', 'm')); return m ? m[1].trim() : ''; };

    const detected = get('Detected');
    const [domain, jurisdiction] = detected.split(' · ').map((s) => s.trim());
    const research = get('Research');
    const cov = research.match(/(\d+)% coverage · (\d+) conflict/);

    const gates = (get('Gates') ? get('Gates').split(' · ') : []).map((g) => ({
      name: g.replace(/^[✓⏸]\s*/, '').replace(/\s*\((?:by [^)]+|pending)\)\s*$/, '').trim(),
      status: g.trim().startsWith('✓') ? 'approved' : 'pending',
      by: (g.match(/\(by ([^)]+)\)/) || [])[1] || null,
    }));
    const deliberation = (get('Deliberation') ? get('Deliberation').split(' · ') : []).map((d) => ({
      name: d.replace(/^[✓◆]\s*/, '').replace(/\s*\(\d+Q open\)\s*$/, '').trim(),
      status: d.trim().startsWith('◆') ? 'open' : 'cleared',
      questions: Number((d.match(/\((\d+)Q open\)/) || [])[1] || 0),
    }));

    const stages = [];
    const rowRe = /^\| ([^|]+?) \| ([^|]*?) \| ([\d,]+) \| ([\d,]+) \| ([^|]*?) \|$/gm;
    let m;
    while ((m = rowRe.exec(b)) !== null) {
      const stage = m[1].trim();
      if (stage === 'Stage') continue; // header row
      stages.push({ stage, agent: m[2].trim(), inTok: num(m[3]), outTok: num(m[4]), artifact: m[5].trim() });
    }
    const totM = b.match(/^\| \*\*Total\*\* \| \| \*\*([\d,]+)\*\* \| \*\*([\d,]+)\*\* \|/m);
    const totalIn = totM ? num(totM[1]) : stages.reduce((a, s) => a + s.inTok, 0);
    const totalOut = totM ? num(totM[2]) : stages.reduce((a, s) => a + s.outTok, 0);

    const shipRaw = get('Shippable');
    runs.push({
      date: head[1], slug: head[2].trim(),
      requirement: get('Requirement'), mission: get('Mission'),
      domain: domain || get('Mission'), jurisdiction: jurisdiction || '—',
      coverage: cov ? Number(cov[1]) : null, conflicts: cov ? Number(cov[2]) : 0,
      gates, deliberation, shippable: /^yes/i.test(shipRaw), shippableNote: shipRaw,
      stages, totalIn, totalOut,
    });
  }
  return runs;
}

/** The Context-memory bullets + the rolling LAST-BRIEF. */
export function parseContext(text) {
  const m = text.match(/## Context memory\n([\s\S]*?)\n## (?:Preferences|Learned rules|Run ledger)/);
  const top = m ? m[1].split('<!-- LAST-BRIEF -->')[0] : '';   // facts = the durable bullets above the rolling brief
  const facts = top.split('\n').map((l) => l.replace(/^-\s*/, '').trim()).filter((l) => /^[A-Za-z]/.test(l));
  const lb = text.match(/<!-- LAST-BRIEF -->\s*([\s\S]*?)\s*<!-- \/LAST-BRIEF -->/);
  return { facts, lastBrief: lb ? lb[1].trim() : '' };
}

/** Aggregate stats across all runs. */
export function aggregate(runs) {
  const byMission = {};
  for (const r of runs) {
    const k = r.mission || '—';
    (byMission[k] = byMission[k] || { count: 0, in: 0, out: 0 }).count++;
    byMission[k].in += r.totalIn; byMission[k].out += r.totalOut;
  }
  return {
    total: runs.length,
    shippable: runs.filter((r) => r.shippable).length,
    inDeliberation: runs.filter((r) => r.deliberation.some((d) => d.status === 'open')).length,
    gatesPending: runs.filter((r) => r.gates.some((g) => g.status === 'pending')).length,
    totIn: runs.reduce((a, r) => a + r.totalIn, 0),
    totOut: runs.reduce((a, r) => a + r.totalOut, 0),
    byMission,
  };
}

/** Read the live memory file and return the whole dashboard state. Read-only. */
export function loadState(memPath) {
  const exists = existsSync(memPath);
  const text = exists ? readFileSync(memPath, 'utf8') : '';
  const runs = parseRuns(text);
  const pref = recallPrefs(memPath);
  return {
    memPath, exists,
    generatedAt: new Date().toISOString(),
    runs, stats: aggregate(runs),
    learnedRules: recallRules(memPath),
    preferences: { prefs: pref.prefs, likes: pref.likes, dislikes: pref.dislikes, concepts: pref.concepts, count: pref.count },
    context: parseContext(text),
    // carried-through honesty label — the dashboard renders this verbatim
    tokenNote: 'Estimated (~4 chars/token) — DesignOps cost-governance framing, not billed figures.',
  };
}

/* ── write side — the dashboard's "adjust how it's used" maps onto the SAME human-readable
   memory the CLI uses (single source of truth; still hand-editable + git-friendly). These
   live here (not in the engine) so the core stays byte-stable. ── */

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Whitelisted preference keys the dashboard may set (engine reads these as run defaults). */
export const PREF_KEYS = ['mission', 'jurisdiction', 'tone', 'target', 'strict', 'loop', 'loop-max'];

/** Set a `prefer: key: value` (idempotent — replaces any existing line for that key). */
export function setPref(memPath, key, value) {
  key = String(key).toLowerCase();
  if (!PREF_KEYS.includes(key)) throw new Error('unknown preference key: ' + key);
  unsetPref(memPath, key);
  recordPref(memPath, [{ kind: 'prefer', text: `${key}: ${value}` }]);
}

/** Remove a `prefer: key: …` line. */
export function unsetPref(memPath, key) {
  if (!existsSync(memPath)) return;
  const txt = readFileSync(memPath, 'utf8');
  writeFileSync(memPath, txt.replace(new RegExp('^- prefer: ' + esc(String(key).toLowerCase()) + ':.*$\\n?', 'gim'), ''), 'utf8');
}

/** Add a like/dislike/concept tag (deduped). */
export function addTag(memPath, kind, text) {
  if (!['like', 'dislike', 'concept'].includes(kind)) throw new Error('bad tag kind');
  recordPref(memPath, [{ kind, text: String(text).trim() }]);
}

/** Remove a like/dislike/concept tag. */
export function removeTag(memPath, kind, text) {
  if (!existsSync(memPath)) return;
  const txt = readFileSync(memPath, 'utf8');
  writeFileSync(memPath, txt.replace(new RegExp('^- ' + esc(kind) + ': ' + esc(String(text).trim()) + '\\s*$\\n?', 'gim'), ''), 'utf8');
}

/** Remove a forged learned rule by id (operator disagrees with what it learned). */
export function removeRule(memPath, id) {
  if (!existsSync(memPath)) return false;
  const txt = readFileSync(memPath, 'utf8');
  const next = txt.replace(new RegExp('^- ' + esc(String(id)) + ' ·.*$\\n?', 'gim'), '');
  if (next === txt) return false;
  writeFileSync(memPath, next, 'utf8');
  return true;
}

/** Apply a batch of dashboard ops, then return fresh state. The one write entry point. */
export function applyOps(memPath, ops) {
  for (const op of (ops || [])) {
    if (op.op === 'set-pref') setPref(memPath, op.key, op.value);
    else if (op.op === 'unset-pref') unsetPref(memPath, op.key);
    else if (op.op === 'add-tag') addTag(memPath, op.kind, op.text);
    else if (op.op === 'remove-tag') removeTag(memPath, op.kind, op.text);
    else if (op.op === 'remove-rule') removeRule(memPath, op.id);
    else throw new Error('unknown op: ' + op.op);
  }
  return loadState(memPath);
}
