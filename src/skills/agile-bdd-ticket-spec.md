---
name: Agile Epic Breakdown & BDD Tickets
description: Decomposes a PRD into Epic → Story → Sub-tasks, writes Given-When-Then (BDD) acceptance criteria that are actually testable, and estimates relative story points — so the delivery plan is executable and "done" is checkable rather than arguable. For product manager, scrum master, tech lead.
audience: product manager · scrum master · tech lead
---

# Agile Epic Breakdown & BDD Tickets

## What this is

A method for turning a PRD into work a team can pick up. It decomposes the spec into a clean hierarchy — epics that group real outcomes, stories that are shippable vertical slices, and sub-tasks that describe the how — and writes acceptance criteria in Given-When-Then form so each story's definition of done is a test, not a debate. It attaches relative story-point estimates to size the work against the team's own calibration, producing a backlog that is executable rather than aspirational.

## What this is NOT

Not a time estimator. Story points are relative and team-calibrated — they express complexity and uncertainty against the team's own history, not hours, and converting them to a delivery date without the team's velocity is a fiction. Not a mandate: scope, breakdown, and estimates are confirmed with the delivery team that will do the work, never imposed on it. Acceptance criteria are testable and owned by a human; the method drafts the structure, the team calibrates and commits.

## Method

1. **Group epics by outcome.** Structure epics around real user-facing outcomes the PRD is chasing, not around system tables — a stakeholder should recognise each one.
2. **Slice stories vertically.** Break epics into stories that are independently shippable slices of value, small enough to finish in a sprint and large enough to matter.
3. **Write Given-When-Then criteria.** Express each story's definition of done as testable BDD scenarios — the precondition, the action, the expected outcome — so "done" is checkable.
4. **Cover the unhappy paths.** Add scenarios for empty states, errors, permissions, and edge cases; criteria that only describe the happy path pass a broken feature.
5. **Decompose into sub-tasks.** Detail the how as sub-tasks with clear scope and dependencies, so the story is actionable without further archaeology.
6. **Estimate in relative points.** Size stories in story points against the team's own calibration, capturing complexity and uncertainty — never hours dressed as points.
7. **Confirm scope with the team.** Review the breakdown and estimates with the delivery team; adjust to their reality rather than imposing the plan.
8. **Leave open questions visible.** Flag unresolved dependencies and ambiguities on the tickets instead of burying them, so risk surfaces before the sprint, not during it.

## Quality bar

Epics grouped by outcome · stories sliced as shippable vertical value · Given-When-Then criteria testable · unhappy paths covered · sub-tasks scoped with dependencies · estimates in relative points not hours · scope confirmed with the team · open questions left visible.

## Guardrails & escalation

Story-point estimates are relative and team-calibrated — the method does not convert them to hours or dates, and it flags any attempt to treat velocity as a promise. Acceptance criteria are testable and owned by a human; scope and estimates are confirmed with the delivery team, not imposed. Where a story touches regulated behaviour, payments, or personal data, its criteria route to the relevant compliance owner. The method structures and drafts; the team calibrates, commits, and decides.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: pm-product-conflict-prd, jira-project-orchestration, and analytics-event-taxonomy. Confirm scope and estimates with your delivery team and against your instance's workflow.
