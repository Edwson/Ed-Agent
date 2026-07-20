---
name: mathematical-modeling
description: Use this skill when a real problem needs to be turned into a quantitative model and analysed rigorously — stating assumptions and choosing a deterministic or stochastic form, solving and calibrating it honestly to data, and then validating it with sensitivity analysis, uncertainty quantification, and out-of-sample checks so a model's outputs are read as a simplification, not as truth.
---

# Mathematical Model Analysis

> **What this is** — a repeatable, AI-assisted working method for building and analysing a quantitative model with discipline: translate the real problem into variables, relationships, and *explicit* assumptions; solve and calibrate it with the appropriate analytic or numeric method; then validate, run sensitivity, and quantify uncertainty so the outputs come with their own error bars and caveats.
> **What this is NOT** — **not a crystal ball and not a guarantee of prediction.** Garbage in, garbage out: a model is only as good as its assumptions and data, and a well-fit model can still be wrong. Assumptions must be documented; validation and sensitivity are mandatory, not optional. Safety-critical, financial-risk, or regulated models route to qualified quants/engineers and formal model-risk governance — this organises the modelling for them, it does not replace them.

## When to use this
- A messy real-world question ("how many, how fast, how likely, how much") needs to become a defensible quantitative model rather than a guess.
- An existing model or spreadsheet is being trusted for a decision and someone needs "are the assumptions and the fit actually sound?"
- A forecast, projection, or optimisation result is being cited, and its sensitivity to inputs and its uncertainty need to be made explicit.
- A choice between a simple deterministic model and a stochastic/simulation approach needs to be reasoned, not defaulted.
- A result rides on calibration to data, and the fit needs to be checked for overfitting and out-of-sample behaviour.

## Operating principle
A model is a deliberate simplification of reality, and its value comes from stating *what was simplified away*. Every assumption is written down and owned; the mathematical form is matched to the problem's structure and stakes; calibration is honest about the data it fit and the data it did not; and no output ships without sensitivity analysis and an uncertainty range. "All models are wrong, some are useful" (Box) is the operating stance — the deliverable is a useful model with its limits made legible, held to the same modelled-vs-measured discipline as the rest of this portfolio.

## Capability 1 — Formulation & assumptions
**Goal.** Translate the real problem into variables, relationships, and explicitly stated assumptions, and choose the right model form.
**Inputs.** The problem and the decision it feeds, available data, known constraints, the required accuracy and the cost of being wrong.
**Method.**
1. **State the question the model must answer** and the decision that depends on it — scope the model to that, not to everything.
2. Identify **variables** (inputs, outputs, parameters) and the **relationships** between them; write the governing equations or logic.
3. Make **every assumption explicit** — linearity, independence, stationarity, boundary conditions, what is held constant — and label each as justified, approximate, or convenient.
4. Choose **deterministic vs stochastic**: deterministic where relationships are well-known and noise is minor; stochastic/probabilistic where randomness, uncertainty, or rare events drive the outcome.
5. Set the **simplest form that answers the question** and note what it deliberately omits.
**Output.** A model specification: variables, equations/logic, an explicit assumption register, and the deterministic-vs-stochastic choice with its rationale.
**Quality bar.** Every load-bearing assumption is written down and owned; the model form is justified against the problem's structure; the specification is the simplest that answers the actual question.

## Capability 2 — Solve & calibrate
**Goal.** Solve the model with the appropriate analytic or numeric method and fit it to data honestly.
**Inputs.** The model specification, the data to calibrate against, computational tools, and the accuracy target.
**Method.**
1. Pick the **solution method** to fit the form: closed-form/analytic where available; **regression** for empirical relationships; **optimisation** for best-fit or decision variables; **Monte Carlo** for stochastic outcomes; **differential/difference equations** for dynamics over time.
2. **Calibrate parameters to data**, and record which data were used, the fitting criterion (least-squares, likelihood, etc.), and the goodness-of-fit.
3. Guard against **overfitting**: hold out data, prefer parsimony, and check that complexity is earned by out-of-sample gain, not in-sample fit.
4. **Verify the numerics**: convergence, step-size/discretisation error, random-seed stability, and units/dimensional consistency.
5. Distinguish **calibrated** parameters (fit to data) from **assumed** ones (set by judgment) so their reliability is not blended.
**Output.** A solved, calibrated model with the method stated, fit quality reported, and a clear split between fitted and assumed parameters.
**Quality bar.** The solution method matches the model form; calibration names its data and criterion; overfitting is actively checked; numerical error is bounded, not ignored.

