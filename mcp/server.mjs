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
import { aiToneScan, blindScore, quantifyGaps, verdict } from '../src/skills/quality.mjs';
import { trustScore, substanceScan } from '../src/skills/trust.mjs';
import { auditArtifact } from '../src/deliberate.mjs';

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
      'Two deliberation checkpoints: FRAME (after analyze — is the intent captured, or is the agent guessing the project?) and TRUST & global coherence (after review — should you trust it · does the local optimum serve the global goal · substance vs over-defensive ceremony?). A run stays IN DELIBERATION, not shippable, until the open questions are resolved.',
      ...MISSIONS.map((m) => `${m.name}: research=${m.stageOwners.research} · plan=${m.stageOwners.plan} · produce=${m.stageOwners.produce} · review=${m.stageOwners.review} · certify=${m.stageOwners.certify}`)].join('\n')));

  server.registerTool('ed_agent_run',
    {
      title: 'Run Ed Agent on a requirement',
      description: 'Drive one plain-English requirement through the nine-stage lifecycle with the auto-detected (or forced) squad. Returns the certification, the research brief, the deliberation checkpoints, and the artifact list. The run stops at two deliberation checkpoints (FRAME, TRUST) and stays IN DELIBERATION until you answer the open questions — supply intent/done/nonGoals up front and resolve[] to clear them. Human gates stay pending unless approve/signoff names are supplied. The host loop: run → read the open questions → discuss with the human → run again with the answers in resolve[].',
      inputSchema: { requirement: z.string().describe('the plain-English requirement'), mission: z.enum(['finance', 'code', 'marketing', 'contract', 'optimize']).optional(), jurisdiction: z.string().optional(), intent: z.string().optional().describe('the business goal (the outcome, not the task) — clears the FRAME checkpoint'), done: z.string().optional().describe('what "done" means in business terms'), nonGoals: z.string().optional().describe('out of scope, ;-separated'), resolve: z.array(z.string()).optional().describe('answers to open checkpoints, each "frame: ..." or "trust: ..."'), approve: z.string().optional().describe('name that clears the plan/design gate'), signoff: z.string().optional().describe('name that clears the certification gate') },
    },
    async (args) => {
      const out = mkdtempSync(join(tmpdir(), 'ed-agent-'));
      const r = await run(args.requirement, { mission: args.mission, jurisdiction: args.jurisdiction, intent: args.intent, done: args.done, nonGoals: args.nonGoals, resolve: args.resolve, approve: args.approve, signoff: args.signoff, outDir: out, memoryPath, quiet: true });
      const files = readdirSync(out, { recursive: true }).filter((f) => typeof f === 'string').sort();
      const delib = r.checkpoints.map((cp) => cp.status === 'open' ? `◆ ${cp.name} (${cp.questions.length}Q)` : `✓ ${cp.name}`).join(' · ');
      const qs = r.openQuestions.length ? `\n\nIN DELIBERATION — answer these with the human, then run again with resolve[]:\n${r.openQuestions.map((q, i) => `  ${i + 1}. [${q.node}] ${q.question}`).join('\n')}` : '';
      const head = `# Ed Agent · ${r.missionName} squad\nRequirement: ${args.requirement}\nSquad: ${r.squad.join(' · ')}\nTrust: ${r.trust.level} (${r.trust.score}/100) · Substance: ${r.substance.verdict}\nGates: ${r.gates.map((g) => g.status === 'approved' ? '✓ ' + g.name : '⏸ ' + g.name).join(' · ')}\nDeliberation: ${delib}\nVerdict: ${r.shippable ? 'SHIPPABLE — gates + deliberation cleared' : 'NOT YET SHIPPABLE — ' + (r.openQuestions.length ? 'in deliberation (not bypassed)' : 'human gate(s) pending')}\nI/O (est): ${r.totals.totIn} in / ${r.totals.totOut} out\nArtifacts (${files.length}) in: ${out}${qs}`;
      return text([head, '\n---\n', read(out, '10-certification.md'), '\n---\n', read(out, 'c2-trust-checkpoint.md')].join('\n'));
    });

  server.registerTool('ed_agent_optimize',
    {
      title: 'Optimize / review any content (總導師 squad)',
      description: 'Run the five-agent review SOP on existing content (a deck, case study, landing page, clause): blind-score diagnostic → adversarial debate → de-AI humanize → optimized version, in the three-part output format (專家診斷回饋 / 優化後的最終版本 / 商業價值評估). Bans AI-tone filler, quantifies or flags every claim, gives no blind praise. If the content is a regulated-finance surface, the Data officer quantifies it against the eds-mcp engine. Human gates stay pending unless approve/signoff are supplied.',
      inputSchema: { content: z.string().describe('the content to optimize — paste it, or a thing to critique'), jurisdiction: z.string().optional(), approve: z.string().optional(), signoff: z.string().optional() },
    },
    async (args) => {
      const out = mkdtempSync(join(tmpdir(), 'ed-agent-opt-'));
      const r = await run(args.content, { mission: 'optimize', jurisdiction: args.jurisdiction, approve: args.approve, signoff: args.signoff, outDir: out, memoryPath, quiet: true });
      const head = `# Ed Agent · 總導師 (optimize) squad\nSquad: ${r.squad.join(' · ')}\nBlind diagnostic: ${r.conflicts} AI-tone tell(s) flagged\nGates: ${r.gates.map((g) => g.status === 'approved' ? '✓ ' + g.name : '⏸ ' + g.name).join(' · ')}\nVerdict: ${r.shippable ? 'SHIPPABLE' : 'NOT YET SHIPPABLE — human gate(s) pending (not bypassed)'}\nArtifacts in: ${out}`;
      return text([head, '\n---\n', read(out, '09-final-output.md'), '\n---\n', read(out, '04-research-brief.md')].join('\n'));
    });

  server.registerTool('ed_agent_quality_scan',
    {
      title: 'Quality scan — the house rules, no lifecycle',
      description: 'Fast, deterministic quality pass on any text: flags AI-tone filler, finds claims missing a number, blind-scores five dimensions, and returns a no-blind-praise verdict (PASS / REWORK). The same disciplines every Ed Agent mission folds into its review.',
      inputSchema: { text: z.string().describe('the text to scan') },
    },
    async (args) => {
      const scan = aiToneScan(args.text), gaps = quantifyGaps(args.text), score = blindScore(args.text), v = verdict(score);
      const md = `# Quality scan\n\n**Verdict:** ${v.line}\n\n## Blind score\n${score.dims.map((d) => `- ${d.dim}: ${d.score}`).join('\n')}\n- **Overall: ${score.overall}/100**\n\n## AI-tone tells\n${scan.length ? scan.map((h) => `- \`${h.term}\` ×${h.count}`).join('\n') : '- none'}\n\n## Claims missing a number\n${gaps.length ? gaps.map((g) => `- "${g.sentence}"`).join('\n') : '- none'}\n`;
      return text(md);
    });

  server.registerTool('ed_agent_deliberate',
    {
      title: 'Deliberation audit — "should I trust this?"',
      description: 'Point Ed Agent at an existing artifact (code, a diff/PR, a design, a doc) and get the trust assessment WITHOUT building anything: trust level (should you trust it, not "is it correct"), global coherence (does the local optimum still serve the stated goal — flags non-goal violations and orphan decisions), a substance scan (substance vs plausible-nonsense / over-defensive ceremony), and the open questions only a human can answer. Supply intent/done/nonGoals so it can check global alignment. This is the host-loop entry point for review: read the questions, discuss them with the human, then proceed.',
      inputSchema: { artifact: z.string().describe('the code / diff / design / doc to audit'), requirement: z.string().optional(), intent: z.string().optional().describe('the business goal — enables the global-coherence check'), done: z.string().optional(), nonGoals: z.string().optional().describe('out of scope, ;-separated'), provenance: z.enum(['derived', 'inferred']).optional(), verified: z.boolean().optional() },
    },
    async (args) => {
      const a = auditArtifact(args.artifact, { requirement: args.requirement, intent: args.intent, done: args.done, not: args.nonGoals, provenance: args.provenance, verified: args.verified });
      return text(a.md);
    });

  server.registerTool('ed_agent_trust_scan',
    {
      title: 'Trust scan — fast, no lifecycle',
      description: 'A fast deterministic trust + substance pass on any text/code: trust level with the factors that move it (provenance, verification, blast radius, confidence-vs-evidence gap) and a substance scan that flags plausible-nonsense / over-defensive ceremony. A quick "should I look closer?" gate.',
      inputSchema: { text: z.string().describe('the text or code to scan') },
    },
    async (args) => {
      const t = trustScore({ text: args.text }), s = substanceScan(args.text);
      const md = `# Trust scan\n\n**Trust: ${t.level} (${t.score}/100)**\n${t.factors.map((f) => `- ${f.state === 'ok' ? '✓' : f.state === 'risk' ? '✗' : '·'} ${f.name}: ${f.note}`).join('\n')}\n${t.raise.length ? `\n_To raise:_ ${t.raise.slice(0, 4).join(' · ')}\n` : ''}\n**Substance: ${s.verdict} (${s.substanceScore}/100)**\n${s.flags.length ? s.flags.map((f) => `- ⚠ ${f}`).join('\n') : '- no ceremony flags'}\n`;
      return text(md);
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
