#!/usr/bin/env node
// ed-agent.test.mjs — zero-dependency contract test for v0.2: missions, skills,
// the learning memory, and the gates.
import { run, prefs } from '../src/orchestrator.mjs';
import { detectMission } from '../src/missions/index.mjs';
import { aiToneScan, blindScore, verdict } from '../src/skills/quality.mjs';
import { captureIntent } from '../src/skills/trust.mjs';
import { auditArtifact } from '../src/deliberate.mjs';
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
ok(detectMission('Review and optimize this case study copy').id === 'optimize', 'review req → optimize squad');
ok(detectMission('優化這段文案並去AI化').id === 'optimize', 'Chinese optimize req → optimize squad');
ok(detectMission('anything', 'marketing').id === 'marketing', 'explicit --mission overrides detection');

console.log('\nquality disciplines (pure)');
const aiy = 'In conclusion, our world-class platform will seamlessly leverage cutting-edge synergy. 總之，這個方案能賦能企業。';
ok(aiToneScan(aiy).reduce((a, h) => a + h.count, 0) >= 5, 'aiToneScan flags EN + 中文 filler');
const sBad = blindScore(aiy), sGood = blindScore('The redesign cut KYC drop-off from 73% to 45% (GA4, n=12,847), saving each analyst 1.5 days per screen.');
ok(sBad.dims.length === 5 && sBad.overall < 60 && verdict(sBad).label === 'REWORK', 'weak content → REWORK with 5 scored dims');
ok(sGood.overall >= 70 && verdict(sGood).label === 'PASS', 'quantified content → PASS');

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
ok(readFileSync(join(tmp, 'code', '08-review.md'), 'utf8').includes('Quality discipline'), 'quality discipline folded into a skill mission review');

console.log('\noptimize squad — diagnose, debate (eds-mcp-quantified), de-AI, 3-part output');
const opt = await run('In conclusion, our world-class KYC onboarding will seamlessly leverage cutting-edge tech to improve the experience and unlock value under ASIC rules in Australia.', { outDir: join(tmp, 'opt'), memoryPath: mem, quiet: true });
ok(opt.mission === 'optimize' && opt.squad.some((s) => /Reviewer B/.test(s)), 'optimize squad assembled');
ok(opt.conflicts >= 5 && opt.shippable === false, 'AI-tone tells flagged · gates pending (not bypassed)');
ok(existsSync(join(tmp, 'opt', '09-final-output.md')) && readFileSync(join(tmp, 'opt', '09-final-output.md'), 'utf8').includes('【專家診斷回饋】'), 'optimize writes the three-part output');
ok(/KycStepper/.test(readFileSync(join(tmp, 'opt', '06-plan.md'), 'utf8')), 'Data officer quantifies the regulated surface against eds-mcp');

console.log('\ngates + deliberation cleared → shippable');
const ship = await run('Originate a consumer loan', { outDir: join(tmp, 'ship'), memoryPath: mem, approve: 'Ed Chen', signoff: 'Ed Chen', intent: 'approve creditworthy borrowers fast without over-lending', done: 'approval rate and default rate both tracked', not: 'no predatory APR; no auto-approve without an affordability check', resolve: ['trust: reviewed and accepted'], quiet: true });
ok(ship.gates.every((g) => g.status === 'approved') && ship.shippable === true, '--approve + --signoff + intent + resolve → gates AND checkpoints cleared → shippable');
ok(ship.checkpoints.every((c) => c.status === 'cleared'), 'both deliberation checkpoints cleared');
ok(ship.jurisdiction === 'uk', 'lending routed to UK');

console.log('\ndeliberation — surface the question, never bypass it');
const dmem = join(tmp, 'delib-mem.md');
const noIntent = await run('Build a payment retry flow', { outDir: join(tmp, 'di'), memoryPath: dmem, approve: 'Ed', signoff: 'Ed', quiet: true });
ok(noIntent.inDeliberation === true && noIntent.openQuestions.length >= 3, 'unstated intent → FRAME checkpoint opens with questions');
ok(noIntent.checkpoints[0].status === 'open' && noIntent.shippable === false, 'an open checkpoint blocks shippable even with both gates approved');
const framed = await run('Build a payment retry flow', { outDir: join(tmp, 'df'), memoryPath: dmem, approve: 'Ed', signoff: 'Ed', intent: 'cut failed-payment churn', not: 'no auto-charge without consent', resolve: ['trust: accepted'], quiet: true });
ok(framed.inDeliberation === false && framed.shippable === true, 'stated intent + resolved trust → deliberation closed → shippable');

console.log('\nstandalone audit + trust assessors (point at an artifact / diff)');
const audit = auditArtifact('# Handler\nRobust enterprise-grade production-ready retry. Migrate the payments schema and deploy to prod.\ntry { go() } catch (e) {}\n// TODO\nMay generally work.', { intent: 'cut failed-payment churn', not: 'do not change the payments schema' });
ok(audit.status === 'NEEDS DELIBERATION' && audit.coherence.localOptima.length >= 1, 'audit flags the non-goal local optimum (technically right, business-wrong)');
ok(audit.trust.level === 'LOW' && audit.substance.verdict === 'CEREMONY', 'audit: LOW trust + CEREMONY substance on over-defensive code');
ok(captureIntent('x', {}).stated === false && !!captureIntent('x', {}).risk, 'intent capture flags unstated intent as the #1 risk');
ok(captureIntent('x', { intent: 'goal' }).stated === true, 'intent capture records a stated goal');

console.log('\nlearning memory');
prefs.record(mem, [{ kind: 'prefer', text: 'mission: marketing' }, { kind: 'like', text: 'dense tables' }]);
const p = prefs.recall(mem);
ok(p.prefs.mission === 'marketing' && p.likes.includes('dense tables'), 'preferences recorded + recalled');
const applied = await run('Make me something', { outDir: join(tmp, 'pref'), memoryPath: mem, quiet: true });
ok(applied.mission === 'marketing', 'preferred mission applied when none is specified');
ok(applied.prefsApplied.some((x) => x.includes('marketing')), 'run reports the applied preference');

console.log('\nmemory ledger');
const memTxt = readFileSync(mem, 'utf8');
ok((memTxt.match(/^## Run \d{4}-/gm) || []).length === 7, 'seven run entries appended');
ok(/\*\*Mission:\*\*/.test(memTxt), 'run entries record the mission');
ok(/## Preferences/.test(memTxt), 'preferences section present');

rmSync(tmp, { recursive: true, force: true });
console.log(fails === 0 ? '\nPASS — squads swap, skills produce, memory learns, gates hold.' : `\nFAIL — ${fails} check(s) failed.`);
process.exit(fails === 0 ? 0 : 1);
