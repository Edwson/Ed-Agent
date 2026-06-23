#!/usr/bin/env node
// test-mcp.mjs — boots the real MCP server over stdio with a real SDK client and
// exercises the tools end-to-end. Needs @modelcontextprotocol/sdk + zod installed.
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

let Client, StdioClientTransport;
try {
  ({ Client } = await import('@modelcontextprotocol/sdk/client/index.js'));
  ({ StdioClientTransport } = await import('@modelcontextprotocol/sdk/client/stdio.js'));
} catch {
  console.error('test:mcp needs the SDK — npm install @modelcontextprotocol/sdk zod'); process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓ ' + m); else { console.error('  ✗ ' + m); fails++; } };
const txt = (r) => (r.content || []).map((c) => c.text || '').join('\n');

const client = new Client({ name: 'ed-agent-test', version: '0.0.0' });
const transport = new StdioClientTransport({ command: 'node', args: [join(here, 'server.mjs')] });
await client.connect(transport);

const tools = (await client.listTools()).tools.map((t) => t.name);
ok(['ed_agent_missions', 'ed_agent_skills', 'ed_agent_run', 'ed_agent_optimize', 'ed_agent_quality_scan', 'ed_agent_deliberate', 'ed_agent_trust_scan', 'ed_agent_remember', 'ed_agent_recall'].every((t) => tools.includes(t)), '9 tools registered (got ' + tools.length + ')');

const missions = txt(await client.callTool({ name: 'ed_agent_missions', arguments: {} }));
ok(/finance/.test(missions) && /code/.test(missions) && /marketing/.test(missions) && /contract/.test(missions) && /optimize/.test(missions), 'ed_agent_missions lists all five squads');

const runCode = txt(await client.callTool({ name: 'ed_agent_run', arguments: { requirement: 'Build a REST API with auth and rate limiting', mission: 'code' } }));
ok(/Code .* squad/.test(runCode) && /Architect/.test(runCode), 'ed_agent_run routes to the code squad');
ok(/NOT YET SHIPPABLE/.test(runCode), 'ed_agent_run leaves gates pending by default (not bypassed)');
ok(/10 · Certification/.test(runCode) && /Trust & global coherence/.test(runCode), 'ed_agent_run returns certification + the trust checkpoint');

const runNoIntent = txt(await client.callTool({ name: 'ed_agent_run', arguments: { requirement: 'KYC onboarding with EDD source of funds', approve: 'Ed Chen', signoff: 'Ed Chen' } }));
ok(/IN DELIBERATION/.test(runNoIntent) && /business GOAL/.test(runNoIntent), 'ed_agent_run with no intent stops IN DELIBERATION and asks for the goal (not bypassed)');

const runFin = txt(await client.callTool({ name: 'ed_agent_run', arguments: { requirement: 'KYC onboarding with EDD source of funds', intent: 'let compliant clients finish onboarding', nonGoals: 'no dark patterns', approve: 'Ed Chen', signoff: 'Ed Chen', resolve: ['trust: accepted'] } }));
ok(/SHIPPABLE/.test(runFin) && !/NOT YET/.test(runFin), 'ed_agent_run with intent + resolve + gates is shippable');

const delib = txt(await client.callTool({ name: 'ed_agent_deliberate', arguments: { artifact: 'Robust enterprise-grade retry. Migrate the payments schema and deploy to prod.\ntry {} catch (e) {}\n// TODO', intent: 'cut failed-payment churn', nonGoals: 'do not change the payments schema' } }));
ok(/Trust:/.test(delib) && /local optimum/.test(delib) && /Open questions/.test(delib), 'ed_agent_deliberate audits an artifact, flags the local optimum + open questions');

const tscan = txt(await client.callTool({ name: 'ed_agent_trust_scan', arguments: { text: 'This robust production-ready code always fully handles all cases. Deploy to prod and migrate the schema.' } }));
ok(/Trust: (LOW|MEDIUM)/.test(tscan) && /Substance:/.test(tscan), 'ed_agent_trust_scan returns trust level + substance');

const opt = txt(await client.callTool({ name: 'ed_agent_optimize', arguments: { content: 'In conclusion, our world-class KYC onboarding will seamlessly leverage cutting-edge tech to improve value under ASIC rules in Australia.' } }));
ok(/總導師/.test(opt) && /【專家診斷回饋】/.test(opt), 'ed_agent_optimize returns the 5-agent three-part output');
ok(/NOT YET SHIPPABLE/.test(opt), 'ed_agent_optimize leaves gates pending by default (not bypassed)');

const qs = txt(await client.callTool({ name: 'ed_agent_quality_scan', arguments: { text: 'In conclusion, our world-class seamless platform will leverage synergy to improve things.' } }));
ok(/REWORK|PASS/.test(qs) && /Overall:/.test(qs), 'ed_agent_quality_scan returns a blind score + verdict');

await client.callTool({ name: 'ed_agent_remember', arguments: { kind: 'prefer', text: 'tone: terse' } });
const recall = txt(await client.callTool({ name: 'ed_agent_recall', arguments: {} }));
ok(/terse/.test(recall), 'ed_agent_remember → ed_agent_recall round-trips a preference');

await client.close();
console.log(fails === 0 ? '\nPASS — the live MCP server speaks the protocol; Ed Agent drops into any MCP host.' : `\nFAIL — ${fails} check(s).`);
process.exit(fails === 0 ? 0 : 1);
