---
name: ai-production-engineering
description: Use this skill when a request involves putting AI models into production — deploying and serving open-weight or hosted models, cutting inference cost, stabilising data pipelines, or adding reliability and safety backstops. It produces an architecture-and-operations first pass grounded in real builds.
---

# AI Production Engineering

> **What this is** — a repeatable, AI-assisted working method for taking a request in AI production engineering and producing a rigorous, well-structured first pass quickly: model deployment and serving, inference-cost reduction with stable data pipelines, and reliability/safety backstops. The method is drawn from real builds — a human-gated agent harness (Ed Agent), a design-system MCP server (eds-mcp), on-prem inference on NVIDIA DGX Spark and EXO-clustered Mac Studios, and LoRA fine-tuning of open-weight models.
> **What this is NOT** — a reference method drawn from real builds, not a turnkey guarantee; validate every choice against your own infrastructure, latency/SLA targets, data-residency and regulatory constraints, and cost envelope. Treat outputs as drafts to validate before they are relied on or shipped.

## When to use this
- A model that works in a notebook needs to be deployed and served reliably to production traffic.
- Inference cost is too high and needs to come down without wrecking quality.
- A data pipeline feeding a model is flaky — silent schema breaks, duplicate or dropped records, no observability.
- An AI feature needs reliability and safety backstops before it can touch users or regulated decisions.
- A team is choosing between on-prem, cloud, and hybrid serving under data-residency or cost constraints.

## Operating principle
In production, the model is one component; the harness around it — serving, data flow, evaluation, and guardrails — determines whether it is reliable, affordable, and safe. The governing rule is "models produce, the harness governs": deterministic checks, validation, and human sign-off gates sit around the model rather than trusting its output directly. AI and the model do the generative work; engineering and human review own correctness, cost governance, data residency, and any decision with regulatory weight.

## Capability 1 — Model deployment & serving
**Goal.** Get an open-weight or hosted model into production with predictable latency, throughput, and rollout safety.
**Inputs.** The model and its size, expected traffic and latency/SLA targets, infrastructure options (on-prem / cloud / hybrid), data-residency and compliance constraints, and a cost envelope.
**Method.**
1. Right-size the deployment target: match model size and throughput to on-prem, cloud, or hybrid, honouring data-residency rules from the start.
2. Containerise serving behind a stable API using a proven serving stack (e.g., vLLM or TGI for throughput; Ollama for local/edge).
3. Apply quantisation where it fits the accuracy budget to reduce memory and cost of serving.
4. Configure request batching and, on cloud/hybrid, autoscaling to hold latency under variable load.
5. Roll out with blue/green plus canary: send a slice of traffic to the new version, watch quality and latency, then promote or roll back.
6. Instrument latency, throughput, error rate, and cost per request from day one.
**Output.** A deployment architecture: placement decision (on-prem/cloud/hybrid) with residency rationale, serving stack, quantisation/batching config, a canary/blue-green rollout plan, and the metrics to watch.
**Quality bar.** The design states its latency/SLA and cost assumptions explicitly; rollout is reversible; residency constraints are satisfied, not deferred; no throughput or cost number is asserted without a stated basis.

## Capability 2 — Inference-cost reduction & data-pipeline stability
**Goal.** Cut inference cost while keeping the data pipelines that feed the model stable and observable.
**Inputs.** Current model(s) and usage patterns, quality/accuracy floor, token and request volumes, pipeline sources and schemas, and the cost target.
**Method.**
1. Reduce per-call cost with quantisation and, where justified, distillation to a smaller model that meets the quality floor.
2. Add caching (response and embedding) and prompt/context compression to avoid recomputing and re-sending redundant tokens.
3. Route by difficulty: send easy requests to smaller/cheaper models and reserve large models for hard cases.
4. Govern a token budget — cap and monitor spend per feature — so cost is a first-class metric, not a surprise.
5. Harden data pipelines with explicit data contracts and schemas, validated at ingestion so breaks fail loudly.
6. Make pipelines idempotent with retries and backpressure so replays don't duplicate and spikes don't overrun.
7. Add observability and drift monitoring so input distribution shifts and quality regressions are caught early.
**Output.** A cost-reduction and pipeline-stability plan: model right-sizing/routing, caching and compression, a token-budget policy, and data-contract/idempotency/observability specs for the pipelines.
**Quality bar.** Every cost saving is paired with a quality check against a stated floor; pipeline changes preserve idempotency and fail loudly on contract violations; drift and cost are monitored, not assumed stable.

