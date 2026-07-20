---
name: isda-derivatives-documentation
description: Use this skill when a request involves ISDA derivatives documentation — the Master Agreement, Schedule, Credit Support Annex, or Confirmations — for issue-spotting, term comparison, or negotiation preparation. It produces an organised, well-cited term map and redline-preparation draft for qualified derivatives counsel to review — never a legal conclusion, an executed term, or a netting/enforceability opinion.
---

# ISDA Derivatives Documentation

> **What this is** — a repeatable, AI-assisted working method for doing the structured legwork on ISDA derivatives documentation, often beyond one's own formal training, and producing a rigorous first-pass term map and negotiation-prep draft quickly, with qualified derivatives counsel kept in the loop.
> **What this is NOT** — **not legal advice, and not a substitute for qualified derivatives / financial-markets counsel.** **This does not decide any negotiated term, and does not opine on close-out netting enforceability, capital treatment, or set-off — those require a legal opinion and, for netting, a jurisdiction-specific netting opinion.** Every finding is a draft requiring professional review before it is relied on, negotiated, or executed. No attorney-client relationship is created.
> **Enforceability notice** — Close-out netting and collateral enforceability depend on **jurisdiction-specific netting and collateral opinions** and the counterparty's insolvency regime. Nothing here confirms that netting or a security interest is enforceable; those questions are escalated to counsel and, where relevant, to the industry netting opinions, never resolved in this draft.

## When to use this
- A treasury or trading desk is onboarding a new derivatives counterparty and needs the Master Agreement election landscape mapped before the counsel meeting.
- Someone asks "what does this ISDA Schedule actually change from the defaults?" and wants a plain-language, sourced comparison.
- A collateral / margin team needs the Credit Support Annex mechanics (thresholds, MTA, eligible collateral, valuation) laid out for negotiation prep.
- A confirmation needs checking against the relevant ISDA Definitions for completeness before counsel and the desk sign off.
- The team needs raw ISDA facts and elections assembled and cited so counsel spends time negotiating, not gathering.

## Operating principle
AI and a repeatable structure map the elections, assemble the definitions, and organise the negotiation questions; qualified derivatives counsel decides every term and every enforceability question. The value is a faster, better-organised, well-cited starting point for the attorney and the desk — never the final word, and never a netting, set-off, capital, or enforceability opinion.

## Capability 1 — Master Agreement & Schedule election mapping
**Goal.** Lay out what the Schedule elects and changes relative to the pre-printed Master so counsel and the desk can negotiate — not decide the terms.
**Inputs.** The proposed Master (1992 vs 2002), the Schedule draft, counterparty type and jurisdiction, the trading relationship (cleared / uncleared, product scope).
**Method.**
1. Identify the **form and version** — **2002 ISDA Master Agreement** vs **1992** — and note the key structural differences (e.g., close-out measure, grace periods) as issues for counsel.
2. Map the **Events of Default and Termination Events (Sections 5–6)** and which the Schedule elects, amends, or disapplies, in plain language.
3. Lay out the **close-out mechanics (Section 6)** — Early Termination, the close-out amount measure, and payment measures — as elections to confirm, not conclusions.
4. Surface the **Section 2(a)(iii)** condition-precedent flip-switch and any **Automatic Early Termination** election as negotiation points with real consequences.
5. Assemble an election matrix: provision, pre-printed default, Schedule change, effect, open question for counsel.
6. Flag every governing-law, jurisdiction, and cross-default threshold election.
**Output.** A Schedule-vs-default election matrix, each row sourced to the relevant Section and flagged where counsel must decide.
**Quality bar (what the professional receives).** Elections are mapped to their Master sections in plain language; consequences are described as issues; **no term is recommended as "market" or accepted** — counsel and the desk negotiate.

## Capability 2 — Credit Support Annex (collateral) mechanics
**Goal.** Lay out the CSA collateral mechanics and where the negotiated numbers go so the collateral team can prepare — never an enforceability or valuation conclusion.
**Inputs.** The CSA form (English-law transfer-title / New-York-law pledge / VM CSA), the elections draft, applicable margin regime (uncleared margin rules), eligible-collateral wish-list.
**Method.**
1. Identify the **CSA type** (title transfer vs security interest) and note that the legal nature of the collateral interest differs — a point for counsel.
2. Map the core mechanics: **Threshold**, **Minimum Transfer Amount (MTA)**, **Independent Amount**, **Rounding**, **eligible collateral and haircuts**, **valuation/dispute** procedures — as fields to be negotiated and filled.
3. Note the **regulatory margin overlay** — **Uncleared Margin Rules (UMR)**, variation and initial margin, and **ISDA SIMM** as the industry IM model — framed as applicability questions for counsel/risk.
4. Build a mechanics checklist: parameter, what it controls, proposed value, open question.
5. Flag every point where enforceability of the collateral interest depends on a **jurisdiction-specific opinion**.
**Output.** A CSA mechanics map and parameter checklist, each item sourced or flagged.
**Quality bar (what the professional receives).** Collateral mechanics and the numbers-to-negotiate are laid out and sourced; margin-rule applicability is flagged as a question; **no enforceability, capital, or valuation conclusion is stated** — counsel and risk decide.

