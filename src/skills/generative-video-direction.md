---
name: Generative Video Direction
description: Direct AI video generation shot by shot — storyboard first, consistency locks, motion budgets, honest editing — plus the disclosure and platform rules that keep synthetic footage out of trouble in a consumer product.
audience: designer · marketing
---

# Generative Video Direction

## What this is

The direction method for generative video (text-to-video, image-to-video, or hybrid pipelines). Video multiplies every image-generation problem by time: consistency, physics, and honesty all get harder — so the method is a film method, not a prompt method.

## What this is NOT

Not a tool tutorial (models change quarterly) and not a shortcut around editing — generation feeds the edit; it doesn't replace it.

## Method

1. **Storyboard before generating.** Shots, durations, and the cut come first; each generated clip serves a board frame. Generating "some cool footage" and editing later is how budgets evaporate.
2. **One shot, one job.** Current models hold 2–8 coherent seconds — write shots that need exactly that. Long moves become multiple shots with a cut, exactly like real coverage.
3. **Lock consistency assets first.** Character/product reference images, a style block shared with your image pipeline, and image-to-video from approved stills where identity matters — t2v roulette is for mood, not for the protagonist.
4. **Budget motion honestly.** Slow pushes, drifts, and parallax succeed; complex articulation (hands, sports, crowds) fails — board around the model's physics, not against it.
5. **Cut to hide the seams.** Edit rhythm, sound design, and B-roll structure carry believability; a great cut of imperfect clips beats one long uncanny take.
6. **QA per frame at the boundaries** — first/last frames of each clip, faces in motion, text in scene — that's where time-artifacts live.

## The honesty rules (binding)

- **Never present synthetic footage as recorded reality** — not as "live" (the CDS live-badge rule applies in full), not as user testimony, not as product demo evidence. FTC deception doesn't care that the pixels were cheap.
- **Disclose**: visible marking where context demands it and C2PA credentials on export (EU AI Act Art 50); platform synthetic-media policies (stores, social networks) checked per destination.
- **No real-person likeness or voice without documented consent** — voice cloning of anyone real is out of scope without counsel.
- **News-adjacent and safety content stays real.** Full stop.

## Quality bar

Board precedes generation · consistency refs locked · shots ≤ the model's coherence window · seams reviewed at clip boundaries · disclosure resolved per destination platform · the edit stands without any single miracle clip.

## Guardrails & escalation

Anything depicting identifiable people, competitors' products, or regulated claims escalates before generation. Music and voice rights are separate clearances — the video method doesn't cover them.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json + tokens.json · Agent brief: https://edwson.com/cds/AGENTS.md
