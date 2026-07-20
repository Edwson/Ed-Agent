---
name: growth-marketing
description: Use this skill when a product's funnel needs diagnosing, an A/B test needs designing honestly, or acquisition channels need an ROI comparison. It produces a structured analysis with clear metrics, guardrails, and an honest read-out.
---

# Growth Marketing

> **What this is** — a repeatable, AI-assisted working method for funnel diagnosis, experiment design, and channel-ROI analysis, producing a rigorous, well-structured result quickly.
> **What this is NOT** — not a guarantee of growth; results depend on product, market, and execution. Respect advertising-platform policies and privacy law (GDPR/CCPA, tracking consent) and avoid deceptive tactics. Treat outputs as drafts to validate before they ship.

## When to use this
- A funnel is leaking and you need to find the biggest drop-off and its likely cause.
- A change is proposed and you need to design an A/B test that will actually answer the question.
- Acquisition spend is spread across channels and you need to compare their true return.
- Retention looks weak and you need cohort and retention-curve analysis to confirm and localise it.
- A team is drawing conclusions from an underpowered or peeked-at experiment and needs an honest read.

## Operating principle
Instrument the funnel end to end, then fix the largest verifiable drop-off rather than the loudest anecdote. Experiments earn their conclusions only when the metric, power, and stopping rule are set before data is collected. AI accelerates event mapping, calculation, and drafting; human judgement owns the causal story, the guardrails, and the honest interpretation.

## Capability 1 — Funnel diagnosis
**Goal.** Map the funnel, instrument it, and locate the largest drop-off and its likely cause.
**Inputs.** The user journey, available event/analytics data, cohort definitions, and the business goal.
**Method.**
1. Map the funnel across the AARRR stages — acquisition, activation, retention, referral, revenue — as it actually exists for this product.
2. Confirm the events are instrumented and defined consistently; note any stage that is unmeasured or ambiguous.
3. Compute stage-to-stage conversion and identify the largest absolute drop-off, not just the largest percentage.
4. Segment the drop-off by cohort, source, device, and new-versus-returning to see who is falling out and where.
5. Plot retention curves to distinguish an activation problem from a retention problem.
6. Form a small set of ranked, testable hypotheses for the biggest leak, each tied to evidence.
**Output.** A funnel map with conversion rates, the priority drop-off, supporting segmentation and retention curves, and ranked hypotheses.
**Quality bar.** Every stage is defined and measured or flagged as unmeasured; the priority is justified by magnitude and evidence, not intuition.

## Capability 2 — A/B test design
**Goal.** Design an experiment that can answer the question, with the metric and stopping rule fixed before launch.
**Inputs.** The hypothesis, the primary metric, candidate guardrail metrics, traffic volume, and baseline rates.
**Method.**
1. State the hypothesis and the single primary metric it moves; name the guardrail metrics that must not degrade.
2. Set the minimum detectable effect (MDE) that would be worth acting on, and the acceptable false-positive and false-negative rates.
3. Compute the required sample size and expected duration from baseline rate, MDE, and power; if traffic can't reach it, say so.
4. Define randomisation and the unit of assignment, and check segments won't be confounded by the split.
5. Fix the stopping rule and analysis plan in advance; avoid peeking at running results and inflating false positives.
6. Plan the read-out: report the effect with its confidence interval, guardrails, and whether the pre-set bar was met — including null results.
**Output.** An experiment spec: hypothesis, primary and guardrail metrics, MDE, sample size and duration, randomisation plan, and stopping rule.
**Quality bar.** The test is adequately powered for its MDE or explicitly labelled underpowered; the stopping rule is fixed before launch; the read-out plan reports nulls honestly.

## Capability 3 — Acquisition-channel ROI analysis
**Goal.** Compare channels on true economic return and produce a prioritisation scorecard.
**Inputs.** Spend and conversions by channel, revenue and margin data, and the attribution setup.
**Method.**
1. Compute CAC per channel from fully-loaded spend and attributed acquisitions.
2. Estimate LTV per cohort or channel from retention and revenue, and derive the LTV:CAC ratio.
3. Calculate CAC payback period — how long until a customer repays acquisition cost.
4. State the attribution model in use (last-click, multi-touch) and its caveats; treat single-touch numbers as directional.
5. Where possible, validate incremental effect with a holdout or geo test rather than trusting attribution alone.
6. Rank channels on a scorecard combining LTV:CAC, payback, volume, and confidence, and recommend where to scale, hold, or cut.
**Output.** A channel scorecard with CAC, LTV, LTV:CAC, payback, attribution caveats, and a scale/hold/cut recommendation.
**Quality bar.** Attribution limitations are stated, not hidden; recommendations distinguish measured incrementality from attributed credit.

## Worked example (illustrative)
*Illustrative only.* A SaaS product has strong sign-ups but weak revenue. The funnel map shows the largest absolute drop-off is activation — sign-up to first meaningful action — concentrated in one paid channel's cohort. The hypothesis is that the onboarding first-step is unclear for that cohort. An A/B test is designed with activation rate as the primary metric and sign-up completion as a guardrail; baseline and a worthwhile MDE give a required sample of a fixed size and a two-week run, with the stopping rule set in advance so no one calls it early on a lucky day. Separately, channel analysis shows that channel has a high CAC and a long payback despite good volume — last-click attribution flatters it, and a small holdout is planned to test its true incrementality before scaling spend.

## Guardrails & escalation
- Validate before acting: don't ship a decision from an underpowered test, a peeked-at result, or an unmeasured funnel stage.
- Never ship a conclusion built on p-hacking, moved goalposts, or attribution presented as causation; null and negative results must be reported.
- Flag uncertainty explicitly: state confidence intervals, attribution caveats, and where data is missing rather than rounding them away.
- Escalate for legal/privacy review anything touching tracking consent, personal data, or platform policy before it goes live.

## References & standards
- AARRR / "pirate metrics" funnel framework (acquisition, activation, retention, referral, revenue).
- Statistical power, minimum detectable effect (MDE), and sample-size calculation; fixed stopping rules to avoid inflated false positives.
- LTV:CAC ratio and CAC payback period as unit-economics benchmarks.
- Attribution-model limitations (last-click vs multi-touch) and incrementality / holdout testing.
- Privacy and consent requirements (GDPR, CCPA) and advertising-platform policies for tracking.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
