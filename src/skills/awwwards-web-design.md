---
name: awwwards-web-design
description: Use this skill when a request calls for high-craft web design — strong visual direction, scroll-driven motion, and interaction polish — for a marketing site, landing page, portfolio, or product surface. It produces an art-directed first pass that stays accessible and within a performance budget.
---

# Awwwards-Grade Web Design

> **What this is** — a repeatable, AI-assisted working method for taking a request in high-craft front-end design and producing a rigorous, well-structured first pass quickly: a visual direction, a motion/scroll narrative, and interaction detail — the kind of craft awards juries reward.
> **What this is NOT** — not a promise of an award; craft, motion, and performance still serve the product's goal, accessibility, and load budget. Spectacle that harms usability or performance is a failure, not a win. Treat outputs as drafts to validate before they are relied on or shipped.

## When to use this
- A marketing site, launch page, or portfolio needs to look and feel exceptional, not templated.
- A brand refresh needs a visual direction — type, colour, grid, density — before build.
- A page needs scroll-linked storytelling: staged reveals, a narrative that unfolds as you scroll.
- Interaction detail is flat and needs micro-interactions, considered states, and tactile feedback.
- A design is visually strong but fails accessibility or performance and needs to be reconciled without losing craft.

## Operating principle
Craft is judged on how well form serves intent: a distinctive visual direction, motion that carries meaning, and interaction detail that rewards attention — delivered without breaking accessibility or the performance budget. The method treats accessibility (reduced-motion, focus, keyboard) and performance (frame rate, load) as non-negotiable constraints that the aesthetic must satisfy, not obstacles to route around. AI accelerates exploration, reference-boarding, and code patterns; human judgement owns taste, originality, and the call on whether an effect earns its cost.

## Capability 1 — Visual direction & typography
**Goal.** Establish a distinctive, coherent visual system: type, colour, grid, and editorial density.
**Inputs.** Brand assets and voice, content and its hierarchy, audience and context, and any constraints (existing tokens, tech stack).
**Method.**
1. Define an art direction in one sentence — the feeling and reference world the page lives in.
2. Build a type scale and choose a pairing (display + text), setting weights, tracking, and line length for readability.
3. Establish a grid and a vertical rhythm so spacing and alignment feel intentional at every breakpoint.
4. Define a colour system with sufficient contrast, including states and dark/light where relevant.
5. Set editorial density — where the page breathes and where it packs information — to match the content's job.
6. Reference-board for direction and mood without copying the layout, motion, or identity of existing work.
**Output.** A visual direction: art-direction statement, type scale and pairing, grid and spacing rules, colour system, and density guidance, with reference notes.
**Quality bar.** Colour choices meet contrast requirements; type is legible at real line lengths; references inform direction rather than reproduce any specific existing site or artist.

## Capability 2 — Motion & scroll storytelling
**Goal.** Design a scroll-driven narrative with staged reveals and disciplined timing.
**Inputs.** The visual direction, the content sequence, and the target platforms/devices.
**Method.**
1. Storyboard the scroll: what the reader should notice, in what order, as the page advances.
2. Stage reveals so elements enter with intent — no everything-at-once; give each beat room.
3. Choose easing and timing deliberately; keep durations consistent and avoid motion that fights the reader.
4. Select the mechanism to fit: GSAP with ScrollTrigger for orchestrated timelines, or IntersectionObserver for lighter reveal-on-enter.
5. Gate every effect behind `prefers-reduced-motion`: provide a static or minimal-motion path that still communicates.
6. Verify motion holds up on lower-powered devices and does not block reading or interaction.
**Output.** A motion plan: scroll storyboard, reveal sequence, easing/timing spec, chosen mechanism, and the reduced-motion fallback.
**Quality bar.** A complete, non-degraded experience exists with motion disabled; timing is consistent; no animation traps focus or delays content access.

## Capability 3 — Interaction detail polish
**Goal.** Add the micro-interactions, states, and tactile feedback that make a page feel considered, within a performance budget.
**Inputs.** The design and motion plan, the component inventory, and the performance target.
**Method.**
1. Inventory every interactive element and design its full state set: default, hover, focus, active, loading, empty, and error.
2. Add micro-interactions that confirm actions and reward attention without distracting from the task.
3. Where used, tune pointer-driven or spring physics so motion feels natural, computing coordinates from the live element rect on scrollable pages.
4. Ensure `:focus-visible` styling and complete keyboard paths for every interaction.
5. Hold a performance budget: avoid layout thrash, lazy-load heavy assets, prefer transform/opacity, and target 60fps.
6. Test states and interactions across breakpoints and input types (pointer, touch, keyboard).
**Output.** An interaction spec: state matrices, micro-interaction notes, focus/keyboard behaviour, and a performance-budget checklist.
**Quality bar.** Every interactive element is keyboard-operable with a visible focus state; animations avoid layout thrash and hold frame rate; no state (loading/empty/error) is left undesigned.

## Worked example (illustrative)
*Illustrative only.* A studio wants a launch page that "feels premium." The visual direction lands on a dark editorial world: a large serif display against a tight mono eyebrow, a 12-column grid with generous vertical rhythm, and a restrained gold accent on near-black. The motion plan storyboards four scroll beats — masthead, product reveal, proof, call to action — each a staged IntersectionObserver reveal, with a `prefers-reduced-motion` path that simply shows the content in place. Interaction polish adds a pointer-tracked highlight on the primary CTA (coordinates recomputed from the live rect so it stays accurate while scrolling), full focus-visible rings, and loading/empty/error states for the sign-up form. Every effect is checked against a 60fps budget; anything that thrashes layout is reworked or cut.

## Guardrails & escalation
- Stop and reconsider any effect that harms usability, blocks content, or fails the performance budget — cut it or redesign it; spectacle does not override the page's goal.
- Never ship motion without a `prefers-reduced-motion` path, an interaction without keyboard access and a visible focus state, or a component missing its loading/empty/error states.
- Flag uncertainty: note where an effect's performance or accessibility impact is unverified and needs device/assistive-tech testing before launch.
- Escalate for accessibility audit and real-device performance testing before a high-motion page goes live.

## References & standards
- Awwwards and FWA evaluation criteria (design, usability, creativity, content).
- WCAG 2.2 — including 2.3.3 Animation from Interactions (reduced-motion), 2.4.7 Focus Visible, and 2.1.1 Keyboard.
- CSS `prefers-reduced-motion` media feature and `:focus-visible`.
- GSAP and ScrollTrigger; the IntersectionObserver API.
- Core Web Vitals (LCP, INP, CLS) used as a performance budget.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
