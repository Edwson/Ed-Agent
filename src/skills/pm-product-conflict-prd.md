---
name: Product Conflict Analysis & PRD
description: Compares a new requirement against your existing architecture, past PRDs, prior R&D records, and product goals to surface logic conflicts, feature overlap, API breaking changes, and database-schema compatibility risk — then writes a rigorous PRD with edge cases and a Jira-ticket breakdown. Reduces re-litigation and late-stage surprises by grounding the spec in what already shipped. For product manager, founder, tech lead.
audience: product manager · founder · tech lead
---

# Product Conflict Analysis & PRD

## What this is

A method for pressure-testing a new requirement before it becomes a spec: read the historical project templates, past PRDs, prior R&D records, and stated product goals, then map the requirement onto the existing system to find where it collides — duplicated features, logic that contradicts an earlier decision, an API contract it would break, or a schema change that migrates badly. The output is a PRD that names those conflicts, covers the edge cases, and decomposes into Jira tickets a team can actually pick up.

## What this is NOT

Not a substitute for engineering review. The analysis is only as complete as the artifacts it is given — undocumented decisions, tribal knowledge, and conversations that never made it into a ticket are invisible to it, and it says so rather than guessing. Breaking-change and data-migration calls are hypotheses to validate with the engineers who own that surface, not verdicts. It informs the decision; humans who can see the whole system decide.

## Method

1. **Anchor to the goal.** Restate the requirement as a user-facing outcome and the product goal it serves, so conflict-hunting stays about intent, not implementation trivia.
2. **Read the record first.** Pull the relevant past PRDs, project templates, and R&D notes; extract the constraints and prior decisions the requirement will touch, and flag where the record is thin.
3. **Map onto the architecture.** Trace the requirement through modules, services, and data — where does it read, write, or change behaviour, and what already lives there.
4. **Hunt the four conflict classes.** Feature overlap, contradicted logic, API breaking change, and schema-compatibility risk — name each concrete collision with the artifact that evidences it, and mark inferred risks as inferred.
5. **Surface the edge cases.** Empty states, concurrency, permission boundaries, migration of existing rows, and failure paths — the cases that turn a clean happy path into a production incident.
6. **Validate the hard calls with engineering.** Take breaking-change and migration hypotheses to the surface owners for confirmation before they enter the PRD as decisions.
7. **Write the PRD.** Problem, goals and non-goals, requirements, the named conflicts and their resolutions, edge cases, acceptance criteria, and open questions — testable and unambiguous.
8. **Decompose into tickets.** Break the PRD into Jira epics, stories, and sub-tasks with clear scope and dependencies, so the plan is executable, not aspirational.

## Quality bar

Requirement framed as an outcome · record read and gaps flagged · requirement mapped onto real architecture · four conflict classes named with evidence · edge cases surfaced · breaking-change and migration calls validated with engineering · PRD testable with open questions listed · tickets scoped with dependencies.

## Guardrails & escalation

It will not present inferences from incomplete artifacts as certainties, and it states plainly when a decision is invisible because it was never written down. Breaking-change, data-migration, and rollback calls are validated with the engineers who own the affected surface before shipping. Requirements touching personal data, payments, or regulated behaviour route to the relevant compliance or legal owner — the spec informs, accountable humans decide. Estimates and risk levels are labelled as estimates, not commitments.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the "landing on a system you didn't build" method, agile-bdd-ticket-spec, and product-logic-adversarial-review. Confirm architecture and migration calls against your own engineering team and system of record.
