---
name: AI Asset Integration
description: Take generated images and video into a real product pipeline — provenance, licensing, C2PA, naming and versioning, alt text, and the CDS surfaces (AI-made badges, artifact cards) that present synthetic media honestly.
audience: designer · developer · product
---

# AI Asset Integration

## What this is

The last mile between "we generated something great" and "it's in production, honestly". Generation is a supplier; this skill is goods-inwards: checking what arrived, papering it, and shipping it through the design system's own disclosure surfaces.

## What this is NOT

Not the generation method (see generative-image-direction / generative-video-direction / comfyui-pipeline-architect) and not legal clearance — it routes to counsel, it doesn't replace them.

## Method

1. **Provenance intake.** For every asset: model/pipeline, version, seed, prompt or workflow JSON, date, operator. No provenance, no production — an asset you can't regenerate is an asset you can't fix.
2. **License check at the source.** The model's output terms, every LoRA/checkpoint license in the chain, and reference-image rights. Record the verdict with the asset; "probably fine" is a finding for counsel, not a status.
3. **Credential and mark.** Embed C2PA content credentials at export; apply the visible AI-made mark where the surface demands it — in CDS, that's the ai-disclosure and ai-artifact components, already built for this.
4. **Name and version like code.** `hero-alpine_v3_seed4821.webp`; regenerations are new versions, never overwrites (the artifact-card rule: regret is a workflow). Store the recipe next to the asset.
5. **Write alt text as an author, not a generator.** Alt text describes what the image communicates in context — it is human judgment about meaning, not a caption model's guess.
6. **Optimise like any other asset.** Format, srcset, lazy-loading, CLS-reserved space — synthetic assets get zero performance exemptions.
7. **Retire honestly.** When an asset is pulled (rights, accuracy, taste), pull its whole version chain and note why — the trace matters when questions come later.

## Quality bar

100% of shipped assets carry provenance records · licenses recorded per asset · C2PA embedded and surviving the CDN · alt text human-written · no overwritten versions · disclosure surfaces used where context demands.

## Guardrails & escalation

Assets depicting people, competitor products, or regulated categories (health, finance, children) route to counsel before shipping. If a surface's honesty rules (truthful product depiction, real testimony) conflict with the asset, the rules win — regenerate or shoot it for real.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json + tokens.json · Agent brief: https://edwson.com/cds/AGENTS.md
