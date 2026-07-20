---
name: financial-grade-accessibility-audit
description: Use this skill when auditing the accessibility of a financial-grade frontend (trading, payments, KYC, dashboards) against WCAG and preparing a structured findings record. It produces a rigorous first-pass audit and remediation draft for review by a qualified accessibility auditor.
---

# Financial-Grade Accessibility Audit

> **What this is** — a repeatable, AI-assisted working method for taking a request in financial-grade frontend accessibility auditing, often beyond one's own formal training, and producing a rigorous, well-structured first pass quickly, with a qualified professional kept in the loop.
> **What this is NOT** — not a certified accessibility conformance audit, VPAT, or a legal accessibility-compliance certification; commission a qualified accessibility auditor and real assistive-technology user testing before claiming conformance or legal compliance. Every output is a draft for review before it is relied on, published, or shipped.

## When to use this
- A regulated-finance interface (order ticket, payment flow, KYC form, data-dense dashboard) needs an accessibility pass before release.
- Design or engineering asks "is this component WCAG AA?" and needs a per-criterion answer with evidence.
- A design system component is being hardened and needs contrast, focus, ARIA, and reflow checks recorded.
- A procurement or legal team asks for an internal accessibility baseline ahead of a commissioned audit or VPAT.
- Standards have shifted (WCAG 2.2, EAA) and existing components need re-checking against new criteria.

## Operating principle
Accessibility is verified, not asserted. Every claim ties to a specific WCAG success criterion, a reproducible test, and captured evidence (screenshot, DOM snippet, or tool output). Automated tools catch roughly a third of issues, so machine checks are always paired with manual keyboard and screen-reader passes, and nothing is called "conformant" without independent review.

## Capability 1 — WCAG item-by-item audit
**Goal.** Produce a per-criterion pass/fail/not-applicable record against WCAG 2.1 and 2.2 Level AA across the four principles: perceivable, operable, understandable, robust.
**Inputs.** Target URL or component, viewport set (e.g. 320px, 768px, 1440px), browser + assistive-technology matrix, and the WCAG 2.2 AA success-criterion list.
**Method.**
1. Enumerate every AA criterion into a checklist keyed by number (e.g. 1.4.3, 2.4.7, 4.1.2), grouped by principle.
2. Run automated tools — axe-core, WAVE, and Lighthouse — and record raw findings; treat these as candidates, not verdicts.
3. Run a manual keyboard-only pass: tab order, focus visibility, no traps, all interactive elements reachable and operable.
4. Run screen-reader passes with at least two engines (e.g. NVDA on Windows, VoiceOver on macOS/iOS); confirm name, role, value, and state announcements.
5. Check reflow at 320px, text spacing, and zoom to 200% without loss of content or function.
6. For each criterion, assign a status and write a finding record: criterion number and name, severity (blocker / major / minor), evidence (screenshot or DOM snippet), and precise location (page, component, selector).
7. Flag criteria that require human judgement or user testing (e.g. meaningful sequence, error suggestion quality) as "needs review," not "pass."
**Output.** A criterion-indexed findings table with statuses, severities, evidence, and locations, plus a summary of blockers.
**Quality bar.** Every automated finding is manually confirmed; every "pass" on a testable criterion has captured evidence; no conformance language is used without the escalation note below.

