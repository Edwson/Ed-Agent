---
name: Hugging Face Model Ops
description: Choose, license-check, and deploy models from the Hugging Face Hub responsibly — read the model card before the weights, verify the licence before commercial use, and pick the right serving path (Transformers, Inference Endpoints, or TGI) for the load. For developers putting open models into production.
audience: developer · ML · ops
---

# Hugging Face Model Ops

## What this is

A working method for using the Hugging Face Hub — the model, dataset, and Spaces registry — like an engineer shipping to production rather than a browser downloading weights. The Hub makes it one line to pull a model; the discipline is in what you check before that line and how you serve it after. This skill is that discipline.

## What this is NOT

Not affiliated with Hugging Face and not tied to a specific library version — confirm current APIs against the docs. Not a claim that any model on the Hub is safe, licensed for your use, or accurate. The Hub is an open registry; due diligence is the user's, and this skill is how to do it.

## Method

1. **Read the model card before the weights.** Intended use, training data, known limitations and biases, evaluation numbers, and the licence. A model with a thin or missing card is a risk you're accepting blind — treat "no card" as a red flag, not a neutral.
2. **Verify the licence before commercial use.** Open-weights is not open-license: some models restrict commercial use, some carry acceptable-use policies, some inherit dataset licences. Check the exact terms and record the verdict on the artefact — the same "license checked before commercial use" gate the ComfyUI and generative-media skills enforce.
3. **Pin the exact revision.** Reference a commit hash / revision, not just `main` — a model that changes under you is a reproducibility bug and a supply-chain risk. Pin it like a dependency.
4. **Pick the serving path by load.** Local prototyping → Transformers / `pipeline`. Bursty or managed → Inference Endpoints. High-throughput generation → Text Generation Inference (TGI). Size the hardware against the model the way the Ollama VRAM method does — params × quant + KV overhead, verified on real hardware.
5. **Trust weights like untrusted code.** Prefer `safetensors` over pickle formats (arbitrary-code-execution risk on load). Loading a model is running someone's file — scan and sandbox anything you don't trust, especially community uploads.
6. **Keep private data private.** Datasets and inputs containing personal data get a residency and consent check before they touch a hosted endpoint. `private` visibility on the Hub is a setting, not a guarantee you configured it — verify it.
7. **Version datasets like models.** Pin dataset revisions too; "the eval moved" is a silent way for results to drift. Reproducibility is a property you build, not one you hope for.

## Quality bar

The model card is read (and its absence flagged) · the licence is verified and recorded before commercial use · the model revision is pinned, not floating · the serving path matches the load · `safetensors` is preferred and untrusted weights are sandboxed · private/personal data has a residency + consent check · datasets are versioned.

## Guardrails & escalation

A model's benchmark numbers are the author's claim, not a guarantee — validate on your own data before production, especially for anything high-stakes. Licence ambiguity is a legal question, not a judgment call to wave through — route it to counsel before shipping a product on top of it. Bias and safety limitations named in a card are commitments to test against, not disclaimers to skip; deploying a model into a sensitive use without that testing is the risk the card warned you about.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Hugging Face public concepts: model cards, licences, revisions, `safetensors`, Transformers, Inference Endpoints, TGI, datasets. Confirm current APIs and terms against Hugging Face's own documentation.
