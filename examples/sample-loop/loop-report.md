# Inner loop — produce → verify → (rollback) → repeat

**Exit:** PLATEAU — no further deterministic fix available — shipped the best version; the residual is escalated to a human
**Severity:** start 47 → best 18 → shipped 18  ·  4 iteration(s)  ·  trajectory 47 → 45 → 19 → 18

## Introspection log — WHAT · WHY · PATTERN (audit trail)

| Iter | Severity | Δ | Pattern | What changed / why |
|---:|---:|---:|---|---|
| 0 | 47 | 0 | baseline | fixed `hardcoded-secret` · worst fixable finding: hardcoded-secret (critical) — hardcoded secret literal |
| 1 | 45 | -2 | converging | fixed `empty-catch` · worst fixable finding: empty-catch (high) — empty catch — swallows the error it pretends to handle |
| 2 | 19 | -26 | converging | fixed `ai-tone-filler` · worst fixable finding: ai-tone-filler (low) — 8 AI-tone filler tell(s) — reads generic |
| 3 | 18 | -1 | converging | worst fixable finding: ai-tone-filler (low) — 7 AI-tone filler tell(s) — reads generic |

## Residual — escalated to a human (not faked)

Severity 18 · 0C/0H/1M/1L. The deterministic loop fixes what it can prove; the rest is surfaced, never silently "resolved":

- **MEDIUM** claim with no number: "leverage cutting-edge synergy to deliver a robust, enterprise-grade retry flow" → asserts a benefit with no number — attach ROI / cost / conversion / % or time saved
- **LOW** 7 AI-tone filler tell(s) — reads generic → cut the filler; say the specific thing

> The producer is pluggable: in-harness it is a deterministic remediator (monotone — it converges to a floor). Wire a host LLM as the producer and the overshoot-rollback guard above is what keeps it honest. The verifier, rollback, iron-laws and budget are deterministic ~0-token control.

