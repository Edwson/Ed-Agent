---
name: Trello Project Flow
description: Turn a Trello board into a project system that actually moves work — a board and list structure that models the real workflow, cards with clear ownership and acceptance criteria, WIP discipline, and automation that removes busywork without hiding status. For small teams and solo builders running product delivery on Trello.
audience: founder · product manager · small team lead
---

# Trello Project Flow

## What this is

A method for making Trello a delivery system rather than a wall of sticky notes. Trello's simplicity is its strength and its trap: without a deliberate structure, boards rot into stale cards nobody trusts. This skill designs lists that model the real workflow, writes cards with ownership and a definition of done, keeps work-in-progress honest, and uses Trello's automation (Butler) to cut manual upkeep — so the board tells the truth about where things stand.

## What this is NOT

Not affiliated with or endorsed by Atlassian / Trello, and not a substitute for the current Trello documentation. Not a claim that Trello scales to everything — for heavy dependency tracking, sprints, and reporting, a purpose-built tool (Jira, Linear) may fit better, and this method will say so. Not automation for its own sake: a board with clever Butler rules and no owners is still theatre. It won't invent status; a card is done when its acceptance criteria are met, not when it's dragged to a column.

## Method

1. **Model the real workflow in lists.** Map the columns to how work actually flows (e.g. Backlog → Ready → In Progress → Review → Done), not to an idealised process nobody follows. One board per coherent workstream.
2. **Make every card a unit of work.** A clear title, an owner (member), a due date where real, and a checklist that is the definition of done — so "done" is checkable, not arguable.
3. **Use labels and a single priority signal.** Labels for type/area; one clear way to mark priority. Resist a rainbow of labels that means nothing at a glance.
4. **Keep WIP honest.** Limit how much sits In Progress; a board where everything is "in progress" is a board that has stopped reporting status.
5. **Automate the busywork with Butler.** Auto-move on checklist completion, due-date reminders, and templated card creation — remove manual upkeep, but never let automation fake progress.
6. **Run a regular triage.** A short recurring pass to close stale cards, unblock the stuck, and pull the next Ready work — the board only stays trustworthy if someone tends it.
7. **Surface blockers loudly.** A blocked card is flagged and owned, not silently parked; blockers are the highest-value thing a board can reveal.
8. **Know when to graduate.** When dependencies, estimation, and reporting outgrow Trello, say so and plan the move rather than bolting on power-ups forever.

## Quality bar

Lists model the real workflow, not an aspirational one · every card has an owner and a checkable definition of done · one clear priority signal, not a label rainbow · WIP is limited so the board reports true status · Butler automates upkeep without faking progress · a recurring triage keeps cards fresh · blockers are flagged and owned · the method names when Trello has been outgrown.

## Guardrails & escalation

A working method, not official documentation — verify features (Butler limits, power-ups) against current Trello. Automation must never manufacture status a human hasn't earned. Where the work has genuinely outgrown Trello's model (cross-team dependencies, sprint reporting, capacity planning), recommend the right tool rather than forcing the board to do what it can't. Ownership and definition-of-done are the load-bearing parts; a beautiful board without them is decoration.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: Trello documentation (support.atlassian.com/trello) — verify against the current product. Related: the Jira project orchestration and Confluence knowledge-base skills.
