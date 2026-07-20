---
name: Jira Project Orchestration
description: Run a project in Jira with an agent as a disciplined PM — epics and stories with real acceptance criteria, honest sprint hygiene, JQL that surfaces risk, and status that reflects reality — so planning artefacts stay true instead of becoming a fiction everyone ignores. For anyone using an agent to manage delivery.
audience: product · project management · developer
---

# Jira Project Orchestration

## What this is

A method for having an agent operate Jira the way a good project manager would: turning intent into well-formed work items, keeping the board honest, and surfacing risk early — without the two failure modes that make trackers useless, namely tickets that don't say what "done" means and statuses that don't match reality. The point of a tracker is a shared, truthful picture of delivery; this skill keeps it that way.

## What this is NOT

Not affiliated with Atlassian and not a replacement for Jira's docs — fields, workflows, and JQL vary by instance, so confirm against yours. Not a licence for an agent to silently change status, reassign work, or close tickets. The agent drafts and organizes; a human owns status transitions that represent commitments and any change to someone else's work.

## Method

1. **Every story has acceptance criteria.** A ticket without a testable definition of done is a conversation waiting to be re-had. Draft stories with clear criteria, a user-facing outcome, and scope — the agent's job is to make "done" checkable, not arguable.
2. **Structure by the user's model, not the database.** Epics group real outcomes; stories are vertical slices a team can ship; sub-tasks are the how. Group by what a stakeholder recognizes, not by which system table changed.
3. **Estimate honestly, size against capacity.** Point or size work against real team availability (PTO, meetings, on-call), not a wish. An over-committed sprint is a plan that was fiction on day one.
4. **JQL surfaces risk, not vanity.** Standing queries for stale tickets, blocked work, tickets with no acceptance criteria, single-assignee risk, and scope creep in the current sprint. A board that only shows "in progress" hides the things that will slip.
5. **Status reflects reality, and a human owns transitions.** The agent can flag "this looks done" or "this looks blocked," but moving a ticket to Done — a claim that a commitment was met — is a human's call. Silent status changes are how a board stops being trusted.
6. **Link work to its evidence.** Tickets link to the PR, the design, the doc, the incident — so the trail from intent to shipped is one click, not an archaeology dig. An unlinked "Done" is unverifiable.
7. **Keep the backlog groomed, not hoarded.** Regularly triage: close the dead, merge the duplicates, sharpen the vague. A 900-item backlog nobody reads is worse than a 90-item one everyone does.
8. **Report the truth to stakeholders.** Status updates state what shipped, what's at risk, and what changed — green/yellow/red honestly, with the reason. A status that's always green is a status nobody believes.

## Quality bar

Every story has testable acceptance criteria · work is structured by user outcomes · estimates are sized against real capacity · standing JQL surfaces stale/blocked/unscoped/at-risk work · status transitions that represent commitments are human-owned · tickets link to their evidence · the backlog is triaged, not hoarded · stakeholder reports are honest about risk.

## Guardrails & escalation

The agent never closes, reassigns, or transitions another person's ticket without their involvement — a tracker is a shared record, and rewriting someone's work silently erodes trust in the whole board. Changes that represent external commitments (dates promised to a customer, scope cut from a contract) escalate to the accountable owner. Personal data in ticket fields follows the same privacy rules as anywhere else — a customer's details pasted into a public ticket is a leak. When the plan and reality diverge, the agent flags it; it does not paper over the gap to keep the board green.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the CDS "landing on a system you didn't build" method and agent-trace entry. Confirm your instance's fields, workflows, and JQL against Atlassian's own documentation.
