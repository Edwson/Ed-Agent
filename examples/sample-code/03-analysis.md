# 03 · Analysis

## Sub-requirements
- Build a REST API for user onboarding
- auth
- rate limiting
- error handling

## Concerns to verify (Code / engineering)
- Input validation
- Auth & secrets
- Error handling

## Constraints
- Every claim must carry a source or a named instrument
- Output is reviewable, not a black box

## Assumptions (honest)
- Design / creative / legal judgment stays human — the squad drafts and checks.
- Research runs over an offline knowledge base; a live-retrieval hook is pluggable.
- Token counts are estimates (~4 chars/token), not billed figures.
