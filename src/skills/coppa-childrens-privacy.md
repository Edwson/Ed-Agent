---
name: coppa-childrens-privacy
description: Use this skill when a product may collect personal information from children under 13 and you need a fast, structured first pass on COPPA — reviewing a consent flow, mapping data practices, or tracking enforcement. It organises the issues so qualified privacy counsel can act on them.
---

# COPPA Children's-Privacy Compliance

> **What this is** — a repeatable, AI-assisted working method for children's-privacy (COPPA) issue-spotting, producing a rigorous first-pass draft / issue map quickly, with a qualified privacy attorney kept in the loop.
> **What this is NOT** — **not legal advice, and not a compliance certification or safe-harbor determination. COPPA is enforced by the US FTC with significant penalties; qualified privacy counsel must review any assessment, consent flow, or data practice before launch.** Every output is a draft that requires professional review before it is relied on, filed, shipped, or represented to anyone. No professional-client relationship is created.

## When to use this
- A product, feature, or site may be directed to children under 13, or may have actual knowledge it collects data from them.
- A verifiable-parental-consent flow or direct notice needs a first review before launch.
- Third-party SDKs, analytics, or ad-tech are being added to a child-directed surface.
- A data-collection, retention, or deletion practice needs mapping against the COPPA Rule.
- You need a structured brief so privacy counsel's (billed) review starts further along.

## Operating principle
AI and structured checklists map the collection practices and consent flows against the COPPA Rule and draft the first version; qualified privacy counsel decides whether the product is compliant and whether the child-directed / actual-knowledge determination holds. The goal is a faster, better-organised starting point — never the final word, and never a compliance certification.

## Capability 1 — Consent-mechanism clause review
**Goal.** Review consent copy and flows against COPPA's notice and verifiable-parental-consent (VPC) requirements.
**Inputs.** The consent flow, direct-notice copy, privacy policy, the audience/positioning of the product, and the data collected.
**Method.**
1. Assess the threshold: is the site/service child-directed, or does the operator have actual knowledge it collects personal information from a child under 13? Flag the determination for counsel.
2. Check the direct-notice content required before collection (what is collected, how used, disclosure to third parties, parental rights).
3. Review the privacy-policy content requirements against the Rule.
4. Evaluate the VPC method chosen against recognised methods (e.g., signed consent form, credit/debit or online-payment confirmation, government-ID check, knowledge-based authentication, video/call verification) and whether it is reasonably calculated to ensure a parent is giving consent.
5. Check for the limited exceptions where prior VPC is not required and confirm they are applied correctly.
6. Produce an issue list on consent copy, timing (consent before collection), and record-keeping of consent.
**Output.** An annotated consent flow with an issue list keyed to Rule requirements, marked as counsel-review input.
**Quality bar.** No flow is pronounced "compliant"; the child-directed / actual-knowledge call is flagged, not decided; every VPC method is routed to counsel for confirmation.

## Capability 2 — Data-collection process comparison
**Goal.** Map what personal information is collected from children and compare current practice against the COPPA Rule.
**Inputs.** Data inventory, SDK/third-party list, retention and deletion practices, security measures, data flows.
**Method.**
1. Inventory personal information collected from children under 13 (including identifiers, geolocation, photos/audio/video, and persistent identifiers used for tracking).
2. Assess data minimisation — is collection limited to what is reasonably necessary for the activity?
3. Map third-party SDK / ad-tech data sharing and behavioural-advertising uses, which carry heightened requirements.
4. Review retention (no longer than reasonably necessary) and deletion practices, plus parental access/deletion rights.
5. Check confidentiality, security, and integrity measures for the collected data.
6. Produce a comparison table: practice → Rule requirement → gap/observation → open question for counsel.
**Output.** A gap-analysis table across collection, minimisation, sharing, retention, and security, marked as counsel-review input.
**Quality bar.** Gaps are described, not cured; SDK/ad-tech findings are flagged for legal and security review; nothing is asserted as adequate.

## Capability 3 — Enforcement-case update tracking
**Goal.** Keep an assessment current against FTC actions and Rule amendments.
**Inputs.** The current assessment, the surfaces in scope, and a monitoring cadence.
**Method.**
1. Identify the authoritative sources to monitor: the FTC's COPPA guidance, press releases, and enforcement actions/settlements.
2. Track amendments to the COPPA Rule — note that the FTC finalised amendments to the COPPA Rule in 2025; confirm effective/compliance dates and specifics with counsel.
3. For each relevant enforcement action or settlement, summarise the practice at issue and the takeaway, and map it to the product's own practices.
4. Note adjacent regimes where relevant (e.g., the EU GDPR "GDPR-K" child-consent provision, Article 8) so counsel can scope multi-jurisdiction exposure.
5. Maintain a change log so the assessment can be refreshed on a set cadence.
**Output.** A monitoring brief with a change log and mapped takeaways, marked as counsel-review input.
**Quality bar.** Regulatory changes are surfaced, not interpreted as final; all dates and applicability are confirmed with counsel.

## Worked example (illustrative)
*Illustrative and hypothetical.* A kids' learning app adds a new analytics SDK. The comparison inventories a persistent identifier now shared with the SDK vendor for measurement, flags that persistent identifiers used to track a child across services are personal information under the Rule, and notes the third-party sharing was not covered by the existing direct notice or VPC. It records these as gaps and open questions and routes them to privacy counsel before the SDK ships — it does *not* declare the app compliant or non-compliant.

## Guardrails & escalation
- Any consent flow, data practice, or assessment goes to qualified privacy counsel before launch.
- Never certify compliance, assert safe-harbor eligibility, or make the final child-directed / actual-knowledge determination — those are legal decisions.
- No output may be represented as legal advice or as a COPPA compliance certification.
- Uncertainty is flagged explicitly: undecided audience determination, unconfirmed SDK behaviour, and any assumption are marked as open questions for counsel.

## References & sources
- Children's Online Privacy Protection Act, 15 U.S.C. §§6501–6506.
- FTC COPPA Rule, 16 CFR Part 312 (note: the FTC finalised amendments to the COPPA Rule in 2025 — confirm effective/compliance dates with counsel).
- FTC COPPA guidance ("Complying with COPPA: Frequently Asked Questions") and published FTC enforcement actions and settlements.
- Recognised verifiable-parental-consent methods under the COPPA Rule.
- Adjacent regime: EU General Data Protection Regulation (GDPR), Article 8 (conditions for a child's consent — "GDPR-K").

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
