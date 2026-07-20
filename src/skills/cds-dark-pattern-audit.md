---
name: CDS Dark-Pattern Audit
description: Audit a consumer flow against the system's hard rules and the public rulebooks behind them — consent symmetry, honest pricing, click-to-cancel, review integrity, engagement pressure — with findings a regulator would recognise.
audience: designer · product · developer
---

# CDS Dark-Pattern Audit

## What this is

A flow-level audit method for the patterns regulators actually cite: FTC (junk fees, negative option, review suppression), EU DSA Art 25 (deceptive interface design), GDPR Art 7 (consent), COPPA (child-directed flows). The CDS hard rules are the checklist; the anchors are the receipts.

## What this is NOT

Not legal advice, and not a compliance certification. It finds design-level violations and names the rule they resemble; whether exposure exists is a question for counsel.

## When to use

Before launching signup, checkout, subscription, consent, or cancellation flows; when growth proposes an experiment; when acquiring or auditing an existing product.

## Method

1. **Walk the money and the exit first.** Price at first mention vs price at pay (junk fees); steps to subscribe vs steps to cancel (click-to-cancel symmetry); what the trial says vs when it bills.
2. **Walk consent.** Reject vs accept prominence, defaults, withdrawal depth; count the taps both ways.
3. **Walk the pressure.** Countdown timers (real deadline?), scarcity claims (real inventory?), guilt copy, streak threats, notification bait.
4. **Walk the child path** if any audience is child-directed: neutral age screening, no personalised ads, data minimisation.
5. **Report** each finding as: the screen, the pattern, the CDS hard rule id, the public anchor, and the honest alternative from the catalogue (pause option, symmetric consent, all-in price row).

## Quality bar

Every finding reproducible with a screenshot path · every finding paired with a catalogue alternative · zero findings softened for the roadmap's comfort.

## Guardrails & escalation

Findings in live revenue flows escalate to the product owner AND counsel together — a dark pattern discovered is a liability clock already running. This audit never becomes a how-to.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
