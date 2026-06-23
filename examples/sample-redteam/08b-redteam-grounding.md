# 08b · Red team + claim grounding

_STRICT — critical findings + contradicted claims must be resolved at the red-team checkpoint._

## Red team — adversarial pass (mission: code)

**Findings:** 5  ·  critical 2 · high 0 · medium 3 · low 0

| Severity | Finding | Fix |
|---|---|---|
| CRITICAL | does what was declared a NON-GOAL — "Add a payment retry flow and migrate the payments schema" | remove it, or the human must consciously accept the trade-off |
| CRITICAL | does what was declared a NON-GOAL — "responsibility: migrate the payments schema" | remove it, or the human must consciously accept the trade-off |
| MEDIUM | placeholder / unfinished marker ×2 | replace ceremony with real payload |
| MEDIUM · L27 | unfinished marker in a shippable path | finish it, or move it out of the ship path |
| MEDIUM · L32 | unfinished marker in a shippable path | finish it, or move it out of the ship path |

> The red team checks against the loaded rule catalog + known anti-patterns. It is NOT exhaustive and does NOT replace a human expert (security / legal / compliance). Absence of a finding is not proof of safety.

## Claim grounding — three states (mission: code)

**Grounded 1 · Ungrounded 0 · Contradicted 1**  ·  grounded ratio 50%

| State | Claim | Traces to |
|---|---|---|
| Contradicted | Add a payment retry flow and migrate the payments schema | violates a non-goal |
| Grounded | responsibility: Add a payment retry flow | stated goal |

> Deterministic: Grounded = traces to a cited source or the stated goal; Ungrounded = a confident claim with nothing behind it; Contradicted = it violates a declared non-goal. The universal source is the captured intent, so this runs for any business — with or without a domain pack.
