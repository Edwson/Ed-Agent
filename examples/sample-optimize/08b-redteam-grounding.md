# 08b · Red team + claim grounding

_Report-only (default) — surfaced for your judgment; does not change the verdict. Run with --strict to gate on critical findings._

## Red team — adversarial pass (mission: optimize)

**Findings:** 3  ·  critical 0 · high 0 · medium 2 · low 1

| Severity | Finding | Fix |
|---|---|---|
| MEDIUM | claim with no number: "# Optimized version / 最適化版" | asserts a benefit with no number — attach ROI / cost / conversion / % or time saved |
| MEDIUM | claim with no number: "our world-class KYC onboarding will seamlessly leverage cutting-edge technology to improve the experience a…" | asserts a benefit with no number — attach ROI / cost / conversion / % or time saved |
| LOW | 17 AI-tone filler tell(s) — reads generic | cut the filler; say the specific thing |

> The red team checks against the loaded rule catalog + known anti-patterns. It is NOT exhaustive and does NOT replace a human expert (security / legal / compliance). Absence of a finding is not proof of safety.

## Claim grounding — three states (mission: optimize)

**Grounded 0 · Ungrounded 2 · Contradicted 0**  ·  grounded ratio 0%

| State | Claim | Traces to |
|---|---|---|
| Ungrounded | our world-class KYC onboarding will seamlessly leverage cutting-edge technology to improve the experience and unlock … | — |
| Ungrounded | **Cut the filler** — remove: `in conclusion`, `leverage`, `seamlessly`, `cutting-edge`, `unlock`, `world-class`. | — |

> Deterministic: Grounded = traces to a cited source or the stated goal; Ungrounded = a confident claim with nothing behind it; Contradicted = it violates a declared non-goal. The universal source is the captured intent, so this runs for any business — with or without a domain pack.
