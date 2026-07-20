---
name: logic-structuring
description: Use this skill to turn a tangled problem, question, or argument into a clear, navigable structure — decomposing it into a MECE issue tree or first-principles components, mapping what depends on what and what is assumed, and building the synthesis top-down (Minto pyramid style) so the conclusion and its support are legible. It organises reasoning; it does not audit its truth.
---

# Logic Structuring

> **What this is** — a repeatable method for imposing structure on messy reasoning: break a tangled question into mutually exclusive, collectively exhaustive parts (or first-principles components), map the dependencies and assumptions between them, and assemble the answer top-down so the conclusion leads and its support hangs beneath it in legible order. It makes a complex problem navigable.
> **What this is NOT** — **it structures reasoning; it does not supply domain truth.** A clean structure built on wrong premises is still wrong — organising an argument well does not make it correct. It is also **not a substitute for the objectivity/fallacy audit**: this one arranges reasoning into shape, the audit checks whether that reasoning is sound; the two are complementary. Premises that hinge on legal, medical, financial, or safety facts route to the qualified expert.

## When to use this
- A problem is a tangle and needs to be broken into a clean, exhaustive set of parts before anyone can work it.
- An argument or recommendation is hard to follow, and its conclusion and support need to be arranged so a reader can navigate them.
- A decision has many interdependent moving parts, and what-depends-on-what needs to be made visible before sequencing the work.
- A dense analysis needs a top-down structure — headline first, support beneath — so an executive can grasp it fast.
- A team is talking past each other because the problem was never decomposed into agreed, non-overlapping pieces.

## Operating principle
Structure first, truth-test second. The job is to make reasoning *navigable* — to break the whole into parts that don't overlap and don't leave gaps, expose the dependencies and assumptions the argument silently relies on, and assemble the result so the main point comes first and everything below supports it. Good structure reveals where the real questions are and where the load-bearing assumptions sit; it does not certify that the answer is right. That certification is a separate, complementary pass — the objectivity/fallacy audit — and domain facts belong to domain experts.

## Capability 1 — Decompose
**Goal.** Break a tangled question into a clean, exhaustive set of parts that can each be worked independently.
**Inputs.** The question or problem as stated, the outcome that matters, and how deep the breakdown needs to go.
**Method.**
1. **Restate the core question** sharply — the one thing the structure must resolve — before decomposing anything.
2. Build a **MECE issue tree**: branch the question into sub-issues that are **mutually exclusive** (no overlap) and **collectively exhaustive** (no gaps).
3. Where the problem is novel, decompose **from first principles** instead — strip it to its fundamental components and rebuild, rather than reasoning by analogy.
4. Recurse to the right **depth**: keep branching until each leaf is a question that can actually be answered or tested — no deeper.
5. **Check the decomposition**: any overlap between branches, any gap the branches miss, any leaf that is really two questions.
**Output.** An issue tree (or first-principles component breakdown) whose branches are non-overlapping, gap-free, and answerable at the leaves.
**Quality bar.** Branches are genuinely mutually exclusive and collectively exhaustive; the tree bottoms out in answerable questions; the core question is stated before it is split.

## Capability 2 — Map dependencies & assumptions
**Goal.** Surface what depends on what, what is being assumed, and the order the reasoning must run in.
**Inputs.** The issue tree/components from Capability 1 and what is known or assumed about each part.
**Method.**
1. Map **dependencies**: for each part, what must be resolved *before* it, and what its output feeds into — expose the reasoning's directed structure.
2. Surface **unstated assumptions** each branch relies on, and label each as established, uncertain, or a placeholder awaiting a fact.
3. Identify the **load-bearing nodes**: the few parts whose answer swings the whole conclusion, versus branches that barely move it.
4. Sequence the work: order the parts so nothing is reasoned before its inputs exist, and flag any **circularity** where the structure depends on itself.
5. Mark where a branch **hinges on a domain fact** that must come from an expert or data, not from the structure.
**Output.** A dependency map: the sequence of reasoning, the assumption register per branch, the load-bearing nodes, and the points that need an external fact.
**Quality bar.** Dependencies and their direction are explicit; assumptions are named and graded; load-bearing nodes are distinguished from minor ones; expert/data hand-off points are flagged.

## Capability 3 — Structure the synthesis
**Goal.** Assemble the argument top-down so the conclusion leads and its support is legible beneath it.
**Inputs.** The resolved parts, the dependency map, the audience, and what they need to do with the answer.
**Method.**
1. State the **governing conclusion first** — the single answer the structure resolved to — not a slow build-up to it.
2. Arrange support in a **Minto pyramid**: the conclusion at the top, supported by a small set of grouped, MECE arguments, each in turn supported by its evidence.
3. Ensure each group **answers the reader's next natural question** ("why?", "how?", "so what?") so the structure reads as a logical descent.
4. Order groups by a deliberate logic (importance, sequence, or structure) — not by the order the analysis happened to be done.
5. **Pressure-test the skeleton**: does the top-line follow from the groups, do the groups actually support it, is anything load-bearing missing — then hand to the objectivity audit for the truth-check.
**Output.** A top-down argument structure: headline conclusion, a MECE set of supporting groups, and their evidence — legible and navigable.
**Quality bar.** The conclusion leads; support is grouped MECE and genuinely holds up the top-line; ordering is deliberate; the structure invites, and is handed to, a separate soundness check.

## Worked example (illustrative)
*Illustrative only.* "Should we build this feature?" arrives as a tangle of opinions. (1) **Decompose** — restate as "does this feature clear our build bar?" and branch MECE into *desirability* (do users want it), *viability* (does it pay), *feasibility* (can we build it), each recursing to answerable leaves. (2) **Dependencies & assumptions** — feasibility's cost estimate feeds viability, so it must be resolved first; the load-bearing node is a single assumption about adoption rate, flagged as *uncertain* and routed to data, not guessed. (3) **Synthesis** — lead with the conclusion ("build it, conditional on validating adoption"), supported by three grouped arguments (wanted / pays / buildable), each with its evidence, ordered by which most sways the decision — then handed to the objectivity audit to check the reasoning is actually sound. The structure made the problem navigable; a separate pass checks it is right.

## Guardrails & escalation
- **Structure is not truth:** a clean, well-organised argument built on false premises is still false — good structure makes reasoning legible, it does not make it correct.
- **Complementary, not a replacement:** this arranges reasoning into shape; the objectivity/fallacy audit checks whether that reasoning holds. Run structuring first, then the audit — don't let a tidy pyramid stand in for a soundness check.
- **MECE honestly:** resist forcing a clean tree where the problem genuinely overlaps or has fuzzy edges — a false-neat structure hides the real complexity rather than revealing it.
- **Escalate to a domain expert** for any branch whose truth hinges on legal, medical, financial, or safety facts — the structure flags where the fact is needed and load-bearing; the qualified expert supplies it.

## References & sources
- **MECE** (mutually exclusive, collectively exhaustive) and **issue trees** as the core decomposition discipline from structured problem-solving practice.
- The **Minto Pyramid Principle** — conclusion-first, grouped-support structuring for legible arguments.
- **Argument mapping** — making premise → support → conclusion structure explicit and navigable.
- **First-principles decomposition** — rebuilding a problem from fundamentals rather than by analogy.
- **Hypothesis-driven, structured problem-solving** methods (issue tree → analysis → synthesis) consistent with this portfolio's separation of structuring from the objectivity/soundness audit.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
