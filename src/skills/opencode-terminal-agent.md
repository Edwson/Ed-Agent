---
name: OpenCode Terminal Agent
description: Drive an open-source, provider-agnostic terminal coding agent well — scoped tasks, plan-before-edit, reviewed diffs, and tests as the acceptance gate — so an autonomous coder speeds you up without quietly rewriting things you didn't ask it to. For developers pairing with a terminal AI agent.
audience: developer
---

# OpenCode Terminal Agent

## What this is

A working method for OpenCode — an open-source, terminal-based AI coding agent that reads your repo, plans, edits files, and runs commands, with your choice of model provider. Terminal agents are fast and dangerous in the same way: they can touch the whole tree. This skill is the discipline that keeps their speed while keeping you in control of what actually changes.

## What this is NOT

Not affiliated with OpenCode and not tied to a specific version's commands — confirm the current model against its own docs. Not a replacement for understanding your own codebase, and not permission to merge code you didn't read. The agent writes; you are still the one who ships.

## Method

1. **Scope the task, not the repo.** One clear, bounded objective per run ("add validation to the signup form", not "improve the app"). An unbounded agent produces an unbounded diff nobody wants to review.
2. **Plan before it edits.** Have the agent state its plan — files it will touch, the approach — before it writes. A wrong plan caught in one paragraph is cheaper than a wrong diff caught across twelve files.
3. **Read every diff.** The agent's output is a proposal. Review it as you would a colleague's PR: does it do what you asked, and *only* that? Silent changes to unrelated files are the tell of a run that went sideways.
4. **Tests are the acceptance gate.** The change isn't done because it looks done — it's done when the tests pass. Have the agent run them; a green suite is checkable, "it looks right" is arguable.
5. **Commit in small, legible steps.** One logical change per commit with a message that says why. A single giant "AI did stuff" commit is unrevertable and unreviewable.
6. **Keep secrets and prod out of reach.** The agent runs with least privilege — no production credentials, no ability to deploy, in a working branch not `main`. Secrets live in the environment, never in a prompt or a committed file.
7. **Onboard it like a new hire.** On an unfamiliar repo, have it read the history and conventions first (the CDS "landing on a system you didn't build" method) so its edits match the project's unwritten rules instead of imposing generic ones.

## Quality bar

Each run has one bounded objective · the agent plans before it edits · every diff is read before it's kept · tests pass as the acceptance gate · commits are small and legible · the agent runs least-privilege on a branch, never on prod · secrets stay in the environment.

## Guardrails & escalation

Anything irreversible — force-push, dependency upgrade with breaking changes, schema migration, deploy — is a human decision, not the agent's. Generated code that touches auth, payments, or crypto goes through a security review before merge; patterns are not guarantees. If the agent loops or its diff keeps growing past the task, stop it and re-scope rather than letting it "finish" — a runaway agent doesn't converge, it accumulates.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: CDS agent-confirm / agent-trace entries and the "landing on a system you didn't build" method. Confirm OpenCode's current commands and provider setup against its own documentation.
