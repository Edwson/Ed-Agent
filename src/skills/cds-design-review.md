---
name: CDS Design Review
description: Review a mockup, prototype, or PR against the Consumer Design System's registers — a structured pass that cites entries instead of taste, for design crits and code review alike.
audience: designer · developer
---

# CDS Design Review

## What this is

A review method where feedback carries a citation. Instead of "this feels off", the output is "this violates the paywall entry's when-not-to cell — pre-selected annual masquerading as monthly pricing" with the entry URL attached.

## What this is NOT

Not a taste substitute. The registers cover contracts and misuse; composition, hierarchy, and brand judgment remain human work this skill structures but does not replace.

## When to use

Design crits, PR review of UI code, agency deliverable acceptance, and auditing AI-generated screens before merge.

## Method

1. **Inventory.** Map every element on the surface to an index id. Unmapped elements are either new components (route to cds-component-author) or ad-hoc drift — flag both.
2. **Register pass.** For each mapped component, check the four cells: is it inside its when-to-use? Does anything hit the when-not-to? Does the implementation honor the behaviour & accessibility contract?
3. **Bundle pass.** Selected components' obligations present? A paywall without its cancellation path fails review regardless of how good it looks.
4. **Hard-rule pass.** Walk hardRules[] — consent symmetry, truthful LIVE, all-in pricing, click-to-cancel, no dark patterns, human-signs on agent surfaces.
5. **Report.** Findings ordered by severity: BLOCK (hard rule or binding misuse) · FIX (contract miss) · CONSIDER (judgment). Every finding cites its entry.

## Quality bar

Zero unmapped elements unexplained · every finding carries an entry URL or rule id · blocks distinguished from opinions.

## Guardrails & escalation

A finding the team wants to waive escalates to the human owner with the citation — waivers are decisions, not silence. Never soften a hard-rule hit into a "consider".

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
