---
name: Ollama Local Deployment & VRAM Model Advisor
description: Deploy Ollama locally with Docker and choose the right local model for the hardware you actually have — a VRAM-first sizing method that reads a GPU's memory budget and recommends the largest model and quantization that will run well, not the one that fits on paper. For developers running on-prem or offline AI.
audience: developer · ops · on-prem
---

# Ollama Local Deployment & VRAM Model Advisor

## What this is

A two-part method: (1) stand up Ollama — the local LLM runtime — in Docker so it is reproducible and isolated, and (2) recommend which model to actually pull, sized to the user's real VRAM. The second part is the point. "Which local model should I run?" has one honest answer, and it starts with how much GPU memory you have — not with which model is trending.

## What this is NOT

Not official Ollama documentation and not affiliated with Ollama. The VRAM figures below are **planning heuristics**, not guarantees — real usage depends on context length, KV-cache, the exact quant, and other GPU load. Always confirm with `ollama ps` and a real inference under your target context before committing. Not a claim that local beats cloud; it is the discipline for making local *work* when privacy, cost, or offline operation require it.

## Method

1. **Deploy Ollama in Docker, reproducibly.** GPU path: `docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama` (NVIDIA Container Toolkit installed). CPU-only path drops `--gpus`. The named volume persists pulled models across restarts; the port exposes the OpenAI-compatible API at `:11434`. Pin the image tag so a rebuild gets the same runtime.
2. **Read the real VRAM budget first.** `nvidia-smi` for total and *free* VRAM (other processes count). Reserve ~1–2 GB headroom for the desktop/OS and the KV-cache growth at your context length. Budget = free VRAM − headroom. Everything downstream is sized against this number, not the model's marketing.
3. **Size the model by params × bytes-per-weight.** Rough weight memory ≈ billions-of-params × bytes-per-param for the quant, plus ~15–25% runtime + KV overhead:
   - **Q4_K_M (~4.5 bit)** — the default sweet spot: ~0.6 GB per billion params.
   - **Q5_K_M** — a bit better quality: ~0.7 GB/B. **Q8_0** — near-lossless: ~1.1 GB/B. **FP16** — ~2 GB/B (rarely worth it locally).
   So a 7–8B model at Q4_K_M lands around **5–6 GB**; 13–14B ≈ **9–10 GB**; 32–34B ≈ **20–22 GB**; 70B ≈ **40–44 GB**.
4. **Recommend by VRAM tier (Q4_K_M unless noted):**
   - **≤ 4 GB / CPU-only** → 1–3B class (e.g. a 3B general model) or Q4 quantized small models; keep context modest.
   - **6–8 GB** → 7–8B class — the mainstream local tier; strong general + coding models fit here.
   - **10–12 GB** → 13–14B, or an 8B at Q6/Q8 for higher fidelity.
   - **16 GB** → up to ~20B comfortably; larger context on 8–14B.
   - **24 GB** (e.g. a single high-end consumer card) → 32–34B class at Q4, the best single-GPU quality tier.
   - **48 GB+ / multi-GPU** → 70B at Q4, or smaller models at Q8/FP16 for maximum quality.
5. **Account for context, not just weights.** KV-cache grows with context length and batch — a 32K-context run can add several GB. If a model fits at 4K but you need 32K, step down a size. Set `num_ctx` deliberately; don't default to the max and then wonder why it swapped to CPU.
6. **Verify the fit, don't trust the table.** After `ollama pull`, run a real prompt at your target context and check `ollama ps` — if it shows CPU offload (`100% GPU` vs a split), the model is spilling to system RAM and will be slow. Step down a quant or a size until it is fully on GPU, or accept the slower split knowingly.
7. **Expose it safely.** Bind to `127.0.0.1` for local-only use; put it behind a reverse proxy with auth if other machines need it. The API has no built-in auth — an open `:11434` on a shared network is an unauthenticated model endpoint.

## Quality bar

VRAM is read from real free memory, not total · headroom reserved for OS + KV-cache · the recommended model is verified fully on-GPU at the target context via `ollama ps` · the Docker deployment is pinned and uses a persistent volume · the endpoint is not exposed unauthenticated · quant/size trade-off is stated, not hidden.

## Guardrails & escalation

Local deployment is chosen for a reason — usually data that must not leave the network. If that is the case, confirm the whole path stays local (no telemetry, no cloud fallback) before the demo. Model licences vary (some open-weight models restrict commercial use) — check the licence before shipping a product on top of one. A frozen local model goes stale: regulated or fast-moving domains need a refresh plan, which is exactly the trade-off the WizAgents "living agent" and CDS memory patterns make explicit.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Ollama public concepts: Docker image, `/root/.ollama` volume, `:11434` OpenAI-compatible API, `ollama pull/run/ps`, `num_ctx`, GGUF quantizations (Q4_K_M etc.). Confirm current behaviour and exact VRAM against your own hardware.
