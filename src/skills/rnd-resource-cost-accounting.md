---
name: R&D Resource & Operating Cost Accounting
description: Precise cost and resource scheduling for product R&D in two modes — General (5–10 person team) and Advanced (11–50 person scale-up) — covering human-resource cost and ramp-up time, engineering-hour scheduling and tech-debt maintenance ratio, training and transformation cost, and Cloud/DevOps FinOps (API fees, GPU and server rental, third-party SaaS licensing, and build-vs-buy outsourcing). Every figure is a model with stated assumptions, verified against current vendor pricing and local rates. For engineering managers, founders, and finance/ops.
audience: engineering manager · founder · finance/ops
---

# R&D Resource & Operating Cost Accounting

## What this is

A method for scheduling the cost and capacity of a product-engineering effort with enough precision to plan against, in two modes: [General] for a 5–10 person team and [Advanced] for an 11–50 person scale-up where coordination cost, specialisation, and tech debt behave differently. It sizes human-resource cost and recruit/ramp-up time, schedules engineering hours and sets a tech-debt maintenance ratio (for example 80% new build / 20% maintenance), accounts for training and transformation cost, and runs Cloud/DevOps FinOps across API-call fees, GPU and server rental, third-party SaaS licensing, and outsourcing / build-vs-buy. The output is a defensible model, not a single hopeful number.

## What this is NOT

Not audited accounting and not financial advice: every figure is a model or estimate resting on stated assumptions, useful for planning and comparison, not for filing or fundraising representations. Not a source of current prices: labour rates, cloud unit costs, GPU rental, and SaaS licensing must be verified against live vendor pricing and local market rates before the model is trusted — the numbers here are placeholders until confirmed. Not a headcount or compensation decision: those are surfaced with their cost implications and then routed to finance and HR.

## Method

1. **Pick the mode.** Choose [General: 5–10] or [Advanced: 11–50] — coordination overhead, specialisation, and maintenance load differ enough that one model does not fit both.
2. **Size the human-resource cost.** Build fully-loaded cost per role (salary, benefits, overhead), and estimate recruit and ramp-up time so a hire's real availability, not their start date, drives the schedule.
3. **Schedule engineering hours.** Lay out capacity against the roadmap in hours, discounting for meetings, on-call, and context-switching rather than assuming full-time equals full-output.
4. **Set the tech-debt maintenance ratio.** Reserve an explicit split (e.g. 80% new / 20% maintenance) so the plan does not silently borrow against reliability; adjust the ratio up as the system ages.
5. **Account for training and transformation.** Include the cost and lost capacity of upskilling, tooling migrations, and process change — a transformation costed at zero is a transformation that stalls.
6. **Run Cloud/DevOps FinOps.** Estimate API-call fees, GPU/server rental, and third-party SaaS licensing against current vendor pricing, and flag the cost drivers that scale non-linearly with usage.
7. **Decide build vs buy.** For each capability, compare the fully-loaded build cost (including maintenance) against outsourcing or licensing, and state the assumption that tips the decision.
8. **Label and stress-test.** Mark every number estimate or measured, verify rates against live pricing, and run a sensitivity pass on the two or three assumptions that most move the total.

## Quality bar

Mode chosen ([General] or [Advanced]) · human-resource cost fully loaded with ramp-up time · engineering hours scheduled with realistic discounts · tech-debt maintenance ratio reserved explicitly · training and transformation costed · Cloud/DevOps FinOps sized against current vendor pricing · build-vs-buy decided on stated assumptions · every figure labelled estimate vs measured and rate-verified.

## Guardrails & escalation

This is a planning model, not audited accounting and not financial advice. Every figure rests on stated assumptions and is only valid once labour rates, cloud unit costs, GPU rental, and SaaS pricing are verified against current vendor and local-market sources — the model flags what still needs confirming rather than presenting placeholders as fact. Headcount, compensation, and any decision with tax, statutory-reporting, or fundraising implications are routed to finance and HR professionals and counsel. The method sizes and compares cost; it does not approve spend or set pay.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related within this kit: the global go-to-market, EBITDA/P&L review, and enterprise-spend analysis skills. Audited numbers, pay, and statutory reporting are routed to finance and HR; this method models cost and capacity, it does not file or approve it.
