---
name: CDS Token & Theming
description: Extend, re-brand, or add themes to the token layer without breaking its contracts — light/dark in lock-step, AA on every pairing, semantic names, components never touching raw hex.
audience: developer · designer
---

# CDS Token & Theming

## What this is

The safe-change method for the layer everything else stands on. Tokens are the API between brand and components; this skill changes the values without breaking the API.

## What this is NOT

Not a rebrand of component behaviour. If a theme change requires a component to behave differently, that's a register change with its own review — color never smuggles behaviour.

## When to use

White-labelling, brand refreshes, adding a theme (high-contrast, dim), extending the palette for a new domain.

## Method

1. **Change values, never names.** Components reference `--accent`, `--text1`, `--surface2` — semantic roles. A rebrand edits `tokens.json` values; renames are breaking changes with a deprecation path.
2. **Themes move in lock-step.** Every color token exists in every theme; adding one means adding it everywhere, same key. The test is mechanical: light and dark key sets are identical.
3. **Contrast is part of the token.** Every text-role token holds ≥4.5:1 on its surface tokens, per theme, verified before merge — a brand color that can't pass becomes an accent-soft/decorative role, not a text role.
4. **Derived tokens derive.** Soft variants, glass, scrims compute from their base where possible so a rebrand is one edit, not forty.
5. **Version and regenerate.** Bump the tokens version, regenerate the machine layer, and let consumers diff — the sync story only works if versions are honest.

## Quality bar

Zero raw hex in any component · identical key sets across themes · AA matrix green in every theme · one-edit rebrand for the primary accent.

## Guardrails & escalation

Semantic color meanings (red = destructive/error) never rebrand. Accessibility-motivated themes (high-contrast) follow the platform's semantics, not brand preference.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
