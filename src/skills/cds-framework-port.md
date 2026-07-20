---
name: CDS Framework Port
description: Port CDS components to React, SwiftUI, Compose, or Vue while keeping the contract — the register travels, the tokens map, the accessibility behaviour survives the translation.
audience: developer
---

# CDS Framework Port

## What this is

A porting method where the deliverable is contract parity, not visual resemblance. The vanilla implementation is the reference; the port must honor the same register, states, tokens, and accessibility behaviour in the target framework's idiom.

## What this is NOT

Not a transpiler and not pixel worship. Platform idiom wins where the anchor says so (a bottom sheet uses the platform's sheet; iOS gets SF Symbols) — the contract defines behaviour, not bytes.

## When to use

Building the React/SwiftUI/Compose implementation of catalogue components; auditing an existing codebase against the contracts; briefing an agent to generate framework code.

## Method

1. **Port the register first.** The four cells become the component's doc comment and its test plan. When-not-to violations become lint rules or type constraints where the framework allows.
2. **Map tokens to the platform's system** — CSS custom properties → Tailwind config / SwiftUI Color assets / Compose theme. One generated mapping, never hand-copied values (export from tokens.json).
3. **Translate behaviour, not markup.** Focus management, announcements, reduced-motion checks, 44px targets — each has a platform-native mechanism; the contract names the outcome, the port picks the idiom.
4. **Keep the states canonical.** Resting/active/disabled/error/loading, same names, same semantics — so a designer's spec and an agent's contract read identically across stacks.
5. **Test against the contract.** Each port ships conformance checks: token-only styling, reduced-motion behaviour, accessible names, bundle obligations (the React paywall still imports the cancellation flow).

## Quality bar

Register parity documented · zero hardcoded values that exist as tokens · platform a11y APIs used natively · bundles enforced at import/type level where possible.

## Guardrails & escalation

Where the platform's own guideline (HIG/Material) conflicts with the vanilla rendering, the anchor wins and the divergence is documented in the port's register — silence is drift.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
