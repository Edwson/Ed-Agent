---
name: objectivity-logic-audit
description: Use this skill when a claim, argument, analysis, or piece of copy needs to be checked for objectivity and logical soundness before it ships — separating claim from evidence, naming the inference gaps and fallacies, stress-testing with the strongest counter-argument, and calibrating confidence to what the evidence actually supports.
---

# Objectivity & Logical Rigor

> **What this is** — a repeatable, AI-assisted working method for auditing a claim, argument, or analysis for objectivity and logical soundness: pin each claim to its evidence, expose unstated assumptions and reasoning errors, steelman the other side, and calibrate the conclusion's confidence to the actual support.
> **What this is NOT** — **not a truth oracle and not a substitute for domain expertise or primary data.** It checks the *structure and calibration* of reasoning; it cannot manufacture evidence that isn't there, and a logically clean argument can still be wrong if its premises are false. Where the subject is legal, medical, financial, or safety-critical, the audit organises the reasoning for a qualified expert — it does not replace them.

## When to use this
- A case study, report, or landing page makes claims and someone needs "does the evidence actually support this?" before it publishes.
- A recommendation or strategy memo needs its assumptions and inference gaps surfaced before a decision rides on it.
- Marketing or exec copy risks overclaiming, and each claim needs a source, a hedge, or a cut.
- A contentious or political topic needs an even-handed treatment that represents the strongest version of each side, not a straw man.
- A metric or result is being cited as proof of something, and the causal / statistical leap needs checking.

## Operating principle
Separate what is *claimed* from what is *shown*, and calibrate the gap. Every load-bearing claim gets pinned to its evidence and labelled by strength; every inference gets checked for the leap between premise and conclusion; the strongest counter-argument gets built in good faith, not knocked down as a straw man; and the final confidence is dialled to what the evidence supports — no more, no less. This is the same modelled-vs-measured, source-per-number discipline the rest of this portfolio runs on.

## Capability 1 — Claim–evidence separation
**Goal.** Pull the claims apart from the evidence and grade how well each is actually supported.
**Inputs.** The text/argument under review, any cited sources or data, the audience and the stakes of being wrong.
**Method.**
1. **Extract every load-bearing claim** as a discrete, checkable statement — strip the rhetoric.
2. For each, identify the **evidence offered** and classify it: measured/primary, modelled/estimated, cited-secondary, anecdotal, or **unsupported assertion**.
3. Grade the **claim–evidence fit**: does the evidence support the *scope* of the claim, or a narrower version? Flag every over-reach (e.g., a single study framed as settled fact, a correlation stated as cause).
4. Separate **fact** (verifiable) from **inference** (a conclusion drawn) from **opinion/value judgment** — and label them so they aren't read as equal.
5. List **missing evidence** each claim would need to be fully supported.
**Output.** A claim register: claim, evidence, evidence-type, fit grade, what's missing.
**Quality bar.** Every load-bearing claim is isolated and graded; over-reaches and unsupported assertions are named explicitly; fact, inference, and opinion are distinguished, not blended.

## Capability 2 — Fallacy & assumption audit
**Goal.** Expose the reasoning errors and the unstated premises the argument silently depends on.
**Inputs.** The claim register from Capability 1 and the argument's structure (how claims connect to the conclusion).
**Method.**
1. Map the **argument structure**: premises → inferences → conclusion, so the load-bearing links are visible.
2. Surface **unstated assumptions** — the premises that must be true for the argument to hold but were never argued.
3. Check each inference for **formal and informal fallacies**: correlation-as-causation, survivorship/selection bias, base-rate neglect, affirming the consequent, false dichotomy, hasty generalisation, appeal to authority/novelty, motivated reasoning, and cherry-picking.
4. Check for **objectivity failures specifically**: loaded language, one-sided evidence selection, confirmation bias, and framing that pre-loads the conclusion.
5. Distinguish a **fatal** gap (the conclusion doesn't follow) from a **repairable** one (needs a hedge or more evidence).
**Output.** An assumption-and-fallacy register: each flagged gap, its type, why it matters, and fatal-vs-repairable.
**Quality bar.** Unstated assumptions are made explicit; each fallacy flag names the specific error and where it occurs; severity is graded so the author knows what must be fixed vs softened.

## Capability 3 — Steelman & confidence calibration
**Goal.** Build the strongest opposing case in good faith and recalibrate the conclusion's confidence to what survives it.
**Inputs.** The audited argument and its registers, the best available counter-evidence and alternative explanations.
**Method.**
1. **Steelman the counter-position**: state the strongest, most charitable version of the opposing argument and its best evidence — represent it as its ablest proponent would, not as a straw man.
2. Generate **alternative explanations** for the same evidence (especially rival causes for any claimed causal link).
3. Run a **pre-mortem**: "if this conclusion is wrong, why?" — and check whether the argument already accounts for those failure modes.
4. **Recalibrate confidence**: dial the conclusion's certainty to what survives the steelman and the alternatives — attach an explicit confidence level and the conditions under which it would change.
5. Produce **specific fixes**: for each weak claim, the exact edit — add a source, narrow the scope, hedge the certainty, or cut it.
**Output.** A steelman of the other side, a calibrated conclusion with an explicit confidence level, and a claim-by-claim fix list.
**Quality bar.** The counter-argument is genuinely the strongest version, not a straw man; the final confidence is justified by evidence that survived challenge; every recommended fix is concrete and actionable.

## Worked example (illustrative)
*Illustrative only — hypothetical.* A case study states "the redesign increased conversion 40%." The audit: (1) isolates the claim and grades the evidence — is 40% *measured* (A/B, n, window) or *modelled*? Is it relative or absolute? (2) flags the **correlation-as-causation** risk if other things changed in the same window, and the **unstated assumption** that the redesign was the only variable; (3) steelmans "it was seasonality / a pricing change / a traffic-mix shift," runs the pre-mortem, and recalibrates to a defensible statement: "conversion rose 40% relative over [window]; A/B-attributed on n=… — or, if not isolated, 'associated with' and labelled." The fix list: attach source and n, state relative-vs-absolute, and swap "increased" for "associated with" if causation wasn't isolated. The claim survives — just calibrated to what's shown.

## Guardrails & escalation
- **Structure, not omniscience:** the audit checks whether reasoning holds and is calibrated; it cannot verify empirical facts it has no access to, and a valid argument on false premises is still false — say so rather than bless it.
- **Even-handedness is mandatory on contested topics:** represent each side's strongest case; do not let the audit smuggle in a preferred conclusion. Where the question is genuinely values-based, name it as such instead of dressing a value judgment as a logical result.
- **Escalate to a domain expert** when the premises are legal, medical, financial, statistical, or safety-critical — the audit organises the reasoning and flags the gaps; the qualified expert supplies the ground truth.
- **Calibrate, don't just critique:** the deliverable is a *better-calibrated* claim with concrete fixes, not a pile of objections — the goal is truthful confidence, not universal doubt.

## References & sources
- Standard treatments of **informal and formal logic** (validity, soundness, common fallacies) and **critical-thinking** frameworks (argument mapping, premise–conclusion structure).
- **Cognitive-bias** literature — confirmation bias, base-rate neglect, motivated reasoning, survivorship/selection bias (e.g., Kahneman; Tversky & Kahneman).
- **Bayesian confidence calibration** and the practice of stating explicit confidence levels and updating on evidence.
- **Steelmanning** and the principle of charity as good-faith argument practice.
- Evidence-grading and causal-inference cautions (correlation vs causation, confounders, the need for controlled comparison) consistent with this portfolio's modelled-vs-measured discipline.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
