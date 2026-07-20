---
name: canvas-web-animation
description: Use this skill when a project needs performant, meaningful web animation on the HTML5 Canvas 2D API — motion design that serves the content, an efficient rendering loop and particle work, and a strict performance and reduced-motion contract. It produces a motion plan and canvas patterns you can build against.
---

# Canvas Web Animation

> **What this is** — a repeatable, AI-assisted working method for designing and building web animation on the HTML5 Canvas 2D API: motion that carries meaning, an efficient rendering loop and particle/transform work, and a performance and accessibility contract. It draws on Ed's authorship of GalaxyJS.
> **What this is NOT** — not decoration for its own sake, and not a substitute for an accessibility review; motion must respect `prefers-reduced-motion` and must not harm accessibility or performance. Heavy animation has real battery and CPU cost and stays within budget. It is not a guarantee of 60fps on every device — that is verified, not assumed.

## When to use this
- A page needs canvas motion — particles, a generative background, a data-driven scene — that feels intentional rather than busy.
- An animation janks or drains battery and needs a real rendering loop and a performance budget instead of scattered timers.
- Motion is being added but there is no `prefers-reduced-motion` path, which has to exist before it ships.
- A particle or physics effect needs the right maths — closed-form motion where possible, numerical integration only where necessary.
- A retina/high-DPR display renders the canvas blurry or slow and needs correct device-pixel-ratio handling.

## Operating principle
Motion earns its place by serving meaning — guiding attention, showing state, or expressing brand — not by being present. The method treats `prefers-reduced-motion`, accessibility, and a frame-rate/CPU budget as non-negotiable contracts the effect must satisfy, and builds on one efficient `requestAnimationFrame` loop rather than competing timers. Prefer closed-form motion (a function of time) over per-frame numerical integration where the maths allows, because it is cheaper and cannot drift. AI accelerates exploration and the maths and code patterns; human judgement owns taste, whether an effect earns its cost, and the call to cut it.

## Capability 1 — Motion design
**Goal.** Design motion — easing, timing, and physical feel — that serves meaning and choreography, not decoration.
**Inputs.** The content and its intent, the brand or art direction, and where the motion sits in the experience.
**Method.**
1. State what each piece of motion is *for* — attention, state change, continuity, or brand — and cut anything that has no answer.
2. Choose easing and duration deliberately; keep timing consistent across the scene so motion reads as one system.
3. Where physical feel matters, tune spring or physics parameters (stiffness, damping) so motion settles naturally rather than mechanically.
4. Choreograph sequence and stagger so beats have order and room, instead of everything moving at once.
5. Define the reduced-motion version of the intent at design time — what the motion communicates when it cannot move.
**Output.** A motion design spec: purpose per element, easing/timing values, physical-feel parameters, choreography, and the reduced-motion intent.
**Quality bar.** Every motion has a stated purpose; timing is consistent across the scene; a meaningful reduced-motion version is defined, not bolted on.

## Capability 2 — Canvas engineering
**Goal.** Implement the scene efficiently on the Canvas 2D API: one rAF loop, particle systems, transforms, and layering.
**Inputs.** The motion spec, the target scene complexity (particle counts, layers), and the platforms it must run on.
**Method.**
1. Drive everything from a single `requestAnimationFrame` loop, advancing state by real elapsed time (delta) so motion is frame-rate independent.
2. Structure particle systems with pooled objects and typed arrays where counts are high, avoiding per-frame allocation that triggers garbage collection.
3. Use canvas transforms (`translate`/`rotate`/`scale` with `save`/`restore`) deliberately, and prefer closed-form position (a function of time) over accumulating numerical integration where the maths allows.
4. Layer with separate or offscreen canvases so static content is not redrawn every frame, compositing the moving layer on top.
5. Clear and redraw only what changes where possible, and keep the per-frame work bounded as the scene scales.
**Output.** A canvas implementation: the rAF loop with delta timing, the particle/transform structure, the layering strategy, and the closed-form-versus-numerical choices.
**Quality bar.** One rAF loop drives the scene; motion is delta-timed and frame-rate independent; no per-frame allocation in hot paths; static content is not needlessly redrawn.

## Capability 3 — Performance & accessibility
**Goal.** Hold a 60fps budget with correct DPR handling and bounded battery/CPU cost, behind a mandatory reduced-motion contract.
**Inputs.** The implementation, the device range it targets, and the accessibility requirements.
**Method.**
1. Gate all non-essential motion behind `prefers-reduced-motion: reduce` — provide a static or minimal path that still communicates, and never trap focus or block content.
2. Handle device pixel ratio explicitly: scale the canvas backing store by DPR and set CSS size separately, so retina displays are sharp without over-drawing.
3. Set a frame budget (~16ms for 60fps) and profile against it; cap particle counts and effect cost to what the target devices sustain.
4. Reduce cost when the scene is not visible or the tab is hidden — pause the loop on `visibilitychange` and via IntersectionObserver — to save battery and CPU.
5. Verify on lower-powered and mobile devices rather than only on a fast workstation, and degrade gracefully where the budget cannot be met.
**Output.** A performance/accessibility report: the reduced-motion contract, DPR handling, the frame budget with measurements, the visibility/battery strategy, and device-test results.
**Quality bar.** A complete non-degraded experience exists with motion reduced; DPR is handled so it is sharp and not over-drawn; the frame budget is measured on target devices; the loop pauses when hidden — and 60fps is verified, not assumed.

## Worked example (illustrative)
*Illustrative only.* A landing page wants a slowly drifting particle field behind the hero. Motion design first decides the field's job — quiet ambience and depth, not attention — so it stays low-contrast and slow. The implementation runs one `requestAnimationFrame` loop advancing particles by elapsed delta, with the positions computed as a closed-form function of time so they cannot drift and need no accumulated integration; particles are pooled to avoid per-frame allocation. The canvas backing store is scaled by `devicePixelRatio` with CSS size set separately, so it is crisp on retina without drawing four times the pixels. A `prefers-reduced-motion: reduce` query swaps the animation for a single static frame that keeps the visual intent. The loop pauses on `visibilitychange` and when the hero scrolls out of view, and the whole thing is profiled against a 16ms budget on a mid-range phone — where the particle count is capped to hold frame rate. GalaxyJS is the applied reference for this loop-and-pooling structure. None of this guarantees 60fps everywhere; it is measured, and cut where it cannot be met.

## Guardrails & escalation
- Never ship canvas motion without a `prefers-reduced-motion` path that still communicates the intent, and never let an effect trap focus or block content access.
- Stop and reconsider any effect that misses the frame budget, drains battery, or exists only as decoration — cut it or redesign it; spectacle does not override cost.
- Flag uncertainty: note where 60fps or battery impact is unverified on the target device range, and test before relying on it — do not assume the workstation result generalises.
- Escalate for an accessibility review and real low-powered-device performance testing before a heavy animated surface goes live.

## References & standards
- HTML5 Canvas 2D API (MDN) and `requestAnimationFrame`.
- Easing and spring/physics maths; closed-form motion versus numerical integration.
- `prefers-reduced-motion` and WCAG 2.2 — 2.3.3 Animation from Interactions and 2.2.2 Pause, Stop, Hide.
- Device pixel ratio (`devicePixelRatio`) for retina/high-DPR rendering.
- Core Web Vitals and a per-frame (~16ms/60fps) budget; `visibilitychange` and IntersectionObserver for cost control.
- Ed's GalaxyJS (https://github.com/Edwson/GalaxyJS) as an applied reference for the rendering loop and particle patterns.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