## Capability 3 — AI reliability & safety backstops
**Goal.** Wrap the model in evals, validation, guardrails, and human gates so failures are caught before they reach users or regulated decisions.
**Inputs.** The use case and its risk level, output schema, grounding sources, applicable policy/regulation, and the human review process.
**Method.**
1. Build an eval set and run it as a regression gate: block deploys that fall below the bar on quality, safety, and format.
2. Enforce structured output with schema validation; reject or repair malformed responses rather than passing them through.
3. Add grounding and citation checks — verify claims against sources and flag ungrounded or contradicted output.
4. Apply guardrails and content filtering for unsafe or out-of-scope requests and responses.
5. Insert human-in-the-loop sign-off gates for high-stakes or regulated actions; the model proposes, a person approves.
6. Add fallbacks and circuit-breakers: on model failure, timeout, or low confidence, degrade gracefully to a safe default.
7. Keep audit logging of inputs, outputs, versions, and decisions, mapping controls to SR 11-7 or the EU AI Act where relevant.
**Output.** A reliability/safety design: eval and regression-gate spec, output-validation rules, grounding and guardrail checks, human sign-off gates, fallback/circuit-breaker behaviour, and an audit-logging plan.
**Quality bar.** No high-stakes action ships without a human gate and audit trail; ungrounded output is flagged, not shipped as fact; fallbacks are defined for the failure modes that matter; controls map to a named standard where regulation applies.

## Worked example (illustrative)
*Illustrative only.* A firm wants to serve an open-weight model on-prem for a data-residency reason. The deployment plan places it on local GPU hardware behind a vLLM server, applies quantisation to fit memory, batches requests, and rolls out with a canary slice before full promotion. To control cost, easy requests route to a smaller model and only hard cases hit the large one, with a per-feature token budget monitored on a dashboard; the ingestion pipeline gains a data contract that rejects malformed records at the door and idempotent retries so replays don't double-count. For safety, an eval set gates every deploy, outputs are schema-validated, claims are grounding-checked against source documents, and any decision with regulatory weight passes a human sign-off gate with full audit logging — controls mapped to SR 11-7. Every specific here is a placeholder pattern to validate against the real infrastructure and constraints.

## Guardrails & escalation
- Stop and validate against the target infrastructure, SLA, residency rules, and cost envelope before treating any architecture as final; a first pass is a proposal, not a commitment.
- Never ship a high-stakes or regulated AI decision without a human-in-the-loop gate, output validation, and audit logging; never present ungrounded model output as verified fact.
- Flag uncertainty: label assumed vs. measured latency/cost/quality, and note where quantisation or distillation may cost accuracy that must be re-measured.
- Escalate model-risk and regulated use cases (financial, medical, legal, safety-critical) to model-risk, security, and compliance review before deployment.

## References & standards
- Quantisation: GPTQ, AWQ, GGUF; fine-tuning: LoRA / QLoRA.
- Serving: vLLM, Text Generation Inference (TGI), Ollama.
- Deployment: blue/green and canary rollouts; autoscaling; containerisation.
- Data engineering: data contracts/schemas, idempotency, backpressure, drift monitoring, observability.
- Reliability & governance: model evaluations and regression gates; SR 11-7 (model risk management); EU AI Act; NIST AI Risk Management Framework (AI RMF).
- Method source: Ed Chen's own stack — Ed Agent (human-gated agent harness), eds-mcp (design-system MCP server), on-prem inference on NVIDIA DGX Spark and EXO-clustered Mac Studios, and LoRA fine-tuning of open-weight models.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
