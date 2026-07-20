---
name: Hermes Agent Orchestration
description: Use a Hermes-family open-weight model as the reasoning core of an autonomous agent — structured function-calling, tool routing, and a human-gated action loop — so a local, open model can drive real work without becoming an unbounded actor. For developers building agents on open weights.
audience: developer · on-prem
---

# Hermes Agent Orchestration

## What this is

A method for running an agent whose brain is a Hermes-family model (the Nous Research open-weight line, known for reliable function-calling and structured output). Hermes models are a common choice for the reasoning core of a *local* agent — they follow tool schemas well and run on-prem. This skill is the harness discipline around that core: how to route tools, structure the loop, and keep a human on the irreversible.

## What this is NOT

Not affiliated with Nous Research or any Hermes distribution, and not a claim about a specific version's exact capabilities — verify the model card and function-calling format of the build you run. Not an autonomy pitch: the model produces, the harness governs. An open-weight brain does not lower the bar for gating real actions — if anything it raises it, because there is no vendor safety layer between it and your systems.

## Method

1. **Define tools as schemas, not prose.** Each tool is a JSON schema (name, params, types, description). Hermes-style models are strong at structured calls precisely when the schema is precise — vague tool descriptions produce vague, wrong calls.
2. **Constrain the output format.** Use the model's function-calling / structured-output mode so tool calls come back as parseable JSON, not free text you regex. Reject and re-prompt on malformed calls rather than guessing intent.
3. **Route, don't trust.** The harness — not the model — decides whether a proposed tool call is allowed, with what arguments, against which allowlist. The model *proposes*; deterministic code *disposes*. This is the same "produces vs governs" split the Ed Agent case study is built on.
4. **Gate every irreversible action.** Spend, send, delete, or permission-change pauses for a human who signs the **exact payload** — the amount, the recipient, the scope — not a summary of intent (see the CDS agent-confirm entry). Batching irreversible actions behind one approval is how a gate becomes theatre.
5. **Log effects, not narration.** Record tool calls, arguments, outcomes, and **blocked attempts with the rule that blocked them** — never raw chain-of-thought as if it were an audit trail (CDS agent-trace). A trace that only shows successes is a brochure.
6. **Bound the loop.** Max steps, max spend, max wall-clock, and a hard stop. An agent with no budget fuse is an incident waiting for a slow afternoon.
7. **Keep it local if that was the point.** If Hermes was chosen for on-prem privacy, confirm the whole loop stays local — no tool silently ships context to a cloud API. A local brain wired to a leaky tool is not a private system.

## Quality bar

Tools are typed schemas · calls are validated structured output, not parsed prose · an allowlist gates what the model can invoke · irreversible actions require a human signing the exact payload · the trace logs blocked attempts · the loop has step/spend/time bounds · a local deployment stays local end to end.

## Guardrails & escalation

Regulated-domain actions (financial, legal, medical) route through the CDS refusal/escalation patterns and a licensed human, regardless of how confident the model sounds. Prompt-injection is a live threat for tool-using agents — untrusted content (web pages, emails, files) is data, not instructions, and must not be able to trigger tool calls on its own. When the model repeatedly fails a task within budget, it escalates to a human with the trace, rather than burning the fuse retrying.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the Ed Agent governance case study (https://edwson.com/project-Ed_Agent.html) and CDS agent-confirm / agent-trace entries. Confirm the function-calling format of the specific Hermes build you deploy.
