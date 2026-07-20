---
name: GitHub OSS Discovery & License Audit
description: Reviews GitHub trending and relevant repositories against a team's current needs and bottlenecks, recommends existing open-source projects instead of reinventing the wheel, and — for every recommendation — checks the open-source license (MIT / Apache-2.0 versus strongly-copyleft GPLv3) and flags the risk for a commercial closed-source product. For engineering lead, CTO, developer.
audience: engineering lead · CTO · developer
---

# GitHub OSS Discovery & License Audit

## What this is

A method for finding the library instead of building it. It reads GitHub trending and the repositories relevant to a stated need, matches candidates to the team's actual bottleneck, and recommends the ones worth adopting — with a mandatory license check on every single recommendation. For each candidate it identifies the license (permissive like MIT or Apache-2.0 versus strongly-copyleft like GPLv3 or AGPL) and flags what that means for a commercial, closed-source product, alongside a read on whether the project is healthy enough to depend on.

## What this is NOT

Not legal advice. License interpretation for a specific commercial use — especially copyleft obligations, linking questions, and distribution triggers — is confirmed with qualified counsel; the method flags the risk, it does not clear it. Not a green light on popularity: it checks maintenance health, open security issues (known CVEs, supply-chain exposure), and release cadence, and it does not recommend abandoned, unmaintained, or unvetted repositories. Repository state changes, so every finding is verified against the current repo, not a cached impression.

## Method

1. **Start from the bottleneck.** Restate the team's real need and constraint before searching, so discovery is aimed at a problem, not at what happens to be trending.
2. **Scan trending and adjacent repos.** Review GitHub trending and the relevant ecosystem for candidates that plausibly solve the stated need.
3. **Match to fit, not hype.** Weigh each candidate against the actual requirement, integration cost, and language/runtime fit — a popular repo that doesn't fit is still the wrong repo.
4. **Check the license — mandatory, every time.** Identify the exact license (MIT / Apache-2.0 versus GPLv3 / AGPL and others) and flag the obligation and risk for a commercial closed-source product.
5. **Read maintenance health.** Commit recency, release cadence, open-issue backlog, and maintainer responsiveness — an abandoned dependency is a liability, not an asset.
6. **Check security and supply chain.** Known CVEs, dependency depth, and provenance signals — flag anything that would import a vulnerability or an untrusted chain.
7. **Confirm against the live repo.** Verify each finding against the current repository state, since stars, licenses, and health drift over time.
8. **Recommend with the risk on the table.** Present each recommendation with its license implication, health read, and security note — and route commercial-use license questions to counsel.

## Quality bar

Search aimed at a real bottleneck · candidates matched to fit not hype · license identified for every recommendation · commercial closed-source risk flagged · maintenance health read · security and supply chain checked · findings confirmed against the live repo · legal questions routed to counsel.

## Guardrails & escalation

This is not legal advice — license interpretation for commercial use, copyleft obligations, and distribution triggers are confirmed with qualified counsel before adoption. It does not recommend abandoned, unmaintained, or unvetted repositories, and it flags known CVEs and supply-chain risk rather than assuming popularity means safety. Repository state is verified as current, since licenses and health change. The method informs the build-or-buy call; the accountable engineering owner and counsel decide.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: github-repo-orchestration and huggingface-model-ops. Confirm license obligations with counsel and verify repository health and CVEs against current sources (SPDX, the repo, and your vulnerability database).