## Capability 3 — Confirmation & Definitions check
**Goal.** Check a trade confirmation for completeness against the relevant ISDA Definitions so counsel and the desk sign off from a clean draft — never a validity opinion.
**Inputs.** The Confirmation draft, the product (rates / FX / credit / equity), the incorporated ISDA Definitions booklet and version.
**Method.**
1. Identify the applicable **ISDA Definitions** (e.g., **2021 ISDA Interest Rate Derivatives Definitions**, 2006 Definitions for legacy trades, the relevant FX/credit/equity definitions) and confirm the Confirmation incorporates them correctly.
2. Run a **completeness check** of the economic terms (notional, dates, rates/spreads, business-day conventions, calculation agent, fallbacks) against the Definitions' required elements.
3. Note **benchmark-fallback** provisions (e.g., IBOR-transition / RFR fallbacks) as items to confirm current.
4. Flag any term that is ambiguous, internally inconsistent, or missing a Definitions reference.
5. Assemble a confirmation checklist: term, present/complete?, Definitions reference, open question.
**Output.** A confirmation completeness checklist against the incorporated Definitions, each item sourced or flagged.
**Quality bar (what the professional receives).** Economic terms are checked for completeness against the correct Definitions version; gaps and ambiguities are flagged; **no conclusion on validity or economic correctness is stated** — the desk and counsel confirm.

## Worked example (illustrative)
*Illustrative only — plainly hypothetical facts.* A desk is onboarding a corporate counterparty for uncleared interest-rate swaps under a **2002 ISDA Master** with an English-law VM CSA. The first-pass map would: (1) tabulate the Schedule's elected **Termination Events**, the **Cross Default** threshold, and whether **Automatic Early Termination** is on, as points to negotiate; (2) lay out the CSA's **Threshold / MTA / eligible collateral / haircuts** as fields to fill and flag **UMR VM** applicability as a question for counsel/risk; (3) check a sample Confirmation incorporates the **2021 IRD Definitions** with complete economics and current RFR fallbacks; (4) route every enforceability and netting question — and any capital-treatment question — to counsel and the netting opinions. Every item is marked draft. Derivatives counsel decides.

## Guardrails & escalation
- **Escalate immediately to qualified derivatives counsel:** any close-out netting or set-off enforceability question, any insolvency/jurisdiction analysis, any capital or accounting treatment, any actually-negotiated or executed term, and any dispute or default scenario.
- **Never** opine that netting or a collateral interest is enforceable, that a term is "market," that a Confirmation is valid, or that margin rules do or don't apply; never present any of this as legal advice.
- **Flag uncertainty explicitly:** every missing election, jurisdiction-specific question, and unresolved term goes in an "open questions for derivatives counsel" section rather than being silently resolved. ISDA forms, Definitions, and margin rules are updated periodically; note that every reference must be verified against the current published version and the counterparty's actual documents.

## References & sources
- **2002 ISDA Master Agreement** and **1992 ISDA Master Agreement** (Multicurrency–Cross Border) — Sections 5 (Events of Default / Termination Events), 6 (Early Termination / close-out), 2(a)(iii) (conditions precedent).
- **ISDA Credit Support Annex** — English-law (title transfer), New-York-law (pledge), and Variation Margin CSAs; Threshold, Minimum Transfer Amount, Independent Amount, eligible collateral, valuation.
- **ISDA Definitions** — **2021 ISDA Interest Rate Derivatives Definitions** (and the 2006 Definitions for legacy trades); relevant FX, credit, and equity definitional booklets; benchmark/RFR fallback provisions.
- **Uncleared Margin Rules (UMR)** — variation and initial margin; **ISDA SIMM** (Standard Initial Margin Model); **EMIR** / **Dodd-Frank Title VII** as the regulatory context; **LEI** for counterparty identification.
- **Jurisdiction-specific ISDA netting and collateral opinions** — the authority for close-out netting and collateral enforceability (counsel-only). ISDA publications are updated periodically; verify every reference against the current version and the executed documents before reliance.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
