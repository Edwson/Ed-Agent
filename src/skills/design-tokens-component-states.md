---
name: Design Tokens & Component-State Expansion
description: Decomposes a design into named design tokens and fills in every component state a real system needs — default, hover, focus, active, disabled, loading, error, empty — with reviewed Tailwind code. A starting point for a design system that must still pass accessibility and match the project's real config, never colour alone for state. For designers, design-system engineers, and front-end.
audience: designer · design-system engineer · front-end
---

# Design Tokens & Component-State Expansion

## What this is

A method for turning a static design into a tokenized, fully-stated system. It extracts semantic tokens — colour, type, spacing, radius, elevation, motion — named by role rather than value, then enumerates every interaction and status state each component owns (default, hover, focus, active, disabled, loading, error, empty, selected) and expresses them as Tailwind classes tied back to those tokens, so one token change propagates instead of a hundred hand-edits.

## What this is NOT

Not a finished design system and not guaranteed-correct code. Generated tokens and Tailwind are a starting point that must be reviewed against the project's real design system and Tailwind config — invented token names or utilities that don't exist in the config are bugs, not features. Every state must pass accessibility (focus visible, sufficient contrast) before it ships, and no state may rely on colour alone (WCAG 1.4.1). This method drafts; it does not replace design-system ownership review.

## Method

1. **Read the design for roles, not values.** Name tokens by what they do — `surface`, `text-muted`, `border-focus` — not by hex; a token called `blue-500` is a value with a costume.
2. **Extract the token scales.** Pull colour, type, spacing, radius, elevation, and motion into ordered scales, and reconcile near-duplicates that are really one token.
3. **Verify against the real config.** Map every token and utility to the project's actual Tailwind config; anything not present is flagged for addition, not silently invented.
4. **Enumerate the states.** For each component, list the full state set it owns — default, hover, focus, active, disabled, loading, error, empty, selected — and don't skip the unglamorous ones.
5. **Encode state without colour alone.** Give every state a non-colour signal too — icon, weight, border, cursor, text — so it survives colour-blindness and greyscale (1.4.1).
6. **Make focus and disabled honest.** Focus must be visibly distinct and keyboard-reachable; disabled must look disabled and be programmatically disabled, not just dimmed.
7. **Wire loading and error to real behaviour.** Loading reserves layout to avoid shift; error states name the problem and the recovery, not a red glow.
8. **Hand off with the token map.** Deliver the token definitions, the per-state Tailwind, and a note on what needs config additions and accessibility review before merge.

## Quality bar

Tokens are named by role and mapped to the real Tailwind config · every component's full state set is filled, including disabled/loading/error/empty · no state relies on colour alone (1.4.1) · focus is visible and keyboard-reachable · disabled is programmatic, not just dimmed · loading reserves layout · output is labelled a starting point pending accessibility and design-system review.

## Guardrails & escalation

Generated tokens and Tailwind are a reviewed starting point, not shippable-by-default output — they must be checked against the project's real design system and Tailwind config, and any invented name or utility is a defect to fix. Every state passes an accessibility check (focus visible, contrast sufficient, never colour alone per 1.4.1) before merge. Design-system ownership decisions and formal accessibility conformance route to the system owner and a proper audit.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related within this kit: CDS token theming, CDS component author, and the accessibility & i18n guard (states must pass a11y).
