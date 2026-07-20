---
name: Google Jules QA Automation Planner
description: Delegate work to an asynchronous coding agent like Google Jules and get back reviewable PRs — crisp task specs, a plan you approve before it runs, tests as the acceptance gate, and a QA-automation plan that turns edge cases into a standing suite. For developers running async agents and building test coverage.
audience: developer · QA
---

# Google Jules QA Automation Planner

## What this is

A method for getting the most out of an asynchronous coding agent (Google Jules and its kind) that clones your repo into a cloud VM, plans, edits, and opens a pull request while you do something else — and for using that leverage specifically to build QA automation. The value of an async agent is throughput; the risk is that unattended work drifts. This skill is the spec-and-review discipline that keeps the throughput and catches the drift, plus a planner for turning "we should test that" into a suite that actually runs.

## What this is NOT

Not affiliated with Google or Jules and not a claim about a specific version's exact features — confirm current capabilities. Not a way to merge code nobody read. An async agent is more autonomous, not less accountable: every PR it opens is reviewed like a human's before it merges, and tests are the gate.

## Method

1. **Write the task like a spec, not a wish.** One bounded objective, the acceptance criteria, the files/areas in scope, and what it must NOT touch. An async agent runs on the brief you gave it — a vague brief comes back a vague PR.
2. **Approve the plan before it runs.** When the agent proposes a plan, read it — the cheapest place to catch a wrong approach is a paragraph, not a cloud VM's worth of diff. Correct the plan, then let it work.
3. **Parallelize independent tasks.** The async model's superpower is fan-out — dispatch several unrelated, well-scoped tasks at once. Keep them independent so their PRs don't collide; overlapping tasks on the same files are merge conflicts you scheduled.
4. **Tests are the acceptance gate, always.** The returned PR isn't done because it's open — it's done when its tests pass in CI. For QA-planning tasks, the deliverable *is* the tests.
5. **Turn edge cases into a standing suite.** For QA automation: enumerate the failure modes (boundaries, nulls, race conditions, permission edges, offline, i18n, a11y), have the agent write a test per case, and commit them. A caught edge case that isn't a test is a bug waiting to come back.
6. **Prioritize the plan by risk.** Cover the highest-blast-radius paths first (auth, payments, data-loss, irreversible actions), then breadth. A QA plan that tests the easy paths and skips checkout is theatre.
7. **Review the PR as a diff, not a summary.** Read what changed and only what changed; unrelated edits are the tell of a run that wandered. Small, legible commits over one opaque changeset.
8. **Keep it least-privilege and branch-only.** The agent works on a branch with scoped repo access, never on main, never with production credentials — the same GitHub-orchestration rules apply to a robot that opens PRs.

## Quality bar

Each task is a bounded spec with acceptance criteria and an out-of-scope list · the plan is reviewed before the run · independent tasks run in parallel without collisions · tests gate every returned PR · the QA plan covers high-risk paths first and turns each edge case into a committed test · PRs are reviewed as diffs · the agent runs branch-only, least-privilege.

## Guardrails & escalation

An async agent's PR merges only after human review and green CI — autonomy in *doing* is not autonomy in *shipping*. Anything irreversible (migration, deploy, dependency major) is a human decision on the merge. If a returned PR is out of scope or its tests are shallow, send it back rather than merging to "save time" — a merged bad PR costs more than the re-run. Generated code touching auth, payments, or crypto gets a security review regardless of green tests.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the GitHub Repo Orchestration and n8n Test Automation skills, and the CDS agent-confirm / agent-trace entries. Confirm Jules's current capabilities and permissions model against its own documentation.
