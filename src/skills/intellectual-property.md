---
name: intellectual-property
description: Use this skill when you need a fast, rigorous first pass on a patent, trademark, or copyright question — capturing an invention, scanning trademark risk, or reviewing a licensing clause. It organises the issues so a qualified IP attorney can act on them.
---

# Intellectual Property (Patent, Trademark, Copyright)

> **What this is** — a repeatable, AI-assisted working method for intellectual-property issue-spotting, producing a rigorous first-pass draft / issue map quickly, with a qualified IP attorney kept in the loop.
> **What this is NOT** — **not legal advice, and not a clearance, freedom-to-operate, patentability, validity, or infringement opinion. Only a qualified IP attorney can provide those. Searches are never exhaustive; professional review is required before filing, licensing, relying, or representing rights.** Every output is a draft that requires professional review before it is relied on, filed, shipped, or represented to anyone. No professional-client relationship is created.

## When to use this
- An invention or feature needs to be captured before it is publicly disclosed or shipped.
- A product, brand, or campaign name needs a preliminary trademark-risk read before adoption.
- A licensing, assignment, or open-source clause needs a first review before signature.
- A team asks "can we use / can we protect this?" and needs the issues organised for counsel.
- You need a structured brief to hand an attorney so their (billed) time starts further along.

## Operating principle
AI and structured checklists map the issues and draft the first version; a qualified IP attorney decides what is protectable, clear to use, or enforceable. The goal is a faster, better-organised starting point for counsel — never the final word, and never a substitute for a legal opinion.

## Capability 1 — Patent application strategy
**Goal.** Capture an invention and organise a strategy brief an attorney can draft from.
**Inputs.** Invention description, prior public disclosures and dates, known related products/publications, target markets, commercial timeline.
**Method.**
1. Capture the invention: problem solved, core inventive concept, and each distinguishing element.
2. Flag any public disclosure, sale, or offer for sale and its date (bears on grace periods and priority — for counsel to assess).
3. Draft a provisional-vs-non-provisional timing note: what a provisional secures (a priority date), the 12-month clock to a non-provisional, and what is still undecided.
4. Sketch claim-scope strategy — candidate independent claims (broad) and dependent claims (narrowing fallbacks) — as *discussion drafts only*, explicitly for attorney rewriting.
5. Assemble a specification and drawings checklist (written description, enablement, best mode considerations, figure list).
6. Note PCT / national-phase and priority-date considerations for the target markets and the relevant deadlines to confirm with counsel.
7. Compile an inventor and assignment list to verify.
**Output.** An invention-capture brief with a claim-strategy sketch, timing note, and figures/spec checklist, marked as attorney-draft input.
**Quality bar.** No element is asserted as novel or patentable; every claim draft is labelled a discussion draft; all dates are flagged for legal confirmation.

## Capability 2 — Trademark infringement risk scan
**Goal.** Produce a preliminary likelihood-of-confusion risk register for a proposed mark.
**Inputs.** Proposed mark(s), goods/services, target territories, industry, any known similar marks.
**Method.**
1. Classify the goods/services under the Nice Classification to scope the search.
2. Run a knock-out search for identical and near-identical marks in USPTO TESS and the WIPO Global Brand Database.
3. Expand to a fuller clearance pass: phonetic, visual, and connotation variants; and common-law / marketplace use (web, app stores, marketplaces, social handles).
4. Assess each hit against likelihood-of-confusion factors (the DuPont factors before the USPTO/TTAB; the Sleekcraft factors in the Ninth Circuit) — similarity of marks, relatedness of goods, channels, sophistication of buyers, evidence of actual confusion, intent, strength of the senior mark.
5. Build a risk register: mark, owner, class/goods, jurisdiction, factor summary, and a preliminary risk rating (with reasoning).
6. Note gaps — jurisdictions not searched, unregistered use hard to find, and that no search is exhaustive.
**Output.** A ranked trademark-risk register with a factor analysis per material hit and an explicit "not a clearance opinion" caveat.
**Quality bar.** Never states a mark "is clear" or "does not infringe"; ratings are preliminary; every conclusion is routed to counsel for a clearance opinion before adoption.

## Capability 3 — Copyright licensing clause review
**Goal.** Spot issues in a copyright grant / licensing or assignment clause for counsel to resolve.
**Inputs.** The draft clause or agreement, the works involved, the parties' intended use, and any upstream licenses (including open-source).
**Method.**
1. Identify grant scope: exclusive vs non-exclusive, permitted field of use, territory, term, and revocability.
2. Distinguish work-for-hire vs assignment vs license, and check whether a written assignment is present where ownership transfer is intended.
3. Flag moral-rights and attribution treatment where relevant to the jurisdiction and work type.
4. Check sublicensing, downstream distribution, modification/derivative rights, and warranty/indemnity for IP.
5. For any incorporated open-source, check license compatibility — permissive (MIT, Apache-2.0, BSD) vs copyleft (GPL family, LGPL, MPL) — using SPDX / OSI identifiers, and flag copyleft obligations and attribution/notice requirements.
6. Produce an issue list: ambiguities, missing terms, and conflicts between the clause and the intended use.
**Output.** An annotated clause with an issue list and questions for counsel, distinguishing drafting nits from substantive risks.
**Quality bar.** No clause is pronounced "safe" or "enforceable"; open-source obligations are flagged, not resolved; final interpretation is left to counsel.

## Worked example (illustrative)
*Illustrative and hypothetical.* A startup wants to launch a product called "Vertex Ledger." The scan classifies the goods (software, Nice Class 9; financial services, Class 36), runs TESS and the WIPO Global Brand Database, and surfaces a registered "Vertex" mark in Class 36 for financial software. A DuPont-factor note flags high mark similarity and closely related services as a material risk, rates it elevated, and recommends the team obtain a clearance opinion from counsel before adopting the name — it does *not* tell them the name is safe or unsafe to use.

## Guardrails & escalation
- Anything to be filed, signed, relied on, or represented to a third party goes to a qualified IP attorney first.
- Never characterise a mark as "clear," an invention as "patentable," or a clause as "enforceable" — those are legal opinions.
- No output may be represented as legal advice or as a clearance / FTO / patentability / validity / infringement opinion.
- Uncertainty is flagged explicitly: unsearched jurisdictions, undated disclosures, and any assumption are marked as open questions for counsel.

## References & sources
- Patents: Title 35 of the U.S. Code (35 U.S.C.); U.S. Patent and Trademark Office (USPTO) resources.
- Trademarks: the Lanham Act (15 U.S.C. §1051 et seq.); USPTO TESS (Trademark Electronic Search System); *In re E. I. du Pont* (DuPont) likelihood-of-confusion factors; *AMF Inc. v. Sleekcraft Boats* factors (9th Cir.).
- Copyright: Title 17 of the U.S. Code (17 U.S.C.).
- International & classification: WIPO Global Brand Database; the Nice Classification (WIPO); Patent Cooperation Treaty (PCT) national-phase framework.
- Open-source: SPDX license list and OSI-approved license identifiers.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
