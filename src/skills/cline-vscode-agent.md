---
name: Cline VS Code Agent
description: Get reliable work out of Cline — the autonomous coding agent inside VS Code with Plan and Act modes and MCP support — by using Plan mode as the checkpoint, approving edits deliberately, and wiring MCP tools like the CDS contract so the agent builds to a real system. For developers working in VS Code.
audience: developer
---

# Cline VS Code Agent

## What this is

A working method for Cline — the open-source autonomous coding agent that runs inside VS Code, reads and edits your files, runs terminal commands, and supports MCP servers. Its two-mode design (Plan, then Act) is the feature that makes it safe to use well: think first, then do, with you approving the doing. This skill is how to use that structure instead of clicking "approve" on autopilot.

## What this is NOT

Not affiliated with Cline and not tied to a specific version — confirm current modes and settings against its own docs. Not a reason to stop reading your own code. The agent proposes edits and commands; you approve them, and you own what merges.

## Method

1. **Live in Plan mode first.** Use Plan to have Cline explore the repo and state its approach *before* it changes anything. The plan is where you catch a wrong assumption for the price of a sentence, not a diff.
2. **Approve edits deliberately, not reflexively.** Cline asks before it writes and before it runs commands — that prompt is a checkpoint, not a speed bump. Read the proposed change; a habit of blind "approve" turns a safety feature into a rubber stamp.
3. **Wire MCP to a real contract.** Cline speaks MCP — point it at a design-system contract (the CDS `cds/components.json` + `AGENTS.md`, served by eds-mcp) so it builds token-correct, register-compliant UI instead of improvising. This is the whole "the system is a server an agent can be refused by" thesis, in your editor.
4. **Bound the task.** One objective per session. Cline is happy to keep going; an unbounded session produces a sprawling, unreviewable changeset.
5. **Let the terminal prove it.** Have Cline run the tests and the linter after a change; a green run is the acceptance gate, not "it looks done". Its command approvals are also where you keep destructive commands from slipping through.
6. **Commit in legible steps.** Small commits with real messages, on a branch — so a wrong turn is one `git revert`, not an afternoon of untangling.
7. **Manage context deliberately.** On a big repo, point Cline at the relevant files rather than the whole tree; more context is not more understanding, and a focused task gets a focused diff.

## Quality bar

Plan mode is used before Act on non-trivial work · edit and command approvals are read, not reflexive · MCP is pointed at a real contract when building to a system · each session has one bounded objective · tests and lint pass as the gate · commits are small and legible on a branch · context is scoped to the task.

## Guardrails & escalation

Destructive terminal commands (delete, force-push, drop, deploy) are the human's explicit call at the approval prompt — never a default-yes. Generated code touching auth, payments, or crypto gets a security review; MCP tools that can act on external systems are gated the same way any irreversible action is (CDS agent-confirm). If a session's diff keeps growing past the task, stop and re-scope — Cline accumulates, it doesn't self-converge.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md · MCP server: https://github.com/Edwson/eds-mcp
- Related: CDS agent-confirm / agent-trace entries and the AI & Agents domain. Confirm Cline's current Plan/Act and MCP behaviour against its own documentation.
