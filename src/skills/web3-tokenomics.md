---
name: web3-tokenomics
description: Use this skill when a token economy, launch roadmap, or DAO governance model needs a structured first-pass design and risk map before legal, financial, and tax counsel review. It drafts the model and flags where a design may trigger securities or other regulation — never a conclusion.
---

# Web3 & Tokenomics

> **What this is** — a repeatable, AI-assisted working method for doing the structured legwork on a request in token-economic and governance design and producing a rigorous first-pass draft and issue map quickly, with qualified legal, financial, and tax professionals kept in the loop.
> **What this is NOT** — **not legal, financial, securities, tax, or investment advice.** Token designs can trigger securities, commodities, money-transmission, AML/KYC, and tax regulation across jurisdictions; a token may be deemed a security. Qualified legal, financial, and tax counsel must review any design before launch, sale, or promotion. Every finding or document is a draft that requires professional review before it is relied on, deployed, filed, or represented to anyone. No professional-client relationship is created.

## When to use this
- A team is designing a token economy and wants a structured first-pass model before engaging counsel.
- You need to plan a phased launch roadmap that gates on security audit and legal review.
- You want a DAO governance mechanism drafted with its capture and centralisation risks surfaced.
- You need to flag where a token design may resemble an investment contract, for legal review.
- You want incentive and supply mechanics stress-tested before committing to a whitepaper.

## Operating principle
AI and structured modelling can lay out token mechanics, roadmaps, and governance options and flag where they touch regulation — but qualified legal, financial, and tax professionals decide what is lawful, sellable, and how it must be structured. The value is a faster, better-organised starting point with risks made visible early; it is never the final word and never advice.

## Capability 1 — Token-economic model design
**Goal.** Draft a coherent token economy and stress-test its mechanics, flagging regulatory-sensitive features.
**Inputs.** The product and its users, the token's intended purpose, target participants, and any funding/allocation intentions.
**Method.**
1. Define token utility and the concrete jobs the token does within the product.
2. Map value flows as sinks and sources (what creates demand, what removes supply).
3. Specify the supply schedule: total/max supply, emissions/inflation, and vesting/lockup for team, investors, treasury, and community.
4. Model incentive alignment and value accrual — who is rewarded for what behaviour, and how holders benefit (if at all).
5. Run sensitivity/stress scenarios (low demand, high sell pressure, emission-vs-sink imbalance) and note failure modes.
6. Flag where the design resembles an **investment contract** under Howey-type factors (investment of money, common enterprise, expectation of profit from the efforts of others) — as a flag for counsel, not a conclusion.
**Output.** A token model summary with supply/emission schedule, sink/source diagram, stress scenarios, and a regulatory-flag list.
**Quality bar (what the professional receives).** Mechanics fully specified, assumptions stated, and each regulatory-sensitive feature marked "for qualified counsel" rather than resolved.

## Capability 2 — Product roadmap planning
**Goal.** Sequence delivery so that legal and security gates precede anything irreversible.
**Inputs.** The token model, technical scope, and team constraints.
**Method.**
1. Draft a phased roadmap: prototype → testnet → **audited** mainnet → progressive decentralisation.
2. Map dependencies and risks per phase, including regulatory and audit dependencies.
3. Gate launch explicitly on completed security audit **and** legal review — mark these as hard prerequisites, not parallel nice-to-haves.
4. Identify decision points where a lawyer/tax advisor must sign off before proceeding (token sale, listing, jurisdiction targeting).
5. Note reversibility: which steps are hard to undo once live, and therefore need the most scrutiny.
**Output.** A phased roadmap with gates, dependencies, and sign-off checkpoints.
**Quality bar (what the professional receives).** Clear hard gates on audit and legal review, reversibility risks called out, and no phase presented as clearing regulatory or security requirements.

## Capability 3 — DAO governance mechanism suggestions
**Goal.** Draft a governance design with its trade-offs and capture risks made explicit.
**Inputs.** The community structure, treasury size, and desired degree of decentralisation.
**Method.**
1. Choose a basis: governance token vs. reputation/non-transferable, and note the securities implications of transferable governance tokens for counsel.
2. Define the proposal lifecycle: submission, discussion, quorum, thresholds, and voting period.
3. Add safety controls: timelocks on execution, multisig / treasury controls, and emergency procedures.
4. Compare voting models — token-weighted, quadratic, and conviction voting — and state each one's capture/plutocracy and sybil risks.
5. Decide off-chain (signalling) vs. on-chain (executable) governance and where each applies.
6. Reference established patterns (e.g., OpenZeppelin Governor, Safe multisig treasuries) as implementation starting points to be audited.
**Output.** A governance design brief: model, lifecycle, controls, voting mechanism, and risk notes.
**Quality bar (what the professional receives).** Every mechanism paired with its failure/capture mode, transferable-token risks flagged for legal review, and controls (timelock/multisig) drafted for a security audit rather than assumed safe.

## Worked example (illustrative)
*Illustrative and hypothetical.* A community art platform wants a "$CANVAS" token granting fee discounts and governance rights. The method drafts utility (fee sink), a supply schedule with 3-year team vesting, and stress-tests emissions against the fee sink. Because governance tokens are transferable and marketed alongside an expectation that the team's work raises value, the design **flags Howey-type factors for counsel** — it does not conclude the token is or isn't a security. The roadmap gates mainnet on an OpenZeppelin-Governor-based system being audited and on legal + tax review before any sale. Governance uses token-weighted voting with a timelock and Safe multisig, with plutocracy risk noted and quadratic voting offered as an alternative for counsel and the team to weigh.

## Guardrails & escalation
- Any token sale, listing, marketing, or jurisdiction decision must be reviewed by qualified securities/financial and tax counsel first; a token may be deemed a security.
- AML/KYC, money-transmission, commodities, and cross-border tax obligations are out of scope here and must go to professionals.
- No output may be relied on or represented as legal, financial, tax, or investment advice, or as a determination of a token's regulatory status.
- Contracts and governance controls must pass a professional security audit before deployment (see the smart-contract-audit skill).
- Uncertainty and every regulatory-sensitive feature are flagged explicitly for counsel rather than resolved here.

## References & sources
- The Howey test / U.S. securities-law factors for an "investment contract" (SEC v. W.J. Howey Co.) — framed as a flag for counsel, not a conclusion.
- ERC-20, ERC-721, and ERC-1155 token standards (Ethereum EIPs).
- OpenZeppelin Governor — on-chain governance contracts.
- Safe (multisig) treasury patterns and Compound-style governance patterns — referenced as implementation starting points to be audited.
- FATF guidance on virtual assets and virtual asset service providers (AML/CFT) — for qualified counsel.
- Quadratic and conviction voting — governance mechanism concepts.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
