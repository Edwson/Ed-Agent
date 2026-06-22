#!/usr/bin/env node
// ed-agent.test.mjs — zero-dependency contract test for v0.2: missions, skills,
// the learning memory, and the gates.
import { run, prefs } from '../src/orchestrator.mjs';
import { detectMission } from '../src/missions/index.mjs';
import { existsSync, readFileSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓ ' + m); else { console.error('  ✗ ' + m); fails++; } };
const tmp = mkdtempSync(join(tmpdir(), 'edagent-'));
const mem = join(tmp, 'Ed_agents_Claude.md');

console.log('mission detection');
ok(detectMission('Build a REST API service with auth').id === 'code', 'engineering req → code squad');
ok(detectMission('Launch an SEO landing page campaign').id === 'marketing', 'growth req → marketing squad');
ok(detectMission('Draft an NDA with a liability cap').id === 'contract', 'legal req → contract squad');
ok(detectMission('KYC onboarding with EDD source of funds').id === 'finance', 'regulated req → finance squad');
ok(detectMission('anything', 'marketing').id === 'marketing', 'explicit --mission overrides detection');

console.log('\nfinance run — 9 artifacts, gates pending, conflict quarantined');
const fin = await run('Build a KYC onboarding step — EDD with source of funds', { outDir: join(tmp, 'fin'), memoryPath: mem, quiet: true });
for (const a of ['01-intake.md', '02-context.md', '03-analysis.md', '04-research-brief.md', '05-ledger-checkpoint.md', '06-plan.md', '07-build/_manifest.md', '08-review.md', '10-certification.md'])
  ok(existsSync(join(tmp, 'fin', a)), 'artifact: ' + a);
ok(fin.mission === 'finance', 'KYC routed to finance');
ok(fin.meter.length === 9 && fin.meter.every((s) => s.outTok > 0), 'meter quantifies 9 stages');
ok(fin.conflicts >= 1, 'EDD source-of-funds conflict quarantined');
ok(fin.gates.length === 2 && fin.gates.every((g) => g.status === 'pending') && fin.shippable === false, 'gates pending → not shippable');

console.log('\nnon-finance squads produce their own artifacts');
const code = await run('Build a backend API with input validation and error handling', { outDir: join(tmp, 'code'), memoryPath: mem, quiet: true });
ok(code.mission === 'code' && code.squad.includes('Architect'), 'code squad assembled');
ok(existsSync(join(tmp, 'code', '07-build', 'test-plan.md')) && existsSync(join(tmp, 'code', '07-build', 'README-draft.md')), 'code produces test plan + README');
const mkt = await run('Launch a landing page campaign with a signup funnel', { outDir: join(tmp, 'mkt'), memoryPath: mem, quiet: true });
ok(mkt.mission === 'marketing' && existsSync(join(tmp, 'mkt', '07-build', 'conversion-model.md')), 'marketing produces a conversion model');
const con = await run('Draft a vendor MSA with liability cap and IP ownership', { outDir: join(tmp, 'con'), memoryPath: mem, quiet: true });
ok(con.mission === 'contract' && existsSync(join(tmp, 'con', '07-build', 'risk-register.md')), 'contract produces a risk register');

console.log('\ngates cleared → shippable');
const ship = await run('Originate a consumer loan', { outDir: join(tmp, 'ship'), memoryPath: mem, approve: 'Ed Chen', signoff: 'Ed Chen', quiet: true });
ok(ship.gates.every((g) => g.status === 'approved') && ship.shippable === true, '--approve + --signoff clears both gates');
ok(ship.jurisdiction === 'uk', 'lending routed to UK');

console.log('\nlearning memory');
prefs.record(mem, [{ kind: 'prefer', text: 'mission: marketing' }, { kind: 'like', text: 'dense tables' }]);
const p = prefs.recall(mem);
ok(p.prefs.mission === 'marketing' && p.likes.includes('dense tables'), 'preferences recorded + recalled');
const applied = await run('Make me something', { outDir: join(tmp, 'pref'), memoryPath: mem, quiet: true });
ok(applied.mission === 'marketing', 'preferred mission applied when none is specified');
ok(applied.prefsApplied.some((x) => x.includes('marketing')), 'run reports the applied preference');

console.log('\nmemory ledger');
const memTxt = readFileSync(mem, 'utf8');
ok((memTxt.match(/^## Run \d{4}-/gm) || []).length === 6, 'six run entries appended');
ok(/\*\*Mission:\*\*/.test(memTxt), 'run entries record the mission');
ok(/## Preferences/.test(memTxt), 'preferences section present');

rmSync(tmp, { recursive: true, force: true });
console.log(fails === 0 ? '\nPASS — squads swap, skills produce, memory learns, gates hold.' : `\nFAIL — ${fails} check(s) failed.`);
process.exit(fails === 0 ? 0 : 1);
