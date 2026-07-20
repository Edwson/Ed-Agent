# Run Ed Agent inside Claude — pick one

Ed Agent speaks **MCP**, so it drops straight into Claude. Three ways, easiest first.
Once it's in, just talk to Claude normally — *"use ed-agent to review this,"* *"ask ed-agent which skill fits."*

---

## 1 · Claude Desktop — drag and drop *(no terminal, no config)*

The truly hands-only path.

1. Download **`ed-agent.mcpb`** from the [latest release](https://github.com/Edwson/Ed-Agent/releases/latest).
2. Open **Claude Desktop → Settings → Extensions**.
3. **Drag `ed-agent.mcpb` onto the window** (or click *Install extension* and pick the file).
4. Click **Install**. Done — Ed Agent's 15 tools are now available in every chat.

The bundle is self-contained (its dependencies are inside it), so nothing else to install.
Requires Claude Desktop with a Node runtime — every current version ships one.

---

## 2 · Claude Desktop — one config block *(copy-paste)*

If you'd rather not use the extension file. Needs [Node.js 18+](https://nodejs.org).

Open **Settings → Developer → Edit Config**, and add this inside `mcpServers`:

```json
{
  "mcpServers": {
    "ed-agent": {
      "command": "npx",
      "args": ["-y", "github:Edwson/Ed-Agent", "ed-agent-mcp"]
    }
  }
}
```

Save and restart Claude Desktop. `npx` fetches and runs Ed Agent for you — no clone, no build.

---

## 3 · Claude Code — one line

```bash
claude mcp add ed-agent -- npx -y github:Edwson/Ed-Agent ed-agent-mcp
```

Or, if you've cloned the repo, just open it — Claude Code auto-detects the bundled
[`.mcp.json`](./.mcp.json) and offers to enable the `ed-agent` server for that project.

---

## Check it worked

Ask Claude: **"List the ed-agent missions."** You should see the five squads
(code · marketing · contract · regulated-finance · optimize). Then try:

> "Use **ed_agent_route_skills** — which methods fit *launch a product and improve SEO*?"
>
> "Run **ed_agent_deliberate** on this diff — should I trust it?"

## What you get — 15 tools

`ed_agent_run` · `ed_agent_route_skills` *(routes 139 skills to your need)* ·
`ed_agent_deliberate` · `ed_agent_optimize` · `ed_agent_redteam` · `ed_agent_ground` ·
`ed_agent_loop` · `ed_agent_ironcheck` · `ed_agent_learn` · `ed_agent_trust_scan` ·
`ed_agent_quality_scan` · `ed_agent_missions` · `ed_agent_skills` ·
`ed_agent_remember` · `ed_agent_recall`.

Nothing runs automatically — the harness surfaces the decision, you make the call.
No red line is ever bypassed. Zero-dependency core; the MCP layer bundles only the SDK.
