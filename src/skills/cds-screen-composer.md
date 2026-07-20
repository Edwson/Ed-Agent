---
name: CDS Screen Composer
description: Compose a complete consumer screen from the Consumer Design System catalogue — selection, bundles, hard rules, tokens, sign-off — for designers and developers working from a product brief.
audience: designer · developer
---

# CDS Screen Composer

## What this is

A repeatable method for turning a product brief ("the upgrade screen", "checkout for a drop") into a screen assembled from the CDS catalogue: the right entries, their bundled obligations, the hard rules that apply, and the token slice that styles it.

## What this is NOT

Not a licence to invent components. If the screen needs something the index doesn't have, that's a component-authoring task (see cds-component-author) with its own register — not an ad-hoc div.

## When to use

New screens, redesigns, and any AI-assisted build where the agent should read contracts instead of guessing.

## Method

1. **Fetch the index** — `cds/components.json`. It carries the seven-step agentProtocol; follow it in order.
2. **Select by domain + summary.** List candidate entries; read each entry's four-cell register at its `url`. The when-not-to cell is binding — a component used inside its named misuse is a defect, not a style choice.
3. **Resolve bundles.** Check `bundles[]` for every selected id: paywall arrives owing a cancellation flow, UGC owes report & block, checkout owes all-in pricing and order tracking. Include obligations unprompted.
4. **Run the hard rules.** Walk `hardRules[]` against the assembled screen. A hit is a BLOCK with a citation — redesign the flow, never restyle the violation.
5. **Pull the token slice.** Only the groups the screen uses, never raw hex; both themes come with the slice, along with the spring curve and the reduced-motion contract.
6. **Sign off.** A human reviews the assembled screen against the brief and the registers. The model produces; the human signs.

## Quality bar

Every component on the screen traceable to an index id · zero raw hex · bundles satisfied · hard rules clean or escalated · both themes verified · reduced motion verified.

## Guardrails & escalation

Conflicts between the brief and a hard rule escalate to the human with the rule cited — the contract wins by default. Regulated content (children, money, health) escalates before build, not after.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
