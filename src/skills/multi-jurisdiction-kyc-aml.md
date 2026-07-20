---
name: multi-jurisdiction-kyc-aml
description: Use this skill when a request involves KYC/AML compliance across more than one jurisdiction — mapping the requirements per country, generating a gap/comparison report against a program, or shaping how findings feed an existing compliance system. It produces an organised, well-cited requirements matrix and gap report for a qualified MLRO / compliance officer to review — never a compliance determination or a filing.
---

# Multi-Jurisdiction KYC/AML

> **What this is** — a repeatable, AI-assisted working method for mapping KYC/AML/CFT obligations across several jurisdictions, comparing them against a firm's existing program, and organising the output so it can feed an existing compliance system — with a qualified MLRO / compliance officer kept in the loop.
> **What this is NOT** — **not legal or compliance advice, and not a substitute for a licensed MLRO, compliance officer, or AML counsel.** **It does not determine whether a program is compliant, whether a customer is high-risk, or whether a filing is required — those are regulated judgments.** AML rules differ by jurisdiction and change frequently through regulator guidance and enforcement; every finding is a draft requiring professional review and verification against primary sources before it is relied on.
> **Regulatory-currency notice** — Any "requirements database" or reference matrix this method maintains is a *working reference that must be re-verified against the current primary regulation and regulator guidance*; it is not an authoritative or self-certifying source. Sanctions and PEP screening in particular are operational controls the firm runs, not something this method performs.

## When to use this
- A firm is entering a new market and needs the KYC/AML obligations of each target jurisdiction mapped before the compliance-officer review.
- Someone needs a side-by-side comparison of CDD/EDD, record-keeping, and reporting duties across several countries.
- A program owner wants a gap report: "where does our current onboarding fall short of jurisdiction X's requirements?"
- The compliance team needs findings structured so they drop into an existing case-management or GRC system rather than living in a document.
- Raw AML requirements need assembling and citing so the MLRO spends time deciding risk, not gathering rules.

## Operating principle
AI and a maintained, versioned reference map the obligations, compare them against the program, and structure the output for the firm's systems; a qualified MLRO / compliance officer decides every risk rating, control adequacy, and filing question. The value is a faster, better-organised, well-cited starting point — never a compliance conclusion, a customer risk decision, or a regulatory filing.

## Capability 1 — Multi-jurisdiction requirement mapping
**Goal.** Lay out the KYC/AML/CFT obligations per jurisdiction so the compliance officer can compare — not decide adequacy.
**Inputs.** Target jurisdictions, business type (broker, payments, VASP, bank), customer types (retail/institutional/cross-border), current program docs if available.
**Method.**
1. For each jurisdiction, map the governing framework and its core duties: **CDD/EDD**, beneficial-ownership, **PEP** handling, ongoing monitoring, record-keeping, and suspicious-activity reporting — sourced to the primary regulation.
2. Anchor to the relevant regimes: **FATF Recommendations** (the global baseline), **FinCEN CDD Rule** (31 CFR 1010.230) and the **BSA** (US), **EU AMLD** (Directives (EU) 2015/849, 2018/843 and the 6th), **UK MLR 2017**, **AUSTRAC / AML-CTF Act 2006** (Australia), **MAS** notices (Singapore), as applicable.
3. Maintain the mapping as a **versioned matrix** with a "verified-as-of" date per row, so currency is explicit and re-verification is prompted.
4. Flag every jurisdiction-specific divergence (thresholds, EDD triggers, reporting timelines) as an item to confirm.
5. Note sanctions/PEP screening as **operational controls the firm performs**, not something this map executes.
**Output.** A per-jurisdiction requirements matrix, each row sourced and dated, divergences flagged.
**Quality bar (what the professional receives).** Obligations are mapped to primary regulation with a verified-as-of date; divergences are surfaced as issues; **no adequacy or risk conclusion is stated** — the MLRO decides.

