---
name: persona-development
description: Use this skill to turn real research into decision-useful personas — evidence-grounded archetypes with goals, contexts, and jobs-to-be-done that a product or design team can actually build against. For synthesising interviews, surveys, support tickets, or analytics into a small set of personas, pressure-testing existing personas for bias, or turning a persona into journeys and scenarios. Not a substitute for talking to real users, and never a licence to invent a "typical user" from assumptions.
---

# Persona Development

> **What this is** — a repeatable method for compressing real evidence about users into a small, honest set of archetypes: each anchored to observed behaviour, motivations, and context, and expressed so a team can design and prioritise against it. It turns scattered research into shared, testable models of who the product serves.
> **What this is NOT** — **not a replacement for actual user research**, not a way to conjure a "typical user" from the team's assumptions, and not a demographic caricature. A persona with no evidence behind it is fiction; a persona built on age/gender/ethnicity as a stand-in for behaviour is a stereotype. This method refuses both — it grounds every trait in data and routes real accessibility, clinical, or legal questions about a population to the right specialist.

## When to use this
- A pile of interviews, survey responses, support tickets, or session analytics needs to become a handful of usable archetypes.
- Existing personas feel like marketing props and need to be rebuilt on real evidence — or audited for stereotyping.
- A team keeps designing for "the user" and needs shared, specific models to prioritise and resolve disagreements against.
- A journey map, scenario, or JTBD framing needs a grounded persona to hang on.

## Operating principle
Evidence first, archetype second. A persona is a lossy compression of real people — its only value is fidelity to what the research actually showed. Behaviour and motivation drive the model; demographics appear only when they genuinely explain behaviour, never as a proxy for it. Keep the set small, name the evidence behind each trait, and mark what's still an assumption so it can be tested rather than trusted.

## Capability 1 — Evidence intake & segmentation
**Goal.** Turn raw research into behavioural clusters that could each become a persona.
**Inputs.** Interview notes, survey data, support tickets, analytics, sales/CS observations — whatever real signal exists.
**Method.**
1. Extract observations (behaviours, goals, frustrations, contexts, workarounds), not opinions about users.
2. Affinity-cluster by **behaviour and motivation**, not demographics — group people who act and want alike.
3. Name the axis that actually separates clusters (e.g. risk tolerance, expertise, frequency), and check the split is real, not imposed.
4. Note cluster **size and evidence strength** so a rare-but-vivid group isn't over-weighted.
5. Flag where evidence is thin — those personas will be provisional.
**Output.** A short list of candidate segments, each with its defining behaviour, rough prevalence, and evidence strength.
**Quality bar.** Segments are separated by behaviour/need, not by demographic label; each is traceable to real observations; thin-evidence groups are marked, not hidden.

## Capability 2 — Persona synthesis
**Goal.** Turn each viable segment into a concise, decision-useful persona.
**Inputs.** The segments and their underlying evidence.
**Method.**
1. Write each persona around **goals, motivations, behaviours, context, and pain points** — the things that change design decisions.
2. Include demographics **only** where they demonstrably drive behaviour (e.g. regulatory context, device access), and say why.
3. Give each a memorable name and a one-line essence, but keep the body evidence-anchored — cite the signal behind key traits.
4. Add a **"what we don't yet know"** line per persona so gaps are explicit.
5. Keep the set small (typically 3–5); merge near-duplicates; cut personas the product won't serve.
**Output.** A tight persona set, each a page or less, with traits tied to evidence and open questions named.
**Quality bar.** Every non-obvious trait has evidence behind it; no persona leans on stereotype; the set is small enough to hold in the team's head and distinct enough to drive different decisions.

## Capability 3 — Activation (journeys, JTBD, scenarios)
**Goal.** Make personas do work: connect them to journeys, jobs-to-be-done, and prioritisation.
**Inputs.** The persona set and the product decisions in front of the team.
**Method.**
1. For the primary persona(s), map the **journey** for the core task — stages, goals, friction, emotional arc.
2. Frame the underlying **jobs-to-be-done** ("when… I want to… so I can…") so solutions aren't locked to today's UI.
3. Write **scenarios** that put a persona in a concrete situation to test a design against.
4. Use personas to **prioritise**: which segment does this feature serve, and at what cost to others?
5. Keep personas **living** — revisit when new research contradicts them.
**Output.** Journeys, JTBD statements, and scenarios tied to specific personas, plus a prioritisation lens.
**Quality bar.** Artefacts trace back to a grounded persona; JTBD are outcome-framed, not feature-framed; the persona is used to decide, not just to decorate a deck.

## Worked example (illustrative)
*Illustrative only.* A trading-platform team has 18 interviews and six months of support tickets. Intake clusters them by **behaviour**: "verifies every fill manually" vs "trusts automation and scans for exceptions" — not by age or job title. Synthesis yields two personas: *Mara, the exception-scanner* (goal: catch the one bad fill fast; evidence: 7 interviews, ticket theme "why didn't it flag X") and *Devin, the manual-verifier* (goal: trust nothing unseen; evidence: 5 interviews) — each with a "don't yet know" line about after-hours behaviour. Activation: Mara's journey exposes that the alert design assumes Devin's habits, mis-serving the larger group. The team reprioritises. No demographic ever entered the model.

## Guardrails & escalation
- **No evidence, no persona:** if a proposed persona can't be traced to real research, label it a hypothesis to test — don't ship it as fact.
- **Behaviour over demographics:** never use age, gender, or ethnicity as a proxy for how someone acts; that's stereotyping, and it produces worse products.
- **Personas don't replace users:** they're a shared model, not a reason to stop talking to real people. Keep testing against actual users.
- **Route specialist questions out:** real accessibility needs, clinical conditions, or legally protected characteristics are for the relevant specialist and for direct research — not for a persona to assume.

## References & sources
- **Alan Cooper's** goal-directed personas and the practice of behaviour-based segmentation.
- **Jobs-to-be-done** (Christensen; Klement) for outcome-framed needs over feature lists.
- **Journey mapping** and scenario-based design as persona activation methods.
- Research-synthesis and affinity-diagramming practice for turning qualitative data into archetypes, and the standing critique of assumption-based, stereotype-prone personas.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
