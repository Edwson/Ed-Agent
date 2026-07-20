---
name: video-director-prompt
description: Use this skill to write director-grade prompts for AI video generation, scaled to the length you actually need — a 10-second hero clip, a 1-minute sequence, or a 30-minute program. It brings shot language (framing, lens, motion, light, pacing) and, for longer pieces, decomposition into shots and scenes with continuity control. For turning an idea into a shot-specification a model can render, or planning a longer piece as a shot list. Not a guarantee of output, and never for cloning real people or copyrighted characters.
---

# Video Director Prompt

> **What this is** — a repeatable method for prompting AI video generators like a director briefs a crew: specifying subject, action, framing, lens, camera motion, lighting, mood, and pacing in the model's language, and — as length grows — decomposing the piece into shots and scenes held together by an explicit continuity spec. It scales cleanly across three tiers: a 10-second single beat, a 1-minute multi-shot sequence, and a 30-minute structured program.
> **What this is NOT** — **not a guarantee of what the model produces** (today's systems still struggle with physics, legible text, hands, and long continuity), not a replacement for real editing, and **not a tool for generating real, identifiable people or copyrighted characters**. It writes original briefs for original subjects; likeness of actual public figures and protected IP are out of scope.

## When to use this
- An idea needs to become a precise shot-specification a video model can actually render.
- A clip keeps coming out generic or off-brief and needs real shot language instead of vague adjectives.
- A longer piece (a minute, or a full program) needs planning as a shot list with continuity, not one impossible mega-prompt.
- A team wants a repeatable house style across many generated clips.

## Operating principle
Direct, don't describe vaguely. Video models reward the specificity a director gives a crew — one clear subject, one clear action, and deliberate choices of frame, lens, motion, light, and tempo. Length changes the unit of work: seconds are a single beat you perfect; a minute is a sequence you decompose into shots with continuity; half an hour is a program you structure into scenes and generate shot by shot. Continuity is engineered, not hoped for — a subject/lighting/style spec carried across every shot.

## Capability 1 — The 10-second shot (single beat)
**Goal.** Nail one vivid, coherent shot the model can render in a single generation.
**Inputs.** The subject, the one action, and the intended feeling.
**Method.**
1. Fix **one subject and one action** — 10 seconds holds a single beat, not a story.
2. Specify the **shot grammar**: framing (wide/medium/close), lens feel (e.g. 35mm, macro), camera move (static, slow push, orbit), and speed.
3. Set **light and mood** — key direction, time of day, palette, texture, film-vs-clean look.
4. Add only detail that survives the duration; cut anything that needs more seconds to read.
5. Note the model's known weak spots (text, hands, fast complex motion) and design around them.
**Output.** A single dense shot prompt: subject, action, framing, lens, motion, light, mood, pacing.
**Quality bar.** One coherent beat; every clause is a deliberate directorial choice; nothing overloads the ten seconds.

## Capability 2 — The 1-minute sequence (multi-shot continuity)
**Goal.** Plan and prompt a minute as a handful of shots that cut together and stay consistent.
**Inputs.** The mini-narrative or message and the desired arc over ~60 seconds.
**Method.**
1. Break the minute into **4–8 shots** with a simple arc (hook → develop → turn → resolve).
2. Write a **continuity spec** carried into every shot prompt: subject description, wardrobe/props, palette, lighting, and style tokens.
3. Vary **shot size and angle** across the sequence so cuts have rhythm, not repetition.
4. Prompt each shot separately; keep the continuity block identical, change only the beat.
5. Plan the **edit**: transitions, pacing, where sound/music lands — generation feeds an edit, it isn't the edit.
**Output.** A shot list (one prompt per shot) plus a shared continuity spec and an edit note.
**Quality bar.** Shots read as one piece; the subject and look stay consistent across cuts; the arc is legible in a minute.

## Capability 3 — The 30-minute program (structured decomposition)
**Goal.** Turn a long-form idea into a producible structure of scenes and shots, generated piece by piece.
**Inputs.** The program's purpose, audience, and rough runtime.
**Method.**
1. Structure the runtime into **acts/segments and scenes** with a throughline — half an hour is written, not prompted in one go.
2. Build a **style/continuity bible**: recurring subjects, locations, palette, lighting, motifs, and a consistent visual grammar.
3. Decompose each scene into **shots**, each a Capability-1/2 prompt drawing on the bible.
4. Plan the **assembly pipeline** — generate shots, sequence, add voiceover/music/graphics, colour for consistency — and where human review and re-generation loops sit.
5. Budget realistically: generation cost, iteration count, and the manual editing the model won't do.
**Output.** A program structure (segments → scenes → shot list) with a continuity bible and an assembly/QA plan.
**Quality bar.** The long piece has a spine; visual continuity holds across scenes; the plan is producible within real cost and effort, not a fantasy one-click render.

## Worked example (illustrative)
*Illustrative only.* Brief: promote a fictional coffee brand. **10s** — "Macro, 35mm, slow overhead push onto a single espresso pour into a matte black cup; warm side-key, steam catching light, shallow depth, calm tempo." One beat, perfected. **1-minute** — six shots (beans → grind → pour → steam → hands lifting cup → wide café), a continuity spec locking palette (amber/charcoal), morning light, and film grain into every prompt, cut to a rising rhythm. **30-minute** — a "craft of coffee" program: four segments (origin, roast, brew, ritual), a style bible fixing locations and grade, each scene decomposed into shots, with an assembly plan for voiceover and a colour pass — plus an honest note that this is many generations and a real edit, not one render. No real barista's likeness is used; the brand and people are invented.

## Guardrails & escalation
- **No real-person likeness, no protected IP:** don't prompt identifiable public figures or copyrighted characters/worlds; write original subjects. Route brand/likeness clearance to legal.
- **Output isn't guaranteed:** models still fail at text, hands, physics, and long continuity — treat prompts as direction, plan for iteration, and verify results rather than promising them.
- **Generation feeds an edit:** longer pieces need real assembly, sound, and colour work; don't sell one-click output where a production pipeline is required.
- **Disclose synthetic media** where viewers could reasonably be misled, and follow platform rules on AI-generated content.

## References & sources
- **Cinematography and shot-grammar** fundamentals — framing, lens choice, camera movement, lighting, and pacing.
- **Prompt-craft guidance** from video-generation systems (e.g. Runway, Pika, Sora-class models) on structured, directorial prompting and their current limitations.
- **Continuity and shot-list** practice from film/animation production for multi-shot and long-form consistency.
- Emerging norms and platform policies on **synthetic-media disclosure** and likeness/IP rights.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
