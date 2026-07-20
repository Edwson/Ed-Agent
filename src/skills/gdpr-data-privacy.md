---
name: gdpr-data-privacy
description: Use this skill when a request involves EU/UK GDPR data-protection operations — mapping data flows, reviewing a data-processing agreement, or assessing a cross-border transfer. It produces a rigorous first-pass draft and issue map for a qualified data-protection lawyer or DPO to review.
---

# GDPR & Data-Privacy Operations

> **What this is** — a repeatable, AI-assisted working method for doing the structured legwork on a request in EU/UK GDPR data-protection operations, often beyond one's own formal training, and producing a rigorous first-pass draft and issue map quickly, with a qualified data-protection lawyer or DPO kept in the loop.
> **What this is NOT** — **not legal advice, and not a substitute for a qualified data-protection lawyer or DPO.** Data-protection law is fact-specific and changes; every finding, position, or document is a draft that requires professional review before it is relied on, filed, signed, or acted on. No solicitor-client relationship is created.

## When to use this
- A vendor sends a data-processing agreement (DPA) and someone needs a fast, structured read of where it deviates from Article 28.
- The team needs a Record of Processing Activities (ROPA) started or refreshed under Article 30.
- A new integration or SaaS tool moves personal data outside the EEA/UK and someone asks "is that transfer lawful?"
- An audit, RFP, or due-diligence questionnaire asks for a data map, lawful-basis inventory, or transfer register.
- Product proposes a feature touching personal data and wants the privacy issues surfaced before build.

## Operating principle
AI and a repeatable structure map the issues, assemble the records, and draft the first pass; a qualified data-protection lawyer or DPO decides. The value is a faster, better-organised, well-cited starting point that the expert can review and correct — never the final word, and never a substitute for the professional judgment that lawful basis, transfer risk, and contractual liability require.

## Capability 1 — Data-flow inventory / Records of Processing (Article 30)
**Goal.** Produce a structured ROPA and data map that a DPO can validate, not a finished compliance record.
**Inputs.** System list, vendor list, data dictionaries, existing privacy notices, integration diagrams, interviews with process owners.
**Method.**
1. Enumerate each **processing activity** (what is done, by which system/team, for what business purpose).
2. For each, list **data categories** and whether any are **special-category data** (Article 9) or criminal-offence data (Article 10).
3. Identify the **data subjects** (customers, employees, prospects, minors) and approximate volumes.
4. Record the **purpose** and the **lawful basis under Article 6** (and, for special categories, the Article 9(2) condition) — flag any activity with no clean basis for the professional.
5. List **recipients** (internal teams, processors, sub-processors, third parties) and each **cross-border flow** with destination and mechanism.
6. Capture **retention period** (or the criteria used to set it) and the **security measures** in place (link to Article 32).
7. Cross-check against **Article 5** principles (purpose limitation, data minimisation, storage limitation, accuracy) and note gaps.
8. Assemble into a register table plus a visual data-flow map; mark every assumption and unknown.
**Output.** A ROPA table, a data-flow diagram, and a lawful-basis inventory, each cell sourced or flagged as an open question.
**Quality bar (what the professional receives).** Every processing activity has a purpose and a candidate lawful basis; special-category and cross-border items are flagged; assumptions are labelled; nothing is presented as a finalised compliance record.

## Capability 2 — DPA clause review (Article 28)
**Goal.** Produce a redline issue list against the controller-processor requirements of Article 28 — a negotiation aid, not a signed-off contract opinion.
**Inputs.** The draft DPA, the parties' roles (controller/processor/sub-processor), the underlying services agreement, the organisation's standard positions if any.
**Method.**
1. Confirm the **roles** and direction of data flow; a mislabelled role changes every downstream obligation — flag if unclear.
2. Check for **documented instructions**: processor acts only on the controller's written instructions (Art. 28(3)(a)).
3. Check **confidentiality** commitments for personnel (Art. 28(3)(b)).
4. Check **security** obligations map to **Article 32** (Art. 28(3)(c)).
5. Check **sub-processor** authorisation, notice of changes, and flow-down of equivalent terms (Art. 28(3)(d), 28(2), 28(4)).
6. Check **assistance** clauses for data-subject rights (Chapter III) and for **breach notification** support (Art. 33/34) (Art. 28(3)(e), (f)).
7. Check **deletion or return** of data at end of service and **audit / inspection** rights (Art. 28(3)(g), (h)).
8. Check **international-transfer** terms and whether a valid mechanism is incorporated (see Capability 3).
**Output.** A clause-by-clause issue table: requirement, contract language, gap or risk, suggested redline, and severity.
**Quality bar (what the professional receives).** Each Article 28 sub-requirement is checked present/absent/weak; suggested redlines are drafts for counsel to accept, amend, or reject; liability, indemnity, and commercial trade-offs are flagged as decisions for the lawyer.