## Capability 2 — Automated gap & comparison reporting
**Goal.** Compare a firm's existing program against the mapped requirements and produce a structured gap report — never a compliance sign-off.
**Inputs.** The requirements matrix (Cap 1), the firm's current onboarding/monitoring controls, the report format the reviewer needs.
**Method.**
1. Align each requirement to the firm's **corresponding control** (present / partial / absent / unclear).
2. Generate a **gap report**: requirement, jurisdiction, current control, gap status, severity flag, open question for the MLRO.
3. Highlight **cross-jurisdiction conflicts** (where one regime's rule sits awkwardly against another) as items for professional resolution.
4. Keep the report **regenerable**: when the matrix or the program changes, the comparison re-runs, so it's a living artifact, not a one-off.
5. Mark every "gap" as *candidate finding for review* — the reviewer confirms whether it's a true gap and its risk weight.
**Output.** A structured, regenerable gap/comparison report with severity flags and open questions.
**Quality bar (what the professional receives).** Each requirement is aligned to a control with an explicit status; gaps are labelled candidate findings, not confirmed deficiencies; severity is flagged for the reviewer, not decided.

## Capability 3 — Integration with existing compliance systems
**Goal.** Shape the output so it feeds the firm's existing case-management / GRC / screening stack — never replace those systems' controls.
**Inputs.** The gap report and matrix, the target system's data model / API surface, the firm's data-handling and privacy constraints.
**Method.**
1. Define a **structured schema** (findings, requirements, controls, jurisdictions, dates) so output is machine-ingestible rather than prose.
2. Map fields to the target system's model (case-management, GRC, screening) so findings land as **tracked, assignable items** with owners and due dates.
3. Specify an **API-oriented handoff** (structured export or endpoint contract) for the engineering team to wire — the method produces the contract and the data, not the live integration or the screening itself.
4. Respect **data-minimisation and privacy** — flag personal-data handling for the DPO where cross-border transfer or retention is involved.
5. Keep humans in the loop: every ingested finding routes to a reviewer queue, never auto-dispositions a customer.
**Output.** A structured-output schema and an integration/handoff spec for engineering and compliance.
**Quality bar (what the professional receives).** Output is schema-structured and mappable to the firm's systems; the integration is specified, not silently assumed live; nothing auto-dispositions a customer or performs the actual screening — humans and existing controls decide.

## Worked example (illustrative)
*Illustrative only — hypothetical facts.* A payments firm live in Australia wants to add the EU and UK. The first-pass draft would: (1) map **AUSTRAC / AML-CTF Act 2006** duties it already meets against **EU AMLD 5/6** and **UK MLR 2017**, each row sourced and dated; (2) generate a gap report showing, e.g., EU beneficial-ownership and EDD-trigger differences as *candidate findings* with severity flags; (3) define a findings schema and a handoff spec so those candidate findings land as assignable cases in the firm's GRC tool with owners and due dates — routing every one to the MLRO's queue, never auto-clearing a customer. Every item is marked draft, dated, and for professional confirmation. The MLRO decides risk and filings.

## Guardrails & escalation
- **Escalate to a qualified MLRO / compliance officer / AML counsel:** any customer risk rating, any SAR/STR filing decision, any sanctions or PEP hit, any determination that a program is or isn't compliant, and any new-jurisdiction go-live.
- **Never** decide a customer is high-risk, clear or block a customer, perform sanctions/PEP screening, conclude a program is compliant, or file a report — those are the firm's regulated controls and its officers' judgments.
- **Flag uncertainty and currency explicitly:** every requirement carries a verified-as-of date and a primary-source pointer; missing facts and jurisdiction-specific rules go in an "open questions for the MLRO" section. AML rules change frequently — note that every citation must be re-verified against current regulation and regulator guidance before reliance.

## References & sources
- **FATF Recommendations** — the international AML/CFT baseline (CDD, beneficial ownership, PEPs, reporting).
- **US** — **Bank Secrecy Act (BSA)** and **FinCEN CDD Rule (31 CFR 1010.230)**; OFAC sanctions context.
- **EU** — **AMLD**: Directive (EU) **2015/849** (4th), **2018/843** (5th), and the 6th; the emerging EU AML Authority (AMLA) / single-rulebook direction.
- **UK** — **Money Laundering Regulations 2017 (MLR 2017)**; FCA guidance.
- **Australia** — **AML/CTF Act 2006** and **AUSTRAC** guidance; **Singapore** — **MAS** notices. Sanctions/PEP screening are operational controls run by the firm. AML frameworks change frequently; verify every provision against current primary regulation and regulator guidance before reliance.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
