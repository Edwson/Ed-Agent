---
name: smart-contract-audit
description: Use this skill when a Solidity/EVM smart contract needs a fast, structured first-pass security review before a professional audit. It maps likely vulnerability classes, drafts gas notes, and produces an audit-report skeleton for a qualified auditor to verify.
---

# Smart-Contract Audit

> **What this is** — a repeatable, AI-assisted working method for doing the structured legwork on a request in smart-contract security and producing a rigorous first-pass draft and issue map quickly, with a qualified security auditor kept in the loop.
> **What this is NOT** — **not a professional smart-contract security audit and not a guarantee of safety.** Deploying unaudited or self-reviewed contracts can cause irreversible loss of funds. Commission a reputable audit firm and, where warranted, formal verification and an economic/security review before mainnet deployment. Every finding or document is a draft that requires professional review before it is relied on, deployed, filed, or represented to anyone. No professional-client relationship is created.

## When to use this
- A team has a Solidity/EVM contract and wants a structured first-pass review before paying for a formal audit.
- You need to triage which vulnerability classes plausibly apply to a given contract and where to focus scarce auditor time.
- A contract change (new upgrade, proxy, or external integration) needs a quick issue map before committing.
- You want a draft audit report skeleton to hand to a professional auditor to verify and sign.
- You need gas-optimization candidates with correctness caveats, not blind rewrites.

## Operating principle
AI and a disciplined checklist can enumerate likely vulnerability classes, run available tooling, and draft the report structure fast — but a qualified auditor decides what is real, exploitable, and safe to ship. The value is a faster, better-organised starting point that concentrates expert attention; it is never the final word, and it never substitutes for a professional audit or formal verification.

## Capability 1 — Reentrancy / overflow vulnerability scanning
**Goal.** Enumerate and locate likely vulnerability classes so an auditor spends time confirming, not searching.
**Inputs.** Contract source, compiler version and settings, deployment/upgrade model, external dependencies (oracles, tokens, bridges), and the intended trust assumptions.
**Method.**
1. Record the compiler version and note whether Solidity ≥0.8 built-in overflow/underflow checks are in effect, and flag every `unchecked { ... }` block for manual review.
2. Run static analysis with **Slither** and record raw detector output; treat findings as leads, not conclusions.
3. Run property/invariant tests with **Foundry** (`forge test`, invariant tests) and fuzzing with **Echidna** where meaningful.
4. Manually review control flow against the **checks-effects-interactions** pattern; look for state changes after external calls.
5. Check for reentrancy in three forms: single-function, cross-function (shared state), and read-only reentrancy (view functions relied on by others).
6. Review access control (owner/role gating, initializer protection on upgradeable contracts), `delegatecall`/proxy storage-collision risks, and oracle/price manipulation surfaces (single-source spot prices, missing TWAP/staleness checks).
7. Cross-reference each candidate against the **SWC Registry** and **OWASP Smart Contract Top 10** and note the closest known class.
8. For each candidate, write down a plausibility note and what evidence would confirm or refute it.
**Output.** An issue map: file/line, suspected class (with SWC/OWASP reference), preconditions, and a confirm/refute plan.
**Quality bar (what the professional receives).** Every item is labelled tool-flagged vs. manual-hypothesis, unconfirmed until an auditor validates, with reproduction steps or the missing evidence stated explicitly.

## Capability 2 — Gas optimization suggestions
**Goal.** Surface gas-saving candidates without silently changing behaviour.
**Inputs.** Contract source, hot paths / expected call frequency, and target chain.
**Method.**
1. Identify high-frequency functions and the storage they touch; prioritise `SLOAD`/`SSTORE` reduction.
2. Suggest storage-slot packing of related small variables — with an explicit note that packing changes storage layout and must not be applied to deployed upgradeable contracts without a migration review.
3. Recommend `calldata` over `memory` for external read-only array/struct parameters.
4. Flag arithmetic that is provably bounded as an `unchecked` candidate — paired with a correctness caveat that this removes overflow protection and requires proof of bounds.
5. Note where emitting an event is cheaper than persisting non-critical state, and where redundant `SLOAD`s can be cached in memory.
6. Review loops and external calls for unbounded iteration and gas-griefing / DoS risk.
**Output.** A ranked list of gas candidates, each with estimated impact, the exact change, and a correctness/safety caveat.
**Quality bar (what the professional receives).** No suggestion is presented as safe-to-apply; each carries its behavioural risk so the auditor decides. Gas savings never take priority over correctness.

## Capability 3 — Audit report draft
**Goal.** Produce a report skeleton in the format auditors expect, ready to verify and sign.
**Inputs.** The issue map from Capability 1, gas notes from Capability 2, scope boundaries, and commit hash.
**Method.**
1. Classify each finding by severity: critical / high / medium / low / informational, with the rationale (impact × likelihood) stated.
2. Format each finding as: title, description, impact, proof-of-concept or likelihood, affected code, and recommendation.
3. Write an executive summary: scope, commit reviewed, methodology, tools used, and a severity count table.
4. List explicit out-of-scope items and assumptions (e.g., trusted admin keys, off-chain components).
5. Mark every finding **DRAFT — unverified** until an auditor confirms.
**Output.** A draft audit report with severity table, findings, and executive summary.
**Quality bar (what the professional receives).** A clean skeleton with all facts sourced to code and tooling, severities flagged as provisional, and nothing represented as a completed or signed audit.

## Worked example (illustrative)
*Illustrative and hypothetical.* A staking contract `Vault.sol` (compiled with Solidity 0.8.24) lets users `withdraw()`. The method notes that `token.transfer(msg.sender, amount)` executes **before** `balances[msg.sender] = 0`, violating checks-effects-interactions — a suspected single-function reentrancy (SWC-107). Slither flags the same location; a Foundry invariant test is drafted to attempt re-entry. Separately, an `unchecked` block adding rewards is flagged as an overflow-protection removal needing a bounds proof. All of this is written up as **DRAFT — unverified** and handed to a qualified auditor to confirm exploitability and sign off. No deployment recommendation is made.

## Guardrails & escalation
- Nothing here clears a contract for mainnet. A reputable third-party audit — and formal verification / economic review where value or complexity warrants — must precede deployment.
- No finding, severity, or "no issues found" statement may be relied on or represented as a completed audit or a safety guarantee.
- Upgradeable/proxy contracts, key management, and economic/incentive design are high-risk areas that must go to specialists.
- Uncertainty is flagged explicitly: tool-flagged vs. manual-hypothesis, confirmed vs. unconfirmed, and every open question is listed for the auditor rather than resolved silently.

## References & sources
- SWC Registry (Smart Contract Weakness Classification) — vulnerability taxonomy.
- OWASP Smart Contract Top 10 — common risk categories.
- Slither (Trail of Bits) — static analysis for Solidity.
- Echidna (Trail of Bits) — property-based fuzzer.
- Foundry (`forge`) — testing, invariant tests, and fuzzing.
- Solidity documentation — arithmetic overflow/underflow checks introduced in 0.8.0 and `unchecked` blocks.
- The checks-effects-interactions pattern — reentrancy mitigation.
- Established audit methodologies (e.g., Consensys Diligence, Trail of Bits) referenced as method sources, not endorsements.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
