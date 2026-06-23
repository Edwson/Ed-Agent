# 03 · Analysis

## Sub-requirements
- Build a payment retry
- dunning flow for failed card charges

## Concerns to verify (Regulated finance / design)
- Regulated-finance baseline

## Constraints
- Jurisdiction: European Union (eu)
- Governing baseline: ISO 20022
- Every claim must carry a source or a named instrument
- Tokens-only styling + WCAG 2.1 AA (design-system contract)

## Assumptions (honest)
- Design / creative / legal judgment stays human — the squad drafts and checks.
- Research runs over an offline knowledge base; a live-retrieval hook is pluggable.
- Token counts are estimates (~4 chars/token), not billed figures.