## Capability 3 — Cross-border transfer mechanism assessment
**Goal.** Identify the candidate lawful transfer mechanism and surface the risk questions a lawyer must resolve — not a transfer sign-off.
**Inputs.** Origin and destination of the data, importer identity and role, nature of the data, applicable sub-processors and onward transfers.
**Method.**
1. Confirm there is an actual **restricted transfer** (Chapter V, Arts. 44–49) and to which country.
2. Check for an **adequacy decision** (Art. 45) covering the destination; if present, note it and stop the mechanism search.
3. If no adequacy, identify the appropriate **safeguard (Art. 46)**: EU **Standard Contractual Clauses** (Commission Implementing Decision **2021/914**) with the correct module, or, for UK data, the **IDTA** or the **UK Addendum** to the EU SCCs.
4. For US importers, consider the **EU-US Data Privacy Framework (2023)** and whether the importer is certified for the relevant data types.
5. Where SCCs/IDTA are used, scope a **Transfer Impact Assessment** per **Schrems II (C-311/18)** and **EDPB Recommendations 01/2020**, covering the importer's legal environment and any government-access risk.
6. Identify candidate **supplementary measures** (encryption, pseudonymisation, contractual and organisational controls) and note their limits.
7. Consider whether any **Article 49 derogation** is even arguable, and flag that derogations are narrow and exceptional.
**Output.** A transfer register entry per flow: mechanism, module/version, TIA status, supplementary measures, and open legal questions.
**Quality bar (what the professional receives).** The mechanism is proposed with its legal source; the TIA is framed, not concluded; government-access and onward-transfer risks are surfaced as questions for the lawyer to decide.

## Worked example (illustrative)
*Illustrative only — hypothetical facts.* A company plans to route customer support tickets (names, emails, free-text that may include health complaints) through a US-based helpdesk SaaS with an India-based sub-processor. The first-pass draft would: (1) log the processing activity in the ROPA, flag the free-text as potential **Article 9** special-category data with no clear Art. 9(2) condition; (2) review the SaaS DPA and note it names the sub-processor but lacks change-notice and audit rights under Art. 28(3)(d),(h); (3) identify the transfer as restricted, propose EU SCCs Module Two plus a TIA under **Schrems II**, and flag that DPF certification and the India onward-transfer both need lawyer review. Every item is marked draft. The DPO decides.

## Guardrails & escalation
- **Escalate immediately to a lawyer/DPO:** any processing that may lack a lawful basis, any special-category or children's data, any personal-data breach, any DPIA-triggering high-risk processing (Art. 35), and any transfer where no valid mechanism is apparent.
- **Never** file a ROPA, sign a DPA, execute SCCs/IDTA, or represent a transfer as lawful on the strength of this draft alone; none of it is legal advice.
- **Flag uncertainty explicitly:** every assumption, missing fact, and unresolved legal question is listed in an "open questions for counsel" section rather than silently resolved.

## References & sources
- **EU GDPR** (Regulation (EU) 2016/679): Arts. 5, 6, 9, 10, 28, 30, 32, 33, 34, 35, and Chapter V (Arts. 44–49).
- **UK GDPR** and the Data Protection Act 2018.
- **ePrivacy Directive** 2002/58/EC (as amended) for cookies and electronic communications.
- **Standard Contractual Clauses:** Commission Implementing Decision (EU) **2021/914**.
- **EU-US Data Privacy Framework** (adequacy decision, 2023).
- **UK IDTA** and the **UK Addendum** to the EU SCCs (ICO).
- **Schrems II**, CJEU Case **C-311/18** (2020); **EDPB Recommendations 01/2020** on supplementary measures.
- EDPB and ICO guidance, current as of 2025. Verify all provisions against the latest official texts before reliance.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
