<p align="center">
  <a href="img/ed_agent_Intro.mp4"><img src="img/ed_agent.png" width="160" alt="Ed Agent"></a>
</p>

<h1 align="center">Ed Agent</h1>

<p align="center">
  <b>A mission-swappable one-person development army.</b><br>
  ▶ <a href="img/ed_agent_Intro.mp4">Watch the 30-second intro</a> · MIT · zero-dependency core
</p>

Give it one plain-English requirement and it drives the whole lifecycle through **nine
human-gated stages** — with a **squad that swaps to the kind of work**, a **memory that learns
your preferences**, real artifacts at every stage, and a quantified `Ed_agents_Claude.md`
ledger. Drop it into any bot via **MCP** or the **`AGENTS.md`** brief. The core is
zero-dependency (Node 18+).

> _Click the mascot above to watch the intro._

> **Honest by construction.** The squad ingests, analyses, researches, produces and reviews.
> **Judgment and the two gates stay human** — the harness *records* a gate, it never bypasses
> one. Velocity, not autonomy.

```bash
node bin/ed-agent.mjs "Build a REST API for user onboarding with rate limiting"   # → code squad
node bin/ed-agent.mjs "Launch a landing page for a new savings product"           # → marketing squad
node bin/ed-agent.mjs "Draft an NDA with a 12-month liability cap"                # → contract squad
node bin/ed-agent.mjs "KYC onboarding with EDD source of funds"                   # → finance squad (eds-mcp)
```

## The squad swaps to the mission

The mission is auto-detected from the requirement (override with `--mission`):

| Mission | Squad | Produces |
|---|---|---|
| **Code** | Architect · Security · QA · Doc engineer | architecture · security review (STRIDE) · test plan · README |
| **Marketing** | Creative Director · Conversion Analyst · Consumer Psychologist · SEO | creative brief · conversion model · SEO plan · copy outline |
| **Contract** | Senior Lawyer · Risk-Control Officer · Negotiator · Semantic-Logic reviewer | clause map · risk register · negotiation positions · ambiguity review |
| **Finance** *(default)* | Planning · Regulation · Data · Development · QA · Risk & Governance | eds-mcp compliant build — scaffolded HTML/CSS/JS + conformance tests |

Browse committed runs in **[`examples/`](./examples/)** — one per mission.

## The nine stages

`intake → context → analyze → research → ledger → plan → produce → review → certify`

The middle five swap their content per mission; the spine is universal. The **Research**
stage gathers evidence, **cross-compares sources**, **compresses each claim to its
load-bearing clause**, and **quarantines unverified claims** (it never presents one as fact).
The **Plan** and **Certify** stages each hold a **human gate** — a run stays *"not yet
shippable"* until a named approver clears it.

## It learns you

Ed Agent remembers your preferences in `Ed_agents_Claude.md` and applies them on later runs
(and across hosts):

```bash
node bin/ed-agent.mjs --prefer "mission: marketing"     # default squad when none is given
node bin/ed-agent.mjs --prefer "jurisdiction: uk"
node bin/ed-agent.mjs --remember "we ship a savings product for Gen-Z in the UK"
node bin/ed-agent.mjs --like "dense data tables"  --dislike "emoji in headings"
```

It records likes, dislikes, preferences and concepts; recalls them at the **Context** stage;
and applies the preferred mission / jurisdiction automatically.

## Drop it into any bot

**MCP (Claude · Cursor · Codex):**

```jsonc
{ "mcpServers": { "ed-agent": { "command": "npx", "args": ["-y", "github:Edwson/Ed-Agent", "ed-agent-mcp"] } } }
```

Tools: `ed_agent_run · ed_agent_missions · ed_agent_skills · ed_agent_remember ·
ed_agent_recall`. Enable with `npm install @modelcontextprotocol/sdk zod` (optional — the CLI
and library are zero-dependency).

**Any other LLM (Hermes, …):** paste the operating contract from **[`AGENTS.md`](./AGENTS.md)**
into the system prompt — the host then *behaves* as Ed Agent.

## Different from eds-mcp

[**eds-mcp**](https://github.com/Edwson/eds-mcp) is the **design-system engine** (it scaffolds
compliant finance UI). **Ed Agent** is the **special-ops orchestrator** that runs the whole
lifecycle across *any* domain — and calls eds-mcp only for the finance mission's build. The
build engine resolves from `--eds <path>`, `ED_AGENT_EDS_MCP`, or a sibling `../eds-mcp`; if
absent, the finance build runs in honest contract-only mode and every other mission is
unaffected.

## Tests

```bash
npm test        # zero-dependency contract test: missions, skills, memory, gates
npm run test:mcp  # live MCP-protocol test (needs the optional SDK)
```

## License

MIT © Ed Chen — [edwson.com](https://www.edwson.com)
