---
name: FWA Award Analysis
description: Analyse award-winning work from The FWA (thefwa.com) — FWA of the Day and its higher tiers — rating design and build difficulty on a 1–5 star scale, inferring the tech behind the effects, reading why it was recognised, and pulling 3–5 competitor sites relevant to the project you're building. For designers and developers benchmarking cutting-edge interactive work. Companion to the Awwwards analysis.
audience: designer · front-end developer · creative technologist
---

# FWA Award Analysis

## What this is

A method for mining The FWA — the long-running showcase for cutting-edge digital and interactive work — as a reference and a build brief. The FWA skews more experimental and technical than most award galleries, so it's a strong source for "how did they *do* that." For a given FWA winner it rates design difficulty and build difficulty separately (★1–5, 5 = hardest), infers the technology, reads why it earned recognition, and — anchored to the user's project — surfaces 3–5 relevant competitor or peer sites.

## What this is NOT

Not affiliated with The FWA and not an official assessment — any difficulty rating is an informed estimate, labelled as such, and the tech read is an inference (view-source, network, library signatures) until verified. Not a licence to clone award-winning work — study it and build your own. FWA's emphasis is often technical spectacle; this skill deliberately checks that against usability and performance rather than rewarding wow alone.

## Method

1. **Rate design difficulty (★1–5).** 1 = clean and competent; 5 = original art direction and a bespoke interactive language. State it as an estimate of ambition/originality.
2. **Rate build difficulty (★1–5), separately.** FWA winners often live at the top of this scale — WebGL/shaders, generative and real-time graphics, audio-reactive work, physics, heavy performance engineering. Keep it distinct from the design rating; on FWA the build rating is frequently the higher of the two.
3. **Infer the stack, flag it as inferred.** Three.js / WebGPU, GSAP, custom GLSL, WebAudio, particle systems, engines — read the signatures and report as inference until confirmed.
4. **Read why it was recognised.** FWA rewards innovation and technical craft; name what's genuinely new here versus well-executed-but-familiar, and where the piece trades away accessibility or load time for the effect.
5. **Locate the signature technique.** Identify the one or two things that define it and roughly how they're achieved, so the takeaway is buildable knowledge.
6. **Anchor to the user's project.** Given what they're building, pull **3–5 relevant peer/competitor sites** — same technique, sector, or ambition — for an actionable benchmark, not a random highlight reel.
7. **Extract the transferable move.** Per site, the one principle or technique that transfers — not the artwork.
8. **Cost-check the spectacle.** Flag `prefers-reduced-motion`, keyboard, contrast, LCP and bundle cost — FWA-grade effects are exactly where these get sacrificed, so the user borrows the craft without the debt.

## Quality bar

Design and build difficulty are rated *separately* on ★1–5 and labelled as estimates · the stack is inferred and flagged until verified · the analysis names what's genuinely innovative versus familiar, and the trade-off · the signature technique is identified and roughly explained · 3–5 competitor sites are anchored to the user's real project · each carries a transferable move · accessibility/performance cost is flagged.

## Guardrails & escalation

Inspiration and analysis only — no cloning of a winner's distinctive work, no claim of affiliation with The FWA or the studio. Estimates are estimates; verify against the source or a prototype before any client-facing certainty. The accessibility and performance costs behind experimental spectacle are real and often severe — surface them so the ambition ships without excluding users or tanking performance.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: The FWA (thefwa.com) — FWA of the Day and higher tiers. Companion: the Awwwards Site Analysis skill. Verify winners and stacks against the source.
