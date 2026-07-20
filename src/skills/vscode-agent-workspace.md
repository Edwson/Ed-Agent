---
name: VS Code Agent Workspace
description: Turn VS Code into an agent cockpit — tasks and launch configs the agent can run, MCP servers wired to real contracts, reviewed diffs, and workspace-scoped trust — so an AI coding agent inside the editor moves fast against a system it can be refused by. For developers running agents in VS Code.
audience: developer
---

# VS Code Agent Workspace

## What this is

A method for setting up VS Code so an AI agent (Copilot, Cline, and the rest) does its best work there: with runnable tasks, real debug configs, MCP servers pointing at actual contracts, and a review-the-diff discipline. VS Code is where most agent-assisted coding actually happens; this skill is how to configure it as a cockpit — leverage in front of you, guardrails around you — rather than an autocomplete box.

## What this is NOT

Not affiliated with Microsoft or any extension and not a replacement for their docs — settings and extension behaviour change, so verify. Not a licence to auto-approve every agent edit or run untrusted workspaces with tasks enabled. The editor gives the agent reach; you keep the review.

## Method

1. **Make the project's actions runnable, not tribal.** `tasks.json` for build/test/lint/typecheck and `launch.json` for debugging, so the agent runs the same commands a human would and their results are the acceptance signal — not "looks right."
2. **Wire MCP to a real contract.** Point the agent's MCP client at a live design-system / API contract (the CDS `components.json` + `AGENTS.md`, served by eds-mcp) so it builds token-correct, register-compliant code instead of improvising. This is the whole "the system is a server an agent can be refused by" thesis, in the editor.
3. **Review every diff before you accept.** Agent edits are proposals; read them in the diff view and accept deliberately. Auto-accept turns a safety feature into a rubber stamp; a habit of blind "keep" is how unrelated files change silently.
4. **Trust the workspace deliberately.** Workspace Trust off for anything you didn't write; tasks and debuggers don't auto-run in untrusted folders. An agent + auto-tasks in a cloned untrusted repo is remote code execution you invited.
5. **Scope the context, not the whole tree.** Point the agent at the relevant files and let it read the conventions first (the "landing on a system you didn't build" method); more context is not more understanding, and a focused task yields a focused diff.
6. **Keep secrets out of settings and prompts.** Secrets live in the environment or a secret store, never in `settings.json`, a `.env` the agent commits, or a prompt. Enable the editor's and repo's secret scanning.
7. **Terminal commands are reviewed, destructive ones gated.** When the agent proposes a terminal command, read it; destructive commands (delete, force-push, deploy, `rm -rf`) are an explicit human call, never a default-yes.
8. **Commit small on a branch.** Legible commits with real messages on a working branch, so any wrong turn is one `git revert` — the same GitHub-orchestration discipline, applied at the keystroke.

## Quality bar

Build/test/lint/debug are runnable tasks/configs · MCP points at a real contract when building to a system · every agent diff is read before accept · Workspace Trust gates tasks in untrusted folders · context is scoped to the task · secrets stay out of settings and prompts · proposed terminal commands are reviewed and destructive ones gated · commits are small on a branch.

## Guardrails & escalation

Destructive terminal commands and anything that deploys or deletes are explicit human decisions at the prompt, never auto-approved. Untrusted workspaces run without tasks/auto-execution until you've read them. Generated code touching auth, payments, or crypto gets a security review; MCP tools that act on external systems are gated like any irreversible action (CDS agent-confirm). If the agent's changeset outgrows the task, stop and re-scope rather than accepting to "finish."

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md · MCP server: https://github.com/Edwson/eds-mcp
- Related: the Cline VS Code Agent and OpenCode Terminal Agent skills, and the AI & Agents domain. Confirm current VS Code settings, Workspace Trust, and extension behaviour against Microsoft's own documentation.
