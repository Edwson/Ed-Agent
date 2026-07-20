---
name: Ant Design Adoption
description: Decide whether Ant Design fits a project before adopting it, then deploy it coherently — design tokens, ConfigProvider theming, component-vs-custom decisions, and adherence checks — so the whole system is used as intended rather than half-applied and drifting. For designers and React developers building data-dense enterprise and admin products.
audience: designer · React developer · enterprise/admin product team
---

# Ant Design Adoption

## What this is

A method for adopting Ant Design on purpose. Ant Design is a strong fit for data-dense enterprise and admin interfaces — rich tables, forms, and a large component set out of the box — but teams routinely undercut it by overriding styles ad hoc, ignoring the token system, and mixing in unstyled custom components until the product looks inconsistent. This skill decides whether Ant fits, then deploys it so tokens, theming (ConfigProvider / design tokens), and components form one coherent system that stays on-system as the app grows.

## What this is NOT

Not affiliated with or endorsed by Ant Group / the Ant Design team, and not a replacement for the official Ant Design documentation — it defers to the current version (Ant Design 5 uses a CSS-in-JS token system that differs from v4). Not a claim that Ant fits every project: consumer-facing, brand-distinctive, or mobile-first products are often better served elsewhere, and saying so is part of the method. Not a licence to override Ant's internals with `!important` until it's unrecognisable — that ad-hoc override is precisely the drift this prevents.

## Method

1. **Analyse fit first.** Ant Design suits internal tools, dashboards, and enterprise SaaS in React where breadth of components and data-table power matter more than a bespoke brand look. It fits less well for marketing sites, mobile-first consumer apps, or non-React stacks. Conclude honestly.
2. **Pin the version and theming approach.** Ant Design 5's token system and `ConfigProvider` theming differ from v4's Less variables — choose one and make it the source of truth.
3. **Establish the token/theme layer.** Global and component tokens (seed → map → alias) drive color, typography, spacing, and radius. Theme through `ConfigProvider`, not scattered overrides.
4. **Use components before building custom.** Ant's table, form, and data components are its reason for existing — reach for them first; build custom only for genuine gaps, and build it on the tokens so it belongs.
5. **Standardise the patterns Ant leaves open.** Form validation, table density, empty/error/loading states — decide these once as house patterns so every screen behaves the same.
6. **Set adherence checks.** A rule set (tokens/ConfigProvider only, approved components, no ad-hoc `!important` overrides) enforced in review or lint keeps drift out at input.
7. **Document allowed deviations.** Where the brand or product needs to depart from Ant, record it as a bounded, deliberate exception.
8. **Verify accessibility and performance.** Check contrast on your theme, keyboard and screen-reader behaviour on tables and modals, and that CSS-in-JS runtime cost is acceptable at your scale (consider extraction if not).

## Quality bar

Fit is assessed honestly before adoption · version and theming approach pinned as the source of truth · a seed/map/alias token layer drives theming via ConfigProvider, not scattered overrides · Ant components are used before custom, and custom is built on tokens · open patterns (validation, density, empty states) are standardised once · adherence is enforced in review or lint · deviations are documented · accessibility and CSS-in-JS performance are verified.

## Guardrails & escalation

An adoption method, not the documentation — verify components, tokens, and APIs against the current Ant Design version, which changes between majors. Accessibility and performance are required outputs; flag failing contrast, inaccessible custom components, or runtime CSS-in-JS cost that hurts at scale. If the fit analysis says Ant is the wrong system for the product, say so plainly rather than forcing a data-grid framework onto a consumer brand.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: the official Ant Design documentation (ant.design) — verify against the current version. Related: the Material Design and Apple HIG adoption skills, and CDS token-theming.
