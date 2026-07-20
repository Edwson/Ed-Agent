---
name: CDS Component Author
description: Add a new component to the Consumer Design System the way the existing 142 were built — four-cell register first, tokens only, delegated events, reduced-motion contract, and a platform anchor it answers to.
audience: designer · developer
---

# CDS Component Author

## What this is

The authoring method behind every entry in the catalogue. A CDS component is a contract with a rendering attached — this skill produces both, in the right order.

## What this is NOT

Not a scaffold generator for arbitrary UI. A component that can't state when it should NOT be used isn't finished — it's decoration waiting to be misused.

## When to use

The catalogue has a real gap (checked against all 12 domains and the search), and the pattern will be used more than once.

## Method

1. **Write the register before the markup.** Four cells: when to use · when not to (name the misuse — this cell is binding) · behaviour & accessibility contract (focus, labels, target sizes, announcements, reduced motion) · platform anchor (the public guideline it answers to: HIG, Material 3, WCAG 2.2, store policy, GDPR, COPPA, FTC).
2. **Design the states.** Resting, active, disabled, error, loading — each in both themes, from tokens only. If a state needs a color that doesn't exist, that's a token proposal (see cds-token-theming), not a hex.
3. **Build vanilla-first.** Semantic HTML, scoped class prefix, delegated events, `prefers-reduced-motion` gated animation, 44px targets. Framework ports come after the contract exists (see cds-framework-port).
4. **Declare the obligations.** Does this component require another by contract (its bundle)? Does it create a hard-rule surface? Write it down — dependencies are data, not tribal knowledge.
5. **Regenerate the index.** components.json is generated from the catalogue, never hand-edited; a component isn't shipped until the index knows it.

## Quality bar

Register complete with a real anchor · both themes AA · keyboard path complete · reduced-motion verified · zero raw hex · index regenerated.

## Guardrails & escalation

If the honest when-not-to cell would forbid the requesting team's own use case, say so before building. Legal-surface components (consent, age gates, pricing) get counsel review before shipping.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
