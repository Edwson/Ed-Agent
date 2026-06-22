# Ed_agents_Claude.md — Ed Agent working memory & I/O ledger

> Persistent memory for the Ed Agent orchestrator. The **Context memory** survives across
> runs; the **Run ledger** is append-only and quantifies estimated input/output per stage.
> Token counts are estimates (~4 chars/token), framed as DesignOps cost governance — not billed figures.

## Context memory

- Operator: Ed Chen — design / creative / legal judgment + human sign-off stay with the operator.
- Engine: the finance mission's build runs on the eds-mcp design system; other missions use skill engines.
- Conventions: every claim carries a source; modelled vs measured is labelled; human gates are never bypassed.
- Honesty: the squad ingests / analyses / researches / produces / reviews; the human holds the gates.

<!-- LAST-BRIEF -->
**Last brief — 2026-06-22**
- Requirement: KYC onboarding with EDD source of funds
- Detected: KYC / onboarding · Regulated finance / design · Australia
- Triggers: Customer due diligence (KYC); Enhanced due diligence (EDD)
- Research coverage: 100% (2 findings, 1 conflict(s) quarantined)
<!-- /LAST-BRIEF -->

## Preferences

_Recorded preferences the agent recalls and applies. Edit freely._

- prefer: tone: terse

## Run ledger

## Run 2026-06-22 · kyc-onboarding-with-edd-source-of-funds

- **Requirement:** KYC onboarding with EDD source of funds
- **Mission:** Regulated finance / design
- **Detected:** KYC / onboarding · Australia
- **Research:** 100% coverage · 1 conflict(s) quarantined
- **Gates:** ⏸ Plan / design approval (pending) · ⏸ Certification sign-off (pending)
- **Shippable:** no — human gate(s) pending

| Stage | Agent | In (est) | Out (est) | Artifact |
|---|---|---:|---:|---|
| intake | Ed Agent | 10 | 70 | 01-intake.md |
| context | Ed Agent | 140 | 155 | 02-context.md |
| analyze | Development | 10 | 160 | 03-analysis.md |
| research | Data | 16 | 352 | 04-research-brief.md |
| ledger | Ed Agent | 1 | 69 | 05-ledger-checkpoint.md |
| plan | Development | 10 | 134 | 06-plan.md |
| develop | Development | 9 | 43 | 07-build/ |
| qa | QA | 10 | 74 | 08-review.md |
| certify | Risk & Governance | 1 | 137 | 10-certification.md |
| **Total** | | **207** | **1,194** | est. tokens |

## Run 2026-06-22 · build-a-rest-api-with-auth-and-rate-limiting

- **Requirement:** Build a REST API with auth and rate limiting
- **Mission:** Code / engineering
- **Detected:** Code / engineering · —
- **Research:** 100% coverage · 0 conflict(s) quarantined
- **Gates:** ⏸ Plan / design approval (pending) · ⏸ Certification sign-off (pending)
- **Shippable:** no — human gate(s) pending

| Stage | Agent | In (est) | Out (est) | Artifact |
|---|---|---:|---:|---|
| intake | Ed Agent | 11 | 53 | 01-intake.md |
| context | Ed Agent | 206 | 221 | 02-context.md |
| analyze | Architect | 11 | 136 | 03-analysis.md |
| research | Security | 14 | 216 | 04-research-brief.md |
| ledger | Ed Agent | 1 | 69 | 05-ledger-checkpoint.md |
| plan | Architect | 11 | 184 | 06-plan.md |
| develop | Doc Engineer | 9 | 258 | 07-build/ |
| qa | Security | 11 | 169 | 08-review.md |
| certify | QA | 1 | 133 | 10-certification.md |
| **Total** | | **275** | **1,439** | est. tokens |

## Run 2026-06-22 · kyc-onboarding-with-edd-source-of-funds

- **Requirement:** KYC onboarding with EDD source of funds
- **Mission:** Regulated finance / design
- **Detected:** KYC / onboarding · Australia
- **Research:** 100% coverage · 1 conflict(s) quarantined
- **Gates:** ✓ Plan / design approval (by Ed Chen) · ✓ Certification sign-off (by Ed Chen)
- **Shippable:** yes — all gates cleared

| Stage | Agent | In (est) | Out (est) | Artifact |
|---|---|---:|---:|---|
| intake | Ed Agent | 10 | 70 | 01-intake.md |
| context | Ed Agent | 202 | 217 | 02-context.md |
| analyze | Development | 10 | 160 | 03-analysis.md |
| research | Data | 16 | 352 | 04-research-brief.md |
| ledger | Ed Agent | 1 | 69 | 05-ledger-checkpoint.md |
| plan | Development | 10 | 134 | 06-plan.md |
| develop | Development | 9 | 43 | 07-build/ |
| qa | QA | 10 | 74 | 08-review.md |
| certify | Risk & Governance | 1 | 117 | 10-certification.md |
| **Total** | | **269** | **1,236** | est. tokens |