## Capability 2 — Remediation code suggestions
**Goal.** Give engineers before/after code patterns that resolve the most common failures.
**Inputs.** Confirmed findings from Capability 1, the component's markup/CSS, and the design tokens in use.
**Method.**
1. Colour contrast (1.4.3 text, 1.4.11 non-text/UI components): compute ratios; propose token or value changes meeting 4.5:1 (normal text), 3:1 (large text and UI/graphical objects).
2. Visible focus (2.4.7): replace suppressed outlines with a visible focus indicator; account for focus-appearance guidance in 2.2.
3. Name, role, value & ARIA (4.1.2): correct roles, accessible names, and state attributes; prefer native semantics before ARIA; validate against WAI-ARIA 1.2 authoring patterns.
4. Form labels & error identification (3.3.1 error identification, 3.3.2 labels or instructions): associate labels, describe required formats, and expose errors programmatically.
5. Reflow (1.4.10): remove fixed widths and horizontal scrolling at 320px; use responsive layout.
6. Target size (2.5.8, new in WCAG 2.2, AA): ensure interactive targets meet the minimum size or spacing exception.
7. Use-of-colour double-encoding (1.4.1): pair colour with a second cue (icon, shape such as ▲▼, text) and keep a 3:1 non-text contrast where colour distinguishes state.
**Output.** A remediation list, each item with the criterion, a before snippet, an after snippet, and a one-line rationale.
**Quality bar.** Suggestions are minimal, use native semantics first, and are labelled as drafts for an engineer to implement and re-test.

## Capability 3 — Standards-evolution tracking
**Goal.** Keep audits current as accessibility standards and law evolve.
**Inputs.** The organisation's target conformance level and applicable jurisdictions.
**Method.**
1. Track WCAG 2.2 (W3C Recommendation, 2023) additions over 2.1 — including 2.4.11 focus not obscured, 2.5.7 dragging movements, 2.5.8 target size, 3.3.7 redundant entry, 3.3.8 accessible authentication — and note which apply at AA.
2. Monitor the WCAG 3.0 Working Draft as a direction signal only; do not audit against it as if normative.
3. Map jurisdiction requirements: EN 301 549 (EU harmonised standard, references WCAG), ADA and Section 508 (US, references WCAG 2.0 AA), and the European Accessibility Act (EAA), whose requirements apply from 28 June 2025.
4. Record which criteria are newly in scope for the product's markets and re-run the relevant Capability 1 checks.
5. Maintain a dated changelog of standard versions the audit was performed against.
**Output.** A short standards-scope note stating the WCAG version, level, and jurisdictional requirements the audit covered, with a re-check list.
**Quality bar.** The version and date of every referenced standard are stated; direction-only drafts (WCAG 3.0) are never presented as conformance targets.

## Worked example (illustrative)
*The following is an illustrative walkthrough, not a report on a real system.* An order-ticket component is submitted for review. The Capability 1 pass finds three issues: the sell/buy state is distinguished by colour alone (1.4.1), the quantity input has no programmatic label (3.3.2), and the focus ring is removed on the confirm button (2.4.7). Automated tools flagged the label; the colour-only and focus issues surfaced in the manual keyboard and screen-reader passes. Capability 2 proposes: adding a ▲/▼ direction glyph plus text alongside colour, associating a `<label>` with the input, and restoring a 3:1-contrast focus indicator. Each fix ships with a before/after snippet marked "draft — implement and re-test." Capability 3 notes the product ships in the EU, so target size (2.5.8) and EAA applicability from June 2025 are added to the re-check list. The result is a findings table, a remediation list, and a scope note — all labelled for review before any conformance claim.

## Guardrails & escalation
- STOP and escalate to a qualified accessibility auditor before any conformance statement, VPAT, or legal-compliance claim; this method produces a baseline, not certification.
- Never publish or ship "WCAG AA conformant" language on the strength of this audit alone; automated tools and self-run screen-reader passes do not replace testing with real assistive-technology users.
- Uncertainty is flagged explicitly: criteria needing human judgement are marked "needs review," and coverage gaps (untested pages, engines, or user groups) are listed rather than omitted.

## References & standards
- W3C WCAG 2.1 (Recommendation, 2018) and WCAG 2.2 (Recommendation, 2023), Level AA success criteria.
- W3C WAI-ARIA 1.2 and the ARIA Authoring Practices Guide.
- EN 301 549 (EU harmonised accessibility standard).
- Section 508 of the US Rehabilitation Act (references WCAG 2.0 AA) and ADA web-accessibility expectations.
- European Accessibility Act (Directive (EU) 2019/882), requirements applying from 28 June 2025.
- WCAG 3.0 Working Draft — direction-only, not a conformance target.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
