---
name: output-token-efficiency
description: Use this skill when a request involves cutting the output-token cost of an AI workflow without losing quality — tightening prompts and system messages, restructuring what the model is asked to emit, and putting cost governance around an agent or pipeline. It produces a measured before/after with the levers pulled and a guardrail so quality is verified, not assumed.
---

# Output-Token Efficiency

> **What this is** — a repeatable, AI-assisted working method for reducing the output-token (and total-token) cost of an AI workflow while holding quality constant, treating token spend as a DesignOps cost-governance problem: measure, cut the waste, and verify nothing regressed.
> **What this is NOT** — **not a promise of a specific percentage.** Savings depend entirely on the workflow, the model, and the baseline; a wasteful pipeline may drop 60–80%, a lean one barely moves. It is also **not a licence to trade correctness for brevity** — every cut is gated by a quality check, and safety-, compliance-, or audit-critical output is never trimmed to save tokens. This is cost engineering, not model training.

## When to use this
- An AI feature or agent pipeline's per-run cost is climbing and someone needs the waste found and cut before scaling.
- A team asks "why is this prompt so expensive?" and wants the token budget itemised by contributor.
- An agent emits verbose, repetitive, or over-formatted output and the useful signal is a fraction of the tokens billed.
- A finance or platform owner wants cost governance — budgets, alerts, and a per-feature token ledger — around an AI workflow.
- On-prem / self-hosted inference makes every token a hardware-throughput question, and throughput needs to go up without a quality drop.

## Operating principle
Measure first, cut second, verify always. Token spend is a governed budget, not an afterthought: you itemise where the tokens go, remove the waste that carries no information, restructure what the model is asked to emit, and prove on a held-out set that quality held. The win is cheaper runs at equal quality — never cheaper runs that quietly got worse.

## Capability 1 — Token-budget audit
**Goal.** Itemise where the tokens actually go so the biggest, safest cuts are obvious — before changing anything.
**Inputs.** Representative prompts/responses, the system message and tool schemas, model and pricing, run volume, current per-run and aggregate cost.
**Method.**
1. **Baseline-measure** input and output tokens per run on a representative sample — never optimise against a guess.
2. Decompose the budget: system prompt, few-shot examples, tool/function schemas, retrieved context, and the model's output — attribute tokens to each.
3. Flag the classic waste: restated instructions, redundant few-shots, verbose schemas, echoed input, over-long boilerplate framing, and formatting the consumer discards.
4. Separate **fixed** cost (per every call — system prompt, schemas) from **variable** (scales with output) — fixed waste multiplies across volume and is usually the fastest win.
5. Rank candidate cuts by tokens saved × call volume × risk, lowest-risk-highest-yield first.
**Output.** A per-contributor token ledger and a ranked cut-list with estimated savings and a risk note each.
**Quality bar.** Every number is measured on a real sample, not estimated; each proposed cut names what is removed and why it carries no quality-bearing information.

## Capability 2 — Prompt & output restructuring
**Goal.** Cut the tokens the model is asked to emit and consume, holding the answer's quality and completeness constant.
**Inputs.** The audit's cut-list, the downstream consumer's actual requirements (what fields/format it truly needs), quality criteria.
**Method.**
1. **Constrain the output contract**: ask for exactly the fields the consumer uses, in the leanest usable format (often compact JSON or a terse schema over prose) — stop the model narrating when the caller only parses.
2. **Compress the instruction layer**: one authoritative statement of each rule; delete restated or contradictory guidance; replace long few-shots with a shorter spec or a single sharp example where it holds quality.
3. **Slim tool/function schemas** to the fields in use; move stable context out of the per-call prompt (system-level, cache, or retrieval) so it isn't re-billed every call.
4. **Right-size the response**: cap length where the task allows, and prefer structured emission the consumer can render, rather than the model pre-formatting.
5. **Guard the exceptions**: mark any reasoning-, compliance-, disclosure-, or audit-critical output as *not to be trimmed* — brevity never overrides a required statement.
**Output.** A revised prompt/system/schema set and an output contract, with a before/after token count per change.
**Quality bar.** Each change shows its token delta and is paired with a quality check; no compliance/audit/disclosure content is shortened; the leaner output still satisfies the real consumer's needs.

## Capability 3 — Cost governance & verification
**Goal.** Institutionalise the savings — budgets, monitoring, and a regression gate — so cost stays down and quality stays proven.
**Inputs.** The optimised workflow, a held-out evaluation set with quality criteria, run volume and budget targets, monitoring surface.
**Method.**
1. **A/B the baseline vs optimised** on the held-out set: measure token cost *and* the quality metrics (accuracy, completeness, task success) side by side — savings only count if quality holds.
2. Set a **per-feature token budget** and alerting on cost-per-run drift and volume spikes, so a regression or a prompt change shows up as a number.
3. Add a **quality regression gate**: an eval that must pass before an optimised prompt ships, so nobody trades correctness for cost silently.
4. Keep a **token ledger** per feature (cost, volume, cost-per-successful-task) as the governance artifact leadership can read.
5. Re-baseline when the model, prompt, or task changes — efficiency is a moving target, not a one-time cut.
**Output.** An A/B result (cost + quality), a per-feature budget with alerts, and a regression-gated eval.
**Quality bar.** Savings are stated against a measured baseline with the quality metric reported alongside; the gate provably blocks quality regressions; cost governance is a standing ledger, not a one-off.

## Worked example (illustrative)
*Illustrative only — plausible but hypothetical figures.* An agent classifies support tickets and emits a paragraph of rationale plus a JSON verdict; the consumer only stores the JSON. The audit shows ~70% of output tokens are the discarded rationale, and the system prompt restates the taxonomy three times. Restructuring: ask for JSON only (rationale optional, off by default), state the taxonomy once, and trim the tool schema to the fields used. The A/B on a held-out set shows a large output-token drop at equal classification accuracy — reported as *measured on this workflow*, not a portable percentage — with a per-feature budget and a regression eval gating future prompt edits. If accuracy had dipped, the cut is reverted, not shipped.

## Guardrails & escalation
- **Never trade correctness, safety, or compliance for tokens:** required disclosures, audit trails, reasoning that a human reviewer depends on, and regulated statements are exempt from trimming — flag them explicitly as protected.
- **Never claim a portable percentage:** report savings as measured on the specific workflow against a stated baseline; "60–80%" is a possible outcome for wasteful pipelines, not a guarantee.
- **Escalate when** cost cuts start touching model choice, fine-tuning, or infrastructure (that's a separate engineering decision), or when the quality metric is contested — the eval and the metric definition need an owner before optimising against them.
- **Always keep the baseline and the eval:** an optimisation without a measured before/after and a quality gate is a guess, not an improvement.

## References & sources
- Provider token-accounting and pricing documentation (input vs output token billing, context/prompt caching) — the ground truth for any budget; verify against current pricing.
- Prompt-caching and system-prompt reuse patterns for cutting fixed per-call cost.
- Structured-output / function-calling and constrained-decoding techniques for lean, parseable emission.
- Standard experimentation practice for the A/B and regression gate — held-out sets, a pre-registered quality metric, no optimising on the test set.
- On-prem / self-hosted inference throughput considerations (batching, quantisation trade-offs) where tokens are a hardware-throughput question. Models and pricing change frequently; re-baseline before relying on any figure.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
