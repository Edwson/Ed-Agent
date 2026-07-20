---
name: NVIDIA CUDA GPU Optimization
description: Read the user's actual NVIDIA hardware and configure GPU rendering and VRAM budgets that fit it — batch sizes, precision, memory headroom, and the right CUDA/driver assumptions — so a workload runs fully on the GPU instead of OOM-ing or silently spilling to the CPU. For developers running CUDA rendering or ML on NVIDIA GPUs.
audience: developer · ML · graphics
---

# NVIDIA CUDA GPU Optimization

## What this is

A method for tuning a GPU workload to the card in front of you. Whether it's rendering, inference, or training, the failure modes are the same — out-of-memory crashes, or worse, a silent fall-back to CPU that makes everything crawl. This skill reads the real hardware (VRAM, compute capability, driver/CUDA version) and sizes the configuration — batch, precision, memory reservation — so the work fits on the GPU with headroom and runs at the GPU's speed, not the CPU's.

## What this is NOT

Not affiliated with NVIDIA and not a substitute for its docs or profiler — CUDA, driver, and library versions move, so confirm. The numbers here are **planning heuristics**; the ground truth is `nvidia-smi` and a real profiled run, not this skill's arithmetic. Not a promise that any workload fits any card — sometimes the honest answer is "this GPU can't run this at this size."

## Method

1. **Read the real hardware first.** `nvidia-smi` for total and *free* VRAM (other processes count), and the compute capability / driver / CUDA version. Everything downstream is sized against the *free* number minus headroom, never the sticker spec.
2. **Reserve headroom.** Leave ~10–15% VRAM free for fragmentation, the driver, and framebuffer growth. A config that fits at 99% will OOM the moment a batch varies.
3. **Match precision to the card and the task.** FP16 / BF16 (and TF32 on Ampere+) roughly halve memory and use Tensor Cores — big wins where the workload tolerates it. Confirm the GPU's compute capability actually supports the precision before assuming the speedup.
4. **Size the batch to the memory, then to throughput.** Start from what fits with headroom, then raise until VRAM or throughput plateaus. Gradient checkpointing / activation offload trade compute for memory when a bigger effective batch is worth it.
5. **Keep the pipeline fed.** GPU idle time from data loading is wasted silicon — overlap host→device transfers with compute (pinned memory, prefetch, enough loader workers). A starved GPU looks "slow" but is actually waiting.
6. **Confirm it's actually on the GPU.** Watch utilization and memory under load; if a render or model is quietly running on CPU or spilling, the fix is to step down size/precision until it's fully resident — not to accept the crawl.
7. **Profile before you optimize twice.** Use the profiler (Nsight / framework tools) to find the real bottleneck — memory-bound vs compute-bound vs transfer-bound — before changing more than one thing. Guesswork optimizes the wrong stage.
8. **Degrade gracefully across cards.** Detect the GPU at runtime and pick a config tier (VRAM band → batch/precision), so the same job runs on a laptop 6 GB card and a 48 GB workstation without a rewrite — smaller, slower, but correct on the small one.

## Quality bar

Config is sized from *free* VRAM with headroom, not the spec · precision matches the card's real compute capability · the workload is verified fully resident on the GPU via `nvidia-smi` · the data pipeline keeps the GPU fed · the bottleneck is profiled before re-optimizing · the same job degrades gracefully to a smaller card · when it genuinely doesn't fit, that is stated, not forced.

## Guardrails & escalation

Multi-tenant or shared GPUs get memory limits and MPS/MIG partitioning agreed with whoever owns the box — one job grabbing all VRAM is an outage for everyone else. Driver/CUDA upgrades on a production render or training host are change-managed, not ad-hoc, because a version mismatch can break every workload on the machine. When a target model or scene genuinely exceeds the hardware, escalate to a bigger GPU / multi-GPU / offload strategy rather than shipping a config that OOMs intermittently.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the Ollama Local Deployment skill (VRAM-first model sizing). Confirm current CUDA, driver, and library behaviour and exact memory against NVIDIA's own documentation and `nvidia-smi` on your hardware.
