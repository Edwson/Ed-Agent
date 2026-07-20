---
name: Slack Ops Automation
description: Wire Slack as the team's operational nervous system with an agent — specific notifications, incident channels that assemble themselves, in-channel approvals with a human gate, and workflows that reduce noise instead of adding to it — so Slack informs the team rather than training them to mute it. For teams automating ops in chat.
audience: ops · developer · team lead
---

# Slack Ops Automation

## What this is

A method for using an agent to make Slack do real operational work — notify, coordinate, and gate — without the thing that kills every ChatOps setup: noise. A channel that pings constantly with vague messages teaches everyone to ignore it, which means the one alert that mattered gets ignored too. This skill is how to automate Slack so each message earns its interruption.

## What this is NOT

Not affiliated with Slack and not a replacement for its docs — APIs, Block Kit, and workflow features change, so verify. Not a licence for a bot to take irreversible actions on a click without a human, or to post as a person. The agent posts, routes, and prompts; a human approves anything that spends, deploys, or changes state.

## Method

1. **Every notification is specific and actionable.** Not "a build failed" but "checkout build #482 failed on `main`, tests `payments/*`, since 09:42 — <log>." A message a reader can't act on is noise wearing an alert's clothes.
2. **Route by severity, not volume.** Critical goes to a channel people watch and can be paged from; informational goes to a low-traffic log channel or a digest. Firehosing everything into one channel is how the critical alert drowns.
3. **Incidents assemble themselves.** On a real incident, the agent spins up a dedicated channel, pulls in the responders, pins the status, and keeps a timestamped log — so the postmortem writes itself and nobody coordinates an outage in DMs.
4. **Approvals happen in-channel, gated.** For actions that need sign-off (deploy, refund, access grant), the agent posts the exact effect with Approve/Deny buttons — and Approve triggers the action only after a human clicks it. The button is the human gate, not a rubber stamp.
5. **Digest the routine, interrupt the exception.** Daily/standup summaries and non-urgent status roll up into a scheduled digest; only exceptions interrupt in real time. Respect the team's attention as a budget.
6. **Bots are identifiable and honest.** The agent posts as a clearly-labelled app, never impersonates a person, and says when a message is automated. A synthetic message dressed as a human teammate is a trust problem.
7. **Least-privilege scopes, secrets safe.** The Slack app requests only the scopes it needs; tokens live in a secret store, never in code or a prompt; webhook URLs are treated as secrets. An over-scoped bot token is an org-wide read grant.
8. **Close the loop back to the system of record.** A decision made in Slack (approved a deploy, resolved an incident) writes back to the tracker/log — chat is where humans coordinate, not where the durable record lives.

## Quality bar

Notifications are specific and actionable · routing matches severity, not volume · incidents get a dedicated channel with a pinned, timestamped log · approvals are in-channel and only fire after a human clicks · routine is digested, exceptions interrupt · the bot is labelled and never impersonates a person · scopes are minimal and tokens are secret · decisions write back to the system of record.

## Guardrails & escalation

No irreversible action (deploy, refund, delete, access change) executes from a Slack interaction without an explicit human approval on the exact effect. The agent never posts as a real person or fabricates a message from one. Sensitive data (customer PII, secrets, credentials) is not posted into channels — a debug dump in a shared channel is a data incident. Alert fatigue is a failure mode to fix, not tolerate: if a channel is being muted, the fix is fewer, better messages, not louder ones.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the CDS agent-confirm entry (human signs the exact payload) and n8n Test Automation (loud, specific alerts). Confirm current Slack API, scopes, and Block Kit behaviour against Slack's own documentation.
