---
name: Google Analytics (GA4)
description: Set up Google Analytics 4 to answer real product questions instead of collecting vanity metrics — a measurement plan tied to decisions, correct event and conversion modelling, consent-aware and privacy-compliant collection, and honest reading of the data. For founders, growth, and product teams instrumenting a site or app.
audience: founder · growth · product manager · developer
---

# Google Analytics (GA4)

## What this is

A method for making GA4 answer questions worth asking. GA4's event-based model is powerful and easy to misconfigure into a pile of numbers nobody acts on. This skill starts from the decisions the team needs to make, designs the events and conversions that inform them, implements collection that respects consent and privacy law, and reads the result honestly — separating signal from bots, self-traffic, and sampling noise.

## What this is NOT

Not affiliated with or endorsed by Google, and not a substitute for the current GA4 documentation — the interface and APIs change. Not a licence to track people without consent: GDPR, ePrivacy, and CCPA/CPRA obligations come first, and collection that ignores them is a liability, not an asset. Not a vanity-metrics generator — a dashboard of pageviews that changes no decision is a cost, not a measurement. It will not fabricate insight from thin data; where the sample is too small or too polluted to conclude, it says so.

## Method

1. **Start from decisions, not metrics.** Write the questions the team will actually act on (which channel converts, where the funnel drops, what a returning user does). Every event must serve one.
2. **Design the measurement plan.** Map key user actions to GA4 events with a consistent naming convention and parameters; define which events are conversions (key events) before implementing.
3. **Implement collection cleanly.** Via GA4 tags or a tag manager, with a documented dataLayer; verify events fire once, with the right parameters, in DebugView before trusting anything.
4. **Make collection consent-aware.** Integrate Consent Mode / a consent banner so analytics only run with permission; honor opt-outs; avoid ever sending PII into GA. Privacy compliance is part of the setup, not a later patch.
5. **Filter the noise.** Exclude internal/developer traffic and known bots; understand where sampling and thresholding apply so you don't over-read a small segment.
6. **Build reports that map to the questions.** Explorations and a lean dashboard that answer the decision questions — not every dimension GA offers. A report nobody reads is a maintenance cost.
7. **Read honestly.** Attribution is modelled, not truth; correlation isn't cause; a spike with no referrer is usually a bot. State confidence, name limits.
8. **Close the loop.** Tie findings to a change, ship it, and re-measure against the same clean baseline — analytics earns its keep only when it moves a decision.

## Quality bar

The setup starts from decisions the team will act on · events follow a documented plan and naming convention with conversions defined up front · collection is verified in DebugView and is consent-aware and PII-free · internal and bot traffic is filtered · reports map to the decision questions, not to every available dimension · attribution and sampling limits are stated · findings are tied to a change and re-measured.

## Guardrails & escalation

A measurement method, not the product — verify against the current GA4 documentation, which changes. Privacy is non-negotiable: consent, opt-out, data-retention, and regional obligations (GDPR/ePrivacy, CCPA/CPRA) are set up first, and anything touching legal exposure or cross-border transfer is routed to counsel, not improvised. Never send PII into analytics. Where the data is too sparse or polluted to support a claim, say so rather than manufacturing a trend.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: Google Analytics 4 documentation (support.google.com/analytics) — verify against the current product. Related: the SEO & GEO self-audit and statistical-analysis skills; the CDS trust & safety consent components.
