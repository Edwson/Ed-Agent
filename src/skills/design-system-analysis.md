---
name: Design System Analysis (Ed Chen's lens)
description: An objective read of a design system — no hype, no hate, only what's true. Ed Chen's analysis method: separate fact from judgment, reconstruct the build logic and the context it was made in, then anchor every observation to what the agent's user is actually trying to achieve, and help them get there. For anyone assessing or improving a design system.
audience: designer · design-system lead · developer
---

# Design System Analysis (Ed Chen's lens)

## What this is

A method for analysing a design system the way it should be analysed: honestly. Good is good, bad is bad, and the point is to help — not to flatter and not to dunk. It reconstructs how the system was built and *why* (the constraints, the team, the moment it was made in), states what's genuinely strong and what's genuinely weak with the evidence for each, and then — the part most audits skip — ties every observation to what the person running this actually wants to accomplish, so the analysis is a path to their goal, not a scorecard.

## What this is NOT

Not a rubber stamp and not a hit piece — it refuses both the "everything's great" review that helps no one and the contrarian teardown that mistakes cruelty for rigor. Not a substitute for the system's own team's context; where intent is unknown, the analysis says so instead of inventing motives. Judgments are labelled as judgments, facts as facts — the reader always knows which is which. It is one experienced lens, offered plainly, not an objective verdict from nowhere.

## Method

1. **Ask what the user is actually trying to do — first.** Ship faster? Cut inconsistency? Onboard engineers? Pass an audit? Sell the system internally? The entire analysis is anchored here; an assessment with no goal is trivia.
2. **Separate fact from judgment, and label both.** "It has 12 spacing tokens" is a fact. "The spacing scale is too granular to be memorable" is a judgment with a reason. Never let the second wear the clothes of the first.
3. **Reconstruct the build logic.** Tokens → primitives → components → patterns: how does value flow, what's the source of truth, where does a change propagate versus require a rebuild? A system's real architecture is in how a change travels through it.
4. **Read the context it was made in.** Team size, timeline, constraints, the org it serves. A "flawed" decision is often the correct decision for the constraints it was made under — name the constraint before you name the flaw.
5. **State strengths as plainly as weaknesses.** Where it's genuinely good, say exactly why and don't hedge. False modesty is as useless as false praise. The credibility of the criticism depends on the honesty of the praise.
6. **Locate the load-bearing weaknesses.** Not every imperfection matters — find the few that actually block the user's stated goal (drift because there's no single source of truth; adoption failure because there's no contract; a11y debt that will fail an audit). Rank by impact on *their* goal, not by taste.
7. **Give a path, sized to the goal and the team.** Concrete, prioritised, and realistic for the resources they have — the smallest set of moves that gets them measurably closer to what they asked for. Not a wishlist; a next step.
8. **Say what you can't know.** If the analysis is from the outside without usage data, adoption metrics, or the team's rationale, name those gaps — a confident analysis of things it can't see is exactly the dishonesty this method exists to avoid.

## Quality bar

The user's actual goal is established before anything is judged · facts and judgments are labelled and never conflated · the build logic (token → component → propagation) is reconstructed · the context and constraints are read before flaws are named · strengths are stated as plainly as weaknesses · the load-bearing weaknesses are ranked by impact on the user's goal · the path is concrete, prioritised, and sized to the team · the limits of the analysis are stated.

## Guardrails & escalation

This is analysis and informed judgment, offered honestly — not an objective verdict and not a substitute for the system team's own knowledge. Where a claim would be a fact (a contrast ratio, a token count, an adoption number), it's verified or marked unverified, never asserted. Accessibility, security, or regulatory weaknesses are flagged as design-level findings and routed to the relevant specialist for a formal assessment. If the user's goal itself is unclear, resolve that with them before analysing — the wrong goal produces a confident, useless report.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the CDS Design Review skill (citation-backed feedback), the institutional Design System (https://edwson.com/design-system-showcase.html) as a worked reference, and the "objectivity & logical rigor" discipline in the institutional skill set.
