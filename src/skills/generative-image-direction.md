---
name: Generative Image Direction
description: Direct AI image generation like a photographer with a brief, not a slot-machine player — model-agnostic prompt structure, style systems for brand consistency, an iteration ladder, and the honesty rules that keep synthetic imagery legal in a consumer product.
audience: designer · marketing
---

# Generative Image Direction

## What this is

The art-direction layer for generative imagery, portable across models (diffusion or otherwise, hosted or local). Prompting is treated as a brief: subject, composition, lens, light, mood, and style references — written so results are directed, then refined, not gambled.

## What this is NOT

Not a promptbook of magic words, and not a claim that generation replaces photography — product truth, people, and moments that must be real stay real (see the honesty rules; they are the point of this skill, not an appendix).

## Method

1. **Write the brief before the prompt.** Purpose, placement, aspect ratio, brand mood, what must be recognisable. A prompt without a brief optimises for "cool", which is not a placement.
2. **Structure prompts in stable order** — subject → action/composition → environment → lighting → lens/medium → style refs — so iteration changes one clause, not the whole sentence. Keep negatives few and factual (artifacts, extra fingers), not superstitious.
3. **Build a style system, not one-off images.** A reusable style block (palette words, lighting recipe, lens, reference set) shared across the team is what makes ten images look like one brand. Store it next to the design tokens — it IS a token.
4. **Climb the iteration ladder:** thumbnails wide (cheap model, many seeds) → shortlist → refine composition (same seed, clause edits) → resolution pass → retouch. Never retouch before the composition is right — polish hides structural problems.
5. **QA like an editor:** hands, text, logos, physics, and background faces are where generations lie. Zoom before shipping.

## The honesty rules (binding)

- **Synthetic never masquerades as evidence.** A generated image may not depict "the actual product", real events, real testimonials, or real results — that's an FTC deception issue, not a style choice.
- **Disclose and credential.** Consumer-facing synthetic imagery carries a visible AI-made mark where context demands it, and C2PA credentials that survive export (EU AI Act Art 50; see the CDS ai-disclosure and ai-artifact entries).
- **No real-person likeness without documented consent.** No celebrities, no "in the style of" a living artist for commercial work without advice.
- **Sensitive accuracy stays real:** dietary/allergen images, medical depictions, safety-relevant product details — never generated.

## Quality bar

Brief precedes prompt · style block reused across the set · seeds and model noted per shipped asset · QA pass on hands/text/faces · disclosure and licensing resolved before publication, not after.

## Guardrails & escalation

Commercial-rights questions (model output licensing, style imitation, stock-model consent) escalate to counsel. This skill directs imagery; it does not clear it.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json + tokens.json · Agent brief: https://edwson.com/cds/AGENTS.md
