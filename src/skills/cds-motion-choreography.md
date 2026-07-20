---
name: CDS Motion Choreography
description: Apply the system's motion contract — one spring, three durations, self-terminating loops, reduced-motion as a contract — including the Text Animations domain's usage limits.
audience: designer · developer
---

# CDS Motion Choreography

## What this is

The method for deciding what moves, how long, and whether it may loop. CDS motion is spatial reasoning: it explains where things came from. This skill keeps it that way when briefs ask for "more delight".

## What this is NOT

Not an animation showcase generator. Motion that only decorates gets cut here, not polished.

## When to use

New surfaces, motion review, applying the Text Animations components, and pruning accumulated animation debt.

## Method

1. **One curve, three durations.** `--spring` everywhere; 160ms state feedback, 280ms local movement, 480ms overlays. A fourth duration is a design smell.
2. **Motion answers a question.** Where did this come from / where did it go / what did I just cause? If the answer is "nothing, it's fun", it must be one-shot, self-terminating, and out of reading paths.
3. **Text animation limits are binding** (each entry's register): entrances once per view, <700ms; loops self-stop (rotate ×3, wave ×3) or ship a visible pause (marquee, WCAG 2.2.2); count-up only to true figures; shine never loops.
4. **Reduced motion is a rendering mode, not a degradation.** Final states render instantly and completely; information never lives only in the animation.
5. **Budget check.** Filters and blurs cost frames — one glass layer per region, blur entrances word-level not per-character, canvas over DOM past ~40 moving nodes.

## Quality bar

Zero infinite loops without pause affordances · reduced-motion pass on every new animation · no layout shift from any entrance · 60fps on mid-range hardware or the effect is simplified.

## Guardrails & escalation

Requests for attention-grabbing motion on marketing surfaces get the honest framing: sustained movement near content is a DSA Art 25 pressure pattern — offer the one-shot alternative.

## References

- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (160 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