## Capability 3 — Validate, sensitivity & uncertainty
**Goal.** Test whether the model is trustworthy, how sensitive it is to inputs, and how much uncertainty its outputs carry.
**Inputs.** The calibrated model, held-out or new data, plausible input ranges, and the model-risk stakes.
**Method.**
1. **Validate out-of-sample**: test against data the model did not fit (backtesting, hold-out, cross-validation); compare predictions to reality and record where it breaks.
2. Run **sensitivity analysis**: vary each input across its plausible range and identify which inputs actually drive the output (and which do not).
3. **Quantify uncertainty**: propagate input uncertainty to output ranges/confidence intervals (analytically or by Monte Carlo); report the output *with* its error bars, never as a point.
4. Apply **model-risk framing**: state the model's domain of validity, its known failure modes, and where extrapolation is unsafe.
5. Produce **honest caveats**: what the model can and cannot support, and the conditions under which its conclusions would change.
**Output.** A validation report: out-of-sample performance, a sensitivity ranking of inputs, output uncertainty ranges, and a model-risk statement with domain-of-validity and failure modes.
**Quality bar.** No output ships as a bare point estimate; sensitivity and uncertainty are always reported; the model's limits and failure modes are stated as plainly as its results.

## Worked example (illustrative)
*Illustrative only — hypothetical.* A team wants to project support-ticket volume to size a team. (1) **Formulation** — variables (arrivals/day, growth rate, seasonality), an explicit assumption register (arrivals ~ Poisson, growth constant over the window), and a choice: stochastic, because rare spikes drive staffing pain. (2) **Solve & calibrate** — fit the rate to twelve months of data by maximum likelihood, hold out the last month, run a Monte Carlo of daily arrivals; flag that "growth constant" is an *assumed*, not calibrated, parameter. (3) **Validate & uncertainty** — backtest against the held-out month, run sensitivity (output is far more sensitive to growth-rate than to seasonality), and report "P50 ≈ X/day, P90 ≈ Y/day" with a stated domain of validity ("breaks if a product launch shifts the mix"). The deliverable is a range with its assumptions and failure modes attached — not a single confident number.

## Guardrails & escalation
- **A model is a simplification, not truth:** report outputs with assumptions, sensitivity, and uncertainty attached; a point estimate with no error bar is a red flag, not a result.
- **Garbage in, garbage out:** the model cannot be more reliable than its data and assumptions — surface both plainly rather than letting the math lend false authority.
- **Validation and sensitivity are mandatory:** never present a calibrated model without out-of-sample checks and a sensitivity/uncertainty pass; in-sample fit alone proves nothing.
- **Escalate to qualified quants/engineers and formal model-risk governance** when the model is safety-critical, financial-risk-bearing, or regulated (e.g., a pricing, capital, or risk model under SR 11-7) — this organises and documents the modelling; the qualified expert and the governance process own the sign-off.

## References & sources
- **Modelling methodology** — the deterministic-vs-stochastic choice, model formulation, and the discipline of explicit assumptions.
- **Monte Carlo** simulation for stochastic outcomes and uncertainty propagation.
- **Regression and optimisation** for empirical fitting and best-fit/decision variables; goodness-of-fit and overfitting cautions (hold-out, cross-validation, parsimony).
- **Numerical methods** — differential/difference equations, convergence, discretisation error, and dimensional consistency.
- **Sensitivity analysis and uncertainty quantification** — input-driver ranking and output confidence intervals.
- **Model risk management** — validation, domain-of-validity, and governance frameworks (e.g., the Fed/OCC's SR 11-7 for financial models).
- The **"all models are wrong, some are useful"** principle (Box) as the operating stance on model humility.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
