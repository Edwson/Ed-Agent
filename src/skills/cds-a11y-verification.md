---
name: CDS Accessibility Verification
description: Verify a consumer surface against the accessibility contracts every CDS entry carries — WCAG 2.2 AA as the floor: target sizes, reduced motion, live regions, focus order, accessible authentication.
audience: designer · developer
---

# CDS Accessibility Verification

## What this is

A verification pass scoped to what consumer products actually get wrong: 44px targets, motion without consent, letter-soup screen-reader output from animated text, streaming into live regions, OTP fields that fight autofill, carousels that trap.

## What this is NOT

Not a substitute for testing with disabled users or a commissioned audit — it's the systematic pass that makes those sessions count, and it says so in its report.

## When to use

Every screen before merge; every animation before ship; regression after theme or token changes.

## Method

1. **Contract lookup.** Each component's behaviour & accessibility cell is the spec — verify against it, not against memory.
2. **Keyboard walk.** Complete every task pointer-free. Focus visible everywhere, order follows meaning, no traps (2.1.2, 2.4.3, 2.4.7).
3. **Motion pass.** Toggle `prefers-reduced-motion`: entrances render final state, loops stop, marquee parks as a scrollable row, nothing auto-plays (2.3.3, 2.2.2).
4. **Announcement pass.** Status changes announce once, politely; streaming regions stay `aria-live="off"` until completion; animated text exposes one sentence, never characters (4.1.3).
5. **Target + zoom pass.** 24px minimum spacing floor / 44px targets (2.5.8); 200% zoom reflows without loss (1.4.4, 1.4.10); both themes hold 4.5:1 (1.4.3).

## Quality bar

Findings cite the SC number and the component's own contract cell · pass/fail per state, not per component · both themes tested.

## Guardrails & escalation

Never report "compliant" — report what was verified, how, and what wasn't. Assistive-technology user testing and formal conformance audits are recommended, not replaced.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
