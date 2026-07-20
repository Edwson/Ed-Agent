---
name: ComfyUI Pipeline Architect
description: Design ComfyUI node graphs like production pipelines — planned stages, pinned seeds and versions, VRAM budgets, reproducible workflow JSON — for image and video generation that a team can rerun, not just a lucky pull.
audience: designer · developer
---

# ComfyUI Pipeline Architect

## What this is

A method for building ComfyUI graphs that behave like pipelines: staged, reproducible, versioned, and explainable. ComfyUI exposes the whole diffusion stack as nodes — which is power, and also how you get a 90-node spaghetti graph nobody can rerun.

## What this is NOT

Not official ComfyUI documentation, not affiliated, and not a model recommendation service — checkpoints and custom nodes change monthly; the architecture discipline is what transfers.

## Method

1. **Plan the graph as five stages** before wiring: **Inputs** (checkpoints, LoRAs, source images) → **Conditioning** (prompts, ControlNet, IP-Adapter) → **Sampling** (sampler, scheduler, steps, CFG) → **Post** (upscale, face/detail passes, VAE decode) → **Output** (save with metadata). Group nodes by stage on the canvas; a stranger should read the flow left-to-right.
2. **Pin everything that makes a result a result.** Seed, checkpoint hash, LoRA versions, custom-node versions. "It looked better yesterday" is always an unpinned variable. Fixed seed for iteration, randomized seed only for exploration batches.
3. **Budget VRAM like memory on an embedded device.** Know the resolution ladder (base gen → hires fix → upscale), tile where needed, and batch at the largest size that doesn't swap — an OOM mid-batch costs more than smaller batches.
4. **Iterate one axis at a time.** Prompt frozen while tuning CFG; CFG frozen while comparing samplers; comparison grids (X/Y plots) over vibes. Save the grid with the parameters in the filename.
5. **Version the workflow JSON.** The graph file is source code: commit it, name it (`product-hero_v3.json`), and note its required custom nodes — a workflow that only exists on one machine is a bus-factor of one.
6. **Video is images with a consistency contract.** For AnimateDiff/video pipelines: lock the character/style references first, keep motion modest per pass, and expect temporal artifacts to be fixed by regeneration, not repair.

## Quality bar

Graph readable by stage · seeds and versions pinned · one-axis iteration with saved grids · workflow JSON committed with dependency notes · output filenames carry parameters · licenses of every checkpoint and LoRA checked before commercial use.

## Guardrails & escalation

Model and LoRA licenses vary wildly (research-only, no-commercial, no-derivatives) — verify before client work; when unclear, escalate to whoever owns the legal risk. No real-person likeness without documented consent; no watermark-removal or provenance-stripping pipelines. Outputs destined for a product carry disclosure downstream (see generative-image-direction and the CDS ai-disclosure entry).

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json + tokens.json · Agent brief: https://edwson.com/cds/AGENTS.md
