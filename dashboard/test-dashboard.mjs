#!/usr/bin/env node
// test-dashboard.mjs — zero-dependency test for the control room. Generates a REAL ledger
// (real runs), then asserts the parser, the write mutators, and the live node:http server.
import { run } from '../src/orchestrator.mjs';
import { forge } from '../src/flywheel.mjs';
import { loadState, parseRuns, setPref, unsetPref, addTag, removeTag, removeRule, applyOps } from './data.mjs';
import { start } from './server.mjs';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓ ' + m); else { console.error('  ✗ ' + m); fails++; } };
const tmp = mkdtempSync(join(tmpdir(), 'ed-dash-'));
const mem = join(tmp, 'mem.md');

console.log('generate a real ledger (real runs)');
await run('Build a KYC onboarding step — EDD with source of funds', { intent: 'let compliant clients finish onboarding', approve: 'Ed', signoff: 'Ed', resolve: ['trust: accepted'], outDir: join(tmp, 'o1'), memoryPath: mem, quiet: true });
await run('Launch an SEO landing page for a savings product', { outDir: join(tmp, 'o2'), memoryPath: mem, quiet: true }); // unstated intent → in deliberation
await run('Add a payment retry flow', { mission: 'code', intent: 'cut churn', approve: 'Ed', signoff: 'Ed', resolve: ['trust: ok'], loop: true, outDir: join(tmp, 'o3'), memoryPath: mem, quiet: true });
forge(mem, { node: 'trust', reason: 'violates MiFID II best execution' });

console.log('\nparser');
const s = loadState(mem);
ok(s.runs.length === 3, 'parses three runs (got ' + s.runs.length + ')');
ok(s.stats.shippable === 2 && s.stats.inDeliberation === 1, 'shippable + in-deliberation counts are right');
const fin = s.runs.find((r) => r.mission.startsWith('Regulated'));
ok(fin && fin.gates.length === 2 && fin.gates.every((g) => g.status === 'approved'), 'finance run: two approved gates parsed');
ok(fin && fin.totalIn === fin.stages.reduce((a, x) => a + x.inTok, 0) && fin.totalOut === fin.stages.reduce((a, x) => a + x.outTok, 0), 'token total === sum of stage rows (integrity)');
const loopRun = s.runs.find((r) => r.mission.startsWith('Code'));
ok(loopRun && loopRun.stages.length === 10, '--loop run shows the extra loop stage (10 stages)');
const seo = s.runs.find((r) => r.mission.startsWith('Marketing'));
ok(seo && seo.deliberation.some((d) => d.status === 'open' && d.questions >= 1), 'open FRAME checkpoint parsed with its question count');
ok(s.learnedRules.length === 1 && /MiFID/i.test(s.learnedRules[0].pattern), 'learned rule parsed from the ledger');
ok(Object.keys(s.stats.byMission).length === 3, 'per-mission token breakdown built');
ok(/Estimated/.test(s.tokenNote), 'the est-token honesty label is carried through verbatim');

console.log('\nwrite mutators (the dashboard edits the same memory file)');
setPref(mem, 'target', '6'); setPref(mem, 'target', '4'); // idempotent replace
ok((readFileSync(mem, 'utf8').match(/^- prefer: target:.*$/gm) || []).length === 1, 'setPref replaces (no duplicate lines)');
ok(loadState(mem).preferences.prefs.target === '4', 'setPref value reflected in state');
setPref(mem, 'loop', 'true'); ok(loadState(mem).preferences.prefs.loop === 'true', 'boolean pref set');
unsetPref(mem, 'loop'); ok(loadState(mem).preferences.prefs.loop == null, 'unsetPref removes it');
addTag(mem, 'like', 'dense tables'); ok(loadState(mem).preferences.likes.includes('dense tables'), 'addTag like');
removeTag(mem, 'like', 'dense tables'); ok(!loadState(mem).preferences.likes.includes('dense tables'), 'removeTag like');
ok(removeRule(mem, 'LR-mifid-ii') === true && loadState(mem).learnedRules.length === 0, 'removeRule forgets a learned rule');
let threw = false; try { setPref(mem, 'evil', 'x'); } catch { threw = true; } ok(threw, 'setPref rejects a non-whitelisted key');

console.log('\napplyOps batch + the live node:http server (127.0.0.1 only)');
const after = applyOps(mem, [{ op: 'set-pref', key: 'strict', value: 'true' }, { op: 'add-tag', kind: 'like', text: 'clear gauges' }]);
ok(after.preferences.prefs.strict === 'true' && after.preferences.likes.includes('clear gauges'), 'applyOps batch applied + returns fresh state');

const srv = start({ port: 4399, memPath: mem });
await new Promise((r) => setTimeout(r, 250));
try {
  const page = await (await fetch('http://127.0.0.1:4399/')).text();
  ok(page.length > 4000 && /control room/.test(page) && !/https?:\/\/(?!127|schema\.org|edwson\.com|github\.com)/.test(page.replace(/https:\/\/(schema\.org|edwson\.com|github\.com)[^"']*/g, '')), 'GET / serves the page with zero external requests');
  const st = await (await fetch('http://127.0.0.1:4399/api/state')).json();
  ok(st.runs.length === 3, 'GET /api/state returns the runs');
  const re = await (await fetch('http://127.0.0.1:4399/api/apply', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ops: [{ op: 'set-pref', key: 'tone', value: 'terse' }] }) })).json();
  ok(re.preferences.prefs.tone === 'terse', 'POST /api/apply round-trips through the server');
  ok((await fetch('http://127.0.0.1:4399/api/nope')).status === 404, 'unknown endpoint → 404');
  ok((await fetch('http://127.0.0.1:4399/api/apply', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"ops":[{"op":"set-pref","key":"evil","value":"x"}]}' })).status === 400, 'bad op → 400 (whitelist enforced server-side)');
} finally { srv.close(); }

rmSync(tmp, { recursive: true, force: true });
console.log(fails === 0 ? '\nPASS — the control room parses real runs, edits the memory safely, and serves on localhost only.' : `\nFAIL — ${fails} check(s).`);
process.exit(fails === 0 ? 0 : 1);
