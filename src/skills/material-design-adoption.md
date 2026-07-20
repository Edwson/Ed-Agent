---
name: Material Design Adoption
description: Decide whether Material Design (Material 3 / Material You) fits a project before adopting it, then deploy it coherently so the whole system is used as intended rather than half-applied and drifting. Covers fit analysis, token and theme setup, component-vs-custom decisions, and adherence checks that keep an app on-system. For designers and developers building Android, Flutter, or web products on Material.
audience: designer · front-end developer · Android/Flutter developer
---

# Material Design Adoption

## What this is

A method for adopting Material Design deliberately. Most Material projects fail not because the system is wrong but because it's half-applied — a few components dropped in, tokens ignored, elevation and motion improvised — until the app looks neither like Material nor like a coherent custom system. This skill decides *whether* Material fits, then deploys it so the token system, components, elevation, typography scale, and motion are used as one system, and stays on-system as the product grows.

## What this is NOT

Not affiliated with or endorsed by Google, and not a substitute for the official Material Design guidelines — it points to the current spec and defers to it on specifics, because the system evolves (Material 3 / Material You differ from Material 2). Not a mandate that every project should use Material: part of the method is honestly concluding it doesn't fit. Not a licence to reskin Material into something unrecognisable and still call it Material — that's the drift this skill exists to prevent.

## Method

1. **Analyse fit first.** Material suits Android-first products, Flutter apps, and teams wanting a complete, documented system with dynamic theming. It fits less well where a brand needs a distinctive non-Google visual identity or where the target is iOS-primary (where users expect HIG conventions). State the fit honestly before adopting.
2. **Choose the version and platform binding.** Material 3 vs 2, and the implementation (Android Compose, Flutter, Material Web) — each has different token names and component coverage. Pick one source of truth.
3. **Establish the token layer.** Color roles (primary/secondary/surface/…), the type scale, shape, and elevation as tokens — including dynamic color if used. Components reference tokens; nothing hard-codes a hex.
4. **Map components before building custom.** For each UI need, use the Material component if one exists; only build custom when the system genuinely has no answer, and when you do, build it *on the tokens* so it belongs.
5. **Respect the system's rules.** Elevation, state layers, touch targets, motion easing and duration are part of Material — improvising them is the most common way an app stops looking like itself.
6. **Set adherence checks.** A short rule set (tokens only, approved components, correct elevation/motion) enforced in review or lint, so drift is caught at input, not discovered in an audit.
7. **Document the deviations you do allow.** Where the brand requires departing from Material, record it as a deliberate, bounded exception — not a silent one that multiplies.
8. **Verify accessibility and performance.** Material's defaults help (contrast, target size, focus) but don't guarantee — check WCAG contrast on your theme, keyboard/screen-reader behaviour, and that dynamic theming doesn't cost a frame.

## Quality bar

Fit is assessed honestly before adoption · one version and platform binding chosen as the source of truth · a token layer (color roles, type, shape, elevation) is established and referenced, never hard-coded · Material components are used before custom, and custom is built on tokens · elevation/state/motion rules are respected · adherence is enforced in review or lint · deliberate deviations are documented · accessibility and performance are verified on the real theme.

## Guardrails & escalation

An adoption method, not the specification — where behaviour matters, defer to and verify against the current official Material Design guidelines, which change. Accessibility and performance are non-negotiable outputs, not afterthoughts; flag any theme that fails contrast or any animation that drops frames. If the fit analysis concludes Material is wrong for the project, say so — adopting a design system that fights the product is worse than not having one.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: the official Material Design guidelines (m3.material.io) — verify components, tokens, and rules against the current spec. Related: the Ant Design and Apple HIG adoption skills, and CDS token-theming.
