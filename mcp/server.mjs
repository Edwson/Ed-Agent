#!/usr/bin/env node
// mcp/server.mjs — drop Ed Agent into any MCP-capable host (Claude, Cursor, Codex).
// Exposes the army as MCP tools. Optional: needs @modelcontextprotocol/sdk + zod
// (npm install them to enable; the CLI + library stay zero-dependency).
import { readFileSync, existsSync, readdirSync, mkdtempSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { run, prefs } from '../src/orchestrator.mjs';
import { MISSIONS } from '../src/missions/index.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const memoryPath = join(root, 'Ed_agents_Claude.md');

let McpServer, StdioServerTransport, z;
try {
  ({ McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js'));
  ({ StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js'));
  ({ z } = await import('zod'));
} catch {
  console.error('[ed-agent-mcp] needs the MCP SDK. Install it:\n  npm install @modelcontextprotocol/sdk zod\nThe ed-agent CLI and library work without it.');
  process.exit(1);
}

const read = (dir, f) => (existsSync(join(dir, f)) ? readFileSync(join(dir, f), 'utf8') : '');
const text = (t) => ({ content: [{ type: 'text', text: t }] });

export function buildServer() {
  const server = new McpServer({ name: 'ed-agent', version: JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version });

  server.registerTool('ed_agent_missions',
    { title: 'List Ed Agent missions', description: 'List the squads Ed Agent can become (code, marketing, contract, regulated-finance) and what each produces.', inputSchema: {} },
    async () => text(MISSIONS.map((m) => `## ${m.name} (\`${m.id}\`)\nSquad: ${m.squad.map((s) => s.name).join(' · ')}\nBuild: ${m.build}`).join('\n\n')));

  server.registerTool('ed_agent_skills',
    { title: 'List Ed Agent capabilities', description: 'The nine-stage lifecycle and which squad member owns each stage per mission.', inputSchema: {} },
    async () => text(['Stages: intake → context → analyze → research → ledger → plan → produce → review → certify (two human gates: plan-approval, certification sign-off).',
      ...MISSIONS.map((m) => `${m.name}: research=${m.stageOwners.research} · plan=${m.stageOwners.plan} · produce=${m.stageOwners.produce} · review=${m.stageOwners.review} · certify=${m.stageOwners.certify}`)].join('\n')));

  server.registerTool('ed_agent_run',
    {
      title: 'Run Ed Agent on a requirement',
      description: 'Drive one plain-English requirement through the nine-stage lifecycle with the auto-detected (or forced) squad. Returns the certification, the research brief, and the artifact list. Human gates stay pending unless approve/signoff names are supplied.',
      inputSchema: { requirement: z.string().describe('the plain-English requirement'), mission: z.enum(['finance', 'code', 'marketing', 'contract']).optional(), jurisdiction: z.string().optional(), approve: z.string().optional().describe('name that clears the plan/design gate'), signoff: z.string().optional().describe('name that clears the certification gate') },
    },
    async (args) => {
      const out = mkdtempSync(join(tmpdir(), 'ed-agent-'));
      const r = await run(args.requirement, { mission: args.mission, jurisdiction: args.jurisdiction, approve: args.approve, signoff: args.signoff, outDir: out, memoryPath, quiet: true });
      const files = readdirSync(out, { recursive: true }).filter((f) => typeof f === 'string').sort();
      const head = `# Ed Agent · ${r.missionName} squad\nRequirement: ${args.requirement}\nSquad: ${r.squad.join(' · ')}\nResearch coverage: ${r.coveragePct}% · conflicts quarantined: ${r.conflicts}\nGates: ${r.gates.map((g) => g.status === 'approved' ? '✓ ' + g.name : '⏸ ' + g.name).join(' · ')}\nVerdict: ${r.shippable ? 'SHIPPABLE' : 'NOT YET SHIPPABLE — human gate(s) pending (not bypassed)'}\nI/O (est): ${r.totals.totIn} in / ${r.totals.totOut} out\nArtifacts (${files.length}) in: ${out}\n${files.map((f) => '  - ' + f).join('\n')}`;
      return text([head, '\n---\n', read(out, '10-certification.md'), '\n---\n', read(out, '04-research-brief.md')].join('\n'));
    });

  server.registerTool('ed_agent_remember',
    { title: 'Teach Ed Agent a preference', description: 'Persist a preference/like/dislike/concept to Ed Agent\'s memory so it is recalled and applied on later runs (across sessions and hosts).', inputSchema: { kind: z.enum(['concept', 'prefer', 'like', 'dislike']), text: z.string().describe('for "prefer", use "key: value", e.g. "jurisdiction: uk"') } },
    async (args) => { prefs.record(memoryPath, [{ kind: args.kind, text: args.text }]); const p = prefs.recall(memoryPath); return text(`Remembered. Now holding ${p.count} preference(s).`); });

  server.registerTool('ed_agent_recall',
    { title: 'Recall Ed Agent memory', description: 'What Ed Agent currently remembers about your preferences.', inputSchema: {} },
    async () => { const p = prefs.recall(memoryPath); return text(JSON.stringify({ prefs: p.prefs, likes: p.likes, dislikes: p.dislikes, concepts: p.concepts }, null, 2)); });

  return server;
}

// boot over stdio when run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const server = buildServer();
  await server.connect(new StdioServerTransport());
  console.error('[ed-agent-mcp] ready on stdio');
}
