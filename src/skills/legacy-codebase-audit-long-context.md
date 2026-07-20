---
name: Long-Context Legacy Codebase Audit
description: Use a large-context local model to ingest a legacy project — 100K–300K tokens of source, architecture docs, API specs and migration history — and surface zombie code, dependency-conflict and breaking-upgrade risk, and Clean-Code violations, then propose low-blast-radius refactor PRs that ship with test logic. Runs locally so proprietary code never leaves the machine. For engineers inheriting a system nobody fully remembers.
audience: senior engineer · tech lead · platform engineer
---

# Long-Context Legacy Codebase Audit

## What this is

A method for understanding a large legacy codebase by feeding it, whole, into a long-context model running locally. It ingests the source, the architecture diagrams, the API specifications, and the data-migration history — the 100K–300K-token reality of a system that has outgrown any one person's memory — and reports what's actually there: zombie code left behind by evolution, third-party dependencies whose next upgrade is breaking, and modules that violate Clean-Code principles. It then proposes refactors as low-blast-radius PR templates that carry their own unit-test logic, so a change can be verified rather than trusted. Running on a local model (e.g. via Llama / LM Studio) keeps proprietary code off third-party servers.

## What this is NOT

Not affiliated with or endorsed by Meta/Llama, LM Studio, or any tool. Not an auto-apply refactor bot: every proposal is a reviewed PR with tests, merged by a human who understands the blast radius — a large model can still misread intent in code it has only seen once. Not a substitute for the team's knowledge of why a "wrong-looking" decision was made; a flagged Clean-Code violation may be a deliberate, load-bearing choice, so findings are hypotheses to confirm. Not a security audit or a guarantee of correctness; breaking-change and migration calls are validated with the team and its tests.

## Method

1. **Ingest the whole system.** Source, architecture docs, API specs, and migration records into the long-context window — the point is to reason over the *whole* graph, not a keyhole view of one file.
2. **Map the real architecture.** Reconstruct how the system actually fits together and where the load-bearing seams are, before judging any part of it.
3. **Find the zombie code.** Modules, flags, endpoints, and branches that evolution left behind and nothing reaches — dead weight that raises the cost of every change.
4. **Flag dependency and upgrade risk.** Third-party libraries whose next major version is breaking, unpinned or abandoned deps, and the supply-chain surface — the upgrades that will hurt if unplanned.
5. **Identify design debt.** Clean-Code violations (tangled responsibilities, hidden coupling, untestable seams) — named with the principle, and with the context read *before* the flaw.
6. **Separate defect from deliberate choice.** Distinguish a genuine problem from a constraint someone chose on purpose; label which is which and route the ambiguous ones to the team.
7. **Propose low-blast-radius refactors.** Each as a PR template with the change scoped tightly and unit-test logic included, so the refactor is verifiable, not a leap of faith.
8. **Sequence by risk and value.** Rank the work by what most reduces future change-cost and risk, painless wins first — an audit that ends without a prioritised plan is trivia.

## Quality bar

The whole system (source + docs + specs + migrations) is ingested and the real architecture reconstructed first · zombie code is found across modules/flags/endpoints · dependency and breaking-upgrade risk is flagged with the supply-chain surface · Clean-Code debt is named with the principle and the context read before the flaw · genuine defects are separated from deliberate constraints · refactors ship as low-blast-radius PR templates with test logic · nothing auto-applies — a human merges · work is sequenced by risk and value.

## Guardrails & escalation

An analysis-and-proposal method — not affiliated with any model or tool. A local long-context model reduces the risk of proprietary code leaving the machine, but it can still misread intent seen once, so every finding is a hypothesis and every refactor is a reviewed, tested PR merged by a human — nothing auto-applies. Breaking-change, migration, and security calls are validated with the team and its test suite; a flagged violation may be a deliberate, load-bearing choice, and the ambiguous ones route to the people who wrote it.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related within this kit: the Ollama local-deployment, product-conflict analysis, and GitHub OSS discovery skills. Breaking-change and security decisions are validated with the team.
