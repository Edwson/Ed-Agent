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
ok(['ed_agent_missions', 'ed_agent_skills', 'ed_agent_run', 'ed_agent_remember', 'ed_agent_recall'].every((t) => tools.includes(t)), '5 tools registered (got ' + tools.length + ')');

const missions = txt(await client.callTool({ name: 'ed_agent_missions', arguments: {} }));
ok(/finance/.test(missions) && /code/.test(missions) && /marketing/.test(missions) && /contract/.test(missions), 'ed_agent_missions lists all four squads');

const runCode = txt(await client.callTool({ name: 'ed_agent_run', arguments: { requirement: 'Build a REST API with auth and rate limiting', mission: 'code' } }));
ok(/Code .* squad/.test(runCode) && /Architect/.test(runCode), 'ed_agent_run routes to the code squad');
ok(/NOT YET SHIPPABLE/.test(runCode), 'ed_agent_run leaves gates pending by default (not bypassed)');
ok(/10 · Certification/.test(runCode) && /04 · /.test(runCode), 'ed_agent_run returns certification + research brief');

const runFin = txt(await client.callTool({ name: 'ed_agent_run', arguments: { requirement: 'KYC onboarding with EDD source of funds', approve: 'Ed Chen', signoff: 'Ed Chen' } }));
ok(/SHIPPABLE/.test(runFin) && !/NOT YET/.test(runFin), 'ed_agent_run with approve+signoff is shippable');

await client.callTool({ name: 'ed_agent_remember', arguments: { kind: 'prefer', text: 'tone: terse' } });
const recall = txt(await client.callTool({ name: 'ed_agent_recall', arguments: {} }));
ok(/terse/.test(recall), 'ed_agent_remember → ed_agent_recall round-trips a preference');

await client.close();
console.log(fails === 0 ? '\nPASS — the live MCP server speaks the protocol; Ed Agent drops into any MCP host.' : `\nFAIL — ${fails} check(s).`);
process.exit(fails === 0 ? 0 : 1);
