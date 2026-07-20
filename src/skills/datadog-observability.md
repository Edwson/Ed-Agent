---
name: Datadog Observability
description: Get the full value out of Datadog — a coherent observability system across metrics, logs, traces, and monitors, with SLOs, dashboards, and alerting that a person or an agent can operate and manage on the team's behalf, while keeping cost and PII under control. For teams running production systems who want observability that answers questions instead of generating noise.
audience: SRE · backend developer · platform engineer · founder
---

# Datadog Observability

## What this is

A method for using Datadog fully and running it well. Datadog can watch everything — metrics, logs, APM traces, RUM, synthetics, monitors, SLOs — and that breadth is exactly how teams end up with noisy alerts and a shocking bill. This organises it into a coherent system: instrument what maps to user experience and reliability, define SLOs and burn-rate alerts, build dashboards that answer real questions, and set alerting that pages on signal and digests the rest. It's structured so a person or an agent can manage it on the team's behalf — with cost governance and PII protection as first-class rules, not afterthoughts.

## What this is NOT

Not affiliated with or endorsed by Datadog, and not a substitute for the current Datadog documentation, which changes. Not "instrument everything and turn on every integration" — that's how observability becomes unaffordable and unreadable; part of the method is deciding what *not* to collect. Not a licence for an agent to make destructive or billing-impacting changes unattended: deleting monitors, changing alert routing, or enabling high-cost features are human-gated. Not a place for secrets or PII — logs and traces are a data surface with real exposure, and leaking a token or personal data into telemetry is an incident.

## Method

1. **Instrument what matters.** Start from the user experience and the service's reliability: the golden signals (latency, traffic, errors, saturation), key business events, and the traces that explain them — not every metric a library can emit.
2. **Unify metrics, logs, and traces.** Correlate them (trace IDs in logs, service tags everywhere) so an investigation moves from symptom to cause in one place instead of three tabs.
3. **Define SLOs and alert on burn rate.** Service-level objectives with error budgets, and monitors that page on fast burn — alerting tied to user impact, not to every threshold blip.
4. **Build dashboards that answer questions.** A service dashboard per system and an exec/overview that answers "is it healthy," with consistent tags and template variables — dashboards nobody reads are cost, not insight.
5. **Tame alert fatigue.** Page only on actionable, user-impacting conditions; route the rest to digests; set clear ownership and runbooks on every monitor so an alert means "do this," not "look at this."
6. **Govern cost deliberately.** Control custom-metric cardinality, log indexing and retention, and per-feature spend; watch the bill as a signal — a cardinality explosion is both a cost bug and a design smell.
7. **Protect data.** Scrub PII and secrets from logs and traps at ingestion, apply retention and access controls, and treat telemetry as regulated where it carries personal data.
8. **Enable managed operation with guardrails.** A person or agent can create dashboards, tune monitors, and triage — but destructive changes (deleting monitors, changing alert routing/escalation) and billing-impacting toggles are reviewed and human-gated, with API keys scoped least-privilege.

## Quality bar

Instrumentation maps to user experience and reliability (golden signals, key events) rather than everything · metrics, logs, and traces are correlated by consistent tags and trace IDs · SLOs with error budgets drive burn-rate alerting · dashboards answer specific questions with consistent tags · alerts page only on actionable user impact and carry ownership and runbooks · cost is governed (cardinality, log retention, per-feature spend) · PII and secrets are scrubbed and telemetry access is controlled · managed operation is allowed but destructive and billing changes are human-gated with least-privilege keys.

## Guardrails & escalation

A working method, not the documentation — verify features and pricing against current Datadog. Cost and data protection are non-negotiable: watch spend as a signal, and never let PII or secrets into telemetry. An agent may manage configuration and triage on the team's behalf, but deleting monitors, changing alert routing or escalation, and enabling high-cost features are human-gated, never unattended; API keys are scoped least-privilege. Where telemetry carries regulated or personal data, retention and access obligations apply and are routed to the right owner.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: Datadog documentation (docs.datadoghq.com) — verify features and pricing against the current product. Related: the AWS cloud-architect, Cloudflare edge-platform, and Databricks lakehouse skills.
