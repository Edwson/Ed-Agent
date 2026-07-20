---
name: NotebookLM Source Curation
description: For a given industry or domain, quickly assemble the sources worth grounding on — the highest-authority URLs, the peer-reviewed papers, and the official first-party datasets — so a NotebookLM (or any RAG assistant) reasons from primary, current, citable material instead of the open web's noise. For anyone learning a domain fast and honestly.
audience: everyone · researcher · developer
---

# NotebookLM Source Curation

## What this is

A method for the step *before* you paste anything into NotebookLM: choosing the sources. NotebookLM is only as good as what you feed it — a grounded assistant grounded on weak sources gives confident, well-cited nonsense. This skill curates, for a target domain, the set worth trusting: authoritative pages, primary literature, and official data at the source, with each source's authority and date recorded so the grounding is defensible.

## What this is NOT

Not affiliated with Google or NotebookLM and not a claim about its current features — confirm those against its own docs. Not a substitute for reading the primary source when a decision rests on it. A tidy citation is not a correct one; this skill's whole job is to make sure the citations point at material that is actually authoritative and current.

## Method

1. **Frame the domain question precisely.** "What are the 2026 EU AI Act obligations for a consumer chatbot" curates a different source set than "AI regulation." A sharp question is what separates a primary-source library from a link dump.
2. **Go to the official source first.** Regulators, standards bodies, government statistics offices, and the primary vendor/spec — the thing everything else cites. An official dataset or the actual regulation outranks any blog summarizing it.
3. **Add the peer-reviewed layer.** Papers from the primary literature (with DOIs), prioritised by venue, citation weight, and recency. A pre-print is flagged as not-yet-reviewed, not treated as settled.
4. **Only then the high-authority secondary layer.** Well-sourced explainers from recognised institutions to bridge gaps — but every claim you'll rely on traces back to layer 2 or 3, not to the explainer.
5. **Score every source: authority × freshness.** Record who published it and when. A confidently-cited 2019 source in a fast-moving field is stale; say so on the row rather than letting NotebookLM treat it as current.
6. **Prefer data at the source over data about the data.** Link the official dataset/API, not a chart someone drew from it. First-party numbers are checkable; redrawn ones inherit whoever drew them.
7. **Feed a bounded, deduplicated set.** A focused notebook of 10–20 strong sources beats 80 overlapping ones — retrieval quality drops as the pile grows and contradicts itself. Remove near-duplicates.
8. **Keep the provenance with the output.** When the notebook's synthesis feeds a decision or a document, carry the real sources forward so the next reader can verify — and so "we grounded it" means something checkable.

## Quality bar

The question is specific · official/primary sources are the spine, secondary only bridges gaps · papers carry DOIs and venue/recency · every source is scored for authority and date, with stale ones flagged · data is linked at its source, not redrawn · the set is bounded and deduplicated · provenance travels with any conclusion.

## Guardrails & escalation

Regulated-domain questions (medical, legal, financial) grounded in curated sources are still a starting point for a licensed professional, not an answer — route the decision. Paywalled or licensed material is respected: link and cite, don't wholesale-paste copyrighted text. When authoritative sources genuinely disagree, surface the disagreement to a domain expert rather than letting the assistant pick the tidier answer.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the Perplexity Research skill (citation-first discipline) and the portfolio's "On using AI, honestly" method note. Confirm NotebookLM's current source limits and features against Google's own documentation.
