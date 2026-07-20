---
name: Dify Workflow Planner
description: Plan an AI application on Dify before touching a single node — product logic first, then graph layout, model routing, RAG design, integrations, and the human gates. For designers and developers shipping LLM apps on dify.ai.
audience: designer · developer · product
---

# Dify Workflow Planner

## What this is

A planning method for Dify (dify.ai), the open-source LLM app platform. Dify's canvas makes it easy to start dragging nodes immediately — which is exactly how workflows become unmaintainable. This skill puts the project logic on paper first, so the graph you build is the plan, not the exploration.

## What this is NOT

Not official Dify documentation and not affiliated with Dify — it's a working method that uses Dify's public concepts (Chatflow, Workflow, Agent, Knowledge, Tools). Version specifics change; the planning discipline doesn't.

## Method

1. **Write the contract before the canvas.** One paragraph: who uses this, what goes in (and its shape), what must come out, what failure looks like, and what the app must NEVER do. This paragraph outlives every node you'll drag.
2. **Pick the app type by interaction shape, not fashion.** Multi-turn conversation with memory → Chatflow. Deterministic input→output pipeline → Workflow. Autonomous tool use with reasoning → Agent — and only when the task genuinely needs it; an Agent where a Workflow would do is nondeterminism you paid extra for.
3. **Lay out the graph as three lanes.** Happy path down the middle; validation and classification up front (question classifier / IF-ELSE before expensive calls); error and fallback branches explicit — every LLM node gets a "what if this returns garbage" edge, not just the success arrow.
4. **Name variables like an API.** `user_query`, `retrieved_context`, `draft_reply` — the variable panel is your data contract between nodes; single-letter names are how graphs die.
5. **Design RAG as a supply chain.** Knowledge base hygiene first (clean sources, sensible chunking, metadata), retrieval settings per use case (top-k, score threshold), and **citations returned to the surface** — an answer that can't show its sources shouldn't claim any.
6. **Route models by node, not by loyalty.** Cheap-fast models for classification and extraction; strong models only where judgment lives; set max tokens and temperature per node deliberately. Cost is a design property — estimate per-run cost before shipping.
7. **Wire integrations at the edges.** HTTP Request nodes and Tools for 串接 external systems: secrets in environment credentials (never in prompts), timeouts and retries set, webhook outputs idempotent.
8. **Gate the irreversible.** Anything that sends, spends, or changes permissions pauses for human confirmation — inside the flow or at the consuming surface (see the CDS agent-confirm entry). Log what was blocked, not only what succeeded.

## Quality bar

The contract paragraph exists before the first node · every LLM node has a failure edge · variables named semantically · per-run cost estimated · citations surface to the user · irreversible actions gated · a test set of ≥10 adversarial inputs run before launch.

## Guardrails & escalation

Personal data entering third-party model APIs is a consent and residency question — check the data path before the demo, not after. Regulated advice domains (medical, legal, financial) route their outputs through the CDS refusal/escalation patterns; the workflow ships with its limits stated.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json + tokens.json · Agent brief: https://edwson.com/cds/AGENTS.md
