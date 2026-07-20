---
name: Awwwards Site Analysis
description: Analyse award-winning web design from Awwwards — Site of the Day, Site of the Month, Developer Award — rating design difficulty and build difficulty on a 1–5 star scale, inferring the tech stack, reading the jury criteria, and pulling 3–5 competitor sites relevant to the project you're building. For designers and front-end developers benchmarking ambition against what actually ships.
audience: designer · front-end developer
---

# Awwwards Site Analysis

## What this is

A method for turning Awwwards winners into a build brief. For a given site — a Site of the Day (SOTD), Site of the Month (SOTM), or Developer Award — it separates the two things people conflate: how hard the *design* is and how hard the *engineering* is, each on a 1–5 star scale (5 = hardest, 1 = simplest). It reads the jury's own criteria (Design, Usability, Creativity, Content), infers the tech behind the effects, and — anchored to the project you're actually building — surfaces 3–5 competitor sites worth studying.

## What this is NOT

Not affiliated with Awwwards and not an official score — the Design/Usability/Creativity/Content axes are Awwwards' public criteria, but any rating here is an informed estimate, labelled as such, not the jury's actual mark. The tech-stack read is an *inference* (from view-source, network waterfall, library signatures) until verified, and stated that way. Not a licence to clone a winner — analyse and learn, then build your own.

## Method

1. **Rate design difficulty (★1–5), honestly.** 1 = a clean, well-executed template-grade layout; 5 = original art direction, bespoke motion language, a visual system nobody's seen. Rate the *ambition and originality*, not just polish — and say it's an estimate.
2. **Rate build difficulty (★1–5), separately.** 1 = static + light JS; 5 = WebGL/shaders, physics, custom scroll-linked timelines, real-time data, heavy performance engineering. The two ratings often diverge — a stunning design can be simple to build, and vice versa; keeping them separate is the whole point.
3. **Infer the stack, then flag it as inferred.** View source, the network waterfall, and library fingerprints (Three.js, GSAP, Lenis, React/Next, WebGL) tell you a lot — report it as inference until confirmed, never as fact.
4. **Read against the jury criteria.** Awwwards scores Design, Usability, Creativity, and Content. Note which axis carried the win and where the site is weak (often Usability or performance under the spectacle) — an honest read names the trade-off, not just the wow.
5. **Locate the hard part.** One or two techniques usually define the site (a shader transition, a scroll-choreographed narrative). Name them, and roughly how they're done, so the analysis is buildable knowledge, not adjectives.
6. **Anchor to the user's project.** Given what they're building, pull **3–5 relevant competitor / peer sites** — same sector, same interaction ambition, or same technique — so the benchmark is actionable, not a random gallery.
7. **Extract the transferable move.** Per site, one "what to steal": the principle or technique that transfers to the user's project, not the pixels.
8. **Sanity-check the cost.** Flag where the winning effect trades away accessibility (`prefers-reduced-motion`, keyboard, contrast) or performance (LCP, bundle) — so the user copies the ambition without inheriting the debt.

## Quality bar

Design difficulty and build difficulty are rated *separately* on ★1–5 and labelled as estimates · the tech stack is inferred and flagged as inference until verified · the analysis maps to Awwwards' real criteria (Design/Usability/Creativity/Content) and names the trade-off · the hard technique is identified and roughly explained · 3–5 competitor sites are anchored to the user's actual project · each carries a transferable move · accessibility/performance cost is flagged.

## Guardrails & escalation

Analysis and inspiration only — do not clone a winner's distinctive design or claim affiliation with Awwwards or the studio. Ratings and stack inferences are estimates; where certainty matters (a client pitch, a feasibility commitment), verify against the real source or a prototype before stating them as fact. The accessibility and performance trade-offs behind award spectacle are real — flag them so an ambitious build doesn't ship an inaccessible or slow site chasing a star.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: Awwwards (awwwards.com) — SOTD / SOTM / Developer Award, and the public Design / Usability / Creativity / Content criteria. Related: the FWA Award Analysis skill. Verify winners and stacks against the source.
