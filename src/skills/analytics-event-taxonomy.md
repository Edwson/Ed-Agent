---
name: Analytics Event Taxonomy & Tracking Matrix
description: Turns a PRD's business goals into an event-tracking specification — event names, triggers, and parameters — plus the funnel and retention tracking logic behind them, all under a consistent naming convention so the data is analysable instead of a pile of inconsistent events. For product manager, data, growth.
audience: product manager · data · growth
---

# Analytics Event Taxonomy & Tracking Matrix

## What this is

A method for designing the measurement before the feature ships. Starting from a PRD's business goals, it defines the events worth tracking — each with a precise name, the trigger that fires it, and the parameters it carries — and the funnel and retention logic those events feed. It enforces one consistent naming convention across the whole matrix, so that six months later the data answers questions instead of raising them, and analysts aren't reverse-engineering what `btn_click_2` was supposed to mean.

## What this is NOT

Not a licence to collect personal data. Event parameters carry no PII — no emails, names, or raw identifiers where a pseudonymous key belongs — and consent-aware collection under GDPR, CCPA, and local law routes to the consent mechanism, not around it. Not a guarantee that the numbers will be right: a tracking plan is only as good as its implementation, so nothing in the matrix is trusted until it has been verified firing correctly in a debug view. It specifies the measurement; humans own consent and implementation.

## Method

1. **Start from the goal, not the click.** Derive the events from the PRD's business goals and the questions the data must answer — track what informs a decision, not everything that moves.
2. **Name to a convention.** Fix one naming scheme (object-action, casing, tense) and apply it to every event, so the taxonomy stays consistent and queryable.
3. **Define trigger and parameters precisely.** For each event, specify exactly when it fires and the parameters it carries, with types and allowed values — ambiguity here becomes dirty data later.
4. **Keep PII out of parameters.** Use pseudonymous keys, never raw personal data in event payloads; route anything sensitive to the proper store under consent.
5. **Build the funnel logic.** Sequence the events into the conversion funnel with clear step definitions, so drop-off is measurable and not an artefact of loose naming.
6. **Design retention tracking.** Define the return and cohort logic — what "active" means and over what window — because the definition is the metric.
7. **Wire consent in.** Make collection consent-aware by design; events respect the user's choice, and the consent state is part of the spec.
8. **Verify in a debug view before trusting.** Confirm each event fires with the right parameters in a live debug view — an unverified tracking plan is a hypothesis, not a measurement.

## Quality bar

Events derived from business goals · one naming convention applied throughout · triggers and parameters precisely typed · no PII in payloads · funnel steps clearly defined · retention and "active" defined explicitly · collection consent-aware · every event verified firing in a debug view.

## Guardrails & escalation

It will not place PII in event parameters, and it designs collection to be consent-aware rather than assuming consent. Privacy obligations under GDPR, CCPA, and local law route to the consent mechanism and, where exposure is real, to counsel. Retention and funnel definitions are stated explicitly and labelled, since a hidden definition changes the number. Nothing in the plan is trusted until verified in a debug view — the taxonomy informs the measurement, humans own consent and implementation.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: google-analytics, backend-data-geo-seo, and pm-product-conflict-prd. Route consent and privacy obligations to your privacy owner and verify events in your analytics debug view.
