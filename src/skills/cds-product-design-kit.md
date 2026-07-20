---
name: CDS Product Design Kit
description: Analyse any product surface — or specify a new one — into a complete, tokenized Design Kit document: YAML tokens, component specs with token references, do/don'ts, responsive behaviour, and an honest Known Gaps section. The universal method behind a full-site design teardown.
audience: designer · developer
---

# CDS Product Design Kit

## What this is

A method for producing a **Design Kit document**: one Markdown file that captures a product's entire visual system precisely enough that a human or an agent can rebuild, extend, or audit it. The format was proven on a full teardown of a photography-first flagship marketing site; this skill generalises the method to any product.

## What this is NOT

Not a moodboard and not a screenshot annex. Every value in the kit is measured or specified — a kit that says "blue-ish, generous spacing" has failed. And it is not a licence to copy a competitor: analyse for structure and discipline, then design your own values.

## The document contract

A Design Kit has two halves that must never disagree:

1. **YAML frontmatter — the machine half.** `colors` (semantic names, hex), `typography` (family/size/weight/lineHeight/letterSpacing per role), `rounded`, `spacing`, and `components` where every value is a `{token.reference}` — never inline hex. If a component needs a value that has no token, that's a missing token, not an exception.
2. **Markdown body — the judgment half.** Overview (the system's one-sentence thesis and key characteristics) · Colors (what each role is FOR, not just what it is) · Typography (the ladder, and the principles behind it — which weights are deliberately absent, where tracking tightens) · Layout (base unit, container widths, whitespace philosophy) · Elevation (a table: level → treatment → use; count the shadows, most great systems have almost none) · Shapes (radius grammar: which radius means "action", which means "container") · Components (per component: tokens used, states, behaviour) · Do's and Don'ts (each one falsifiable) · Responsive (breakpoint table with what actually changes) · Iteration Guide (how to extend without drift) · **Known Gaps** (what was NOT observed — mandatory; a kit without gaps is claiming omniscience).

## Method

1. **Measure, don't remember.** Values come from computed styles, design files, or specs — cite the source surface for each section. Where a value varies, record the variance, not an average.
2. **Name semantically.** `action-blue`, `canvas-parchment`, `ink-muted-48` — the name carries the role. A rebrand should change values, never names.
3. **Find the signature moves.** Every strong system has 3–5 non-obvious decisions (a single permitted shadow, a deliberately absent font weight, body text one pixel off convention). These are the identity — the kit must surface them explicitly.
4. **Write the Don'ts as tests.** "Don't add a second accent" is checkable; "keep it clean" is not.
5. **Declare the gaps honestly.** States not observed, dark-mode variants not surfaced, values that are platform-dependent — say so. The Known Gaps section is what makes the rest of the document trustworthy.

## Quality bar

Zero inline hex in component specs · every claim traceable to a measured surface · signature moves identified · Don'ts falsifiable · Known Gaps present and specific.

## Guardrails & escalation

Teardowns of competitors are for structural learning; shipping a lookalike escalates to design leadership and, where trade dress could be implicated, to counsel. Proprietary fonts get documented with their licensed substitutes, never redistributed.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json + tokens.json · Agent brief: https://edwson.com/cds/AGENTS.md
