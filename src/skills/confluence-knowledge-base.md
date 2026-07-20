---
name: Confluence Knowledge Base
description: Build a Confluence space people actually find and trust — an information architecture that matches how the team looks for things, page templates that make good docs the default, a single source of truth per topic, and a maintenance rhythm that fights rot. For teams running product, engineering, or ops documentation on Confluence.
audience: product manager · engineering lead · ops · technical writer
---

# Confluence Knowledge Base

## What this is

A method for making Confluence a knowledge base instead of a document graveyard. Confluence fails the same way everywhere: pages multiply, three versions of the truth coexist, search returns noise, and people give up and ask in chat. This skill designs a space architecture that mirrors how the team actually searches, uses templates so a good page is the easy page, enforces one source of truth per topic, and sets a maintenance rhythm so the space stays trustworthy as it grows.

## What this is NOT

Not affiliated with or endorsed by Atlassian / Confluence, and not a substitute for the current Confluence documentation. Not a mandate to document everything — over-documentation rots as fast as under-documentation, and part of the method is deciding what's worth a durable page versus what belongs in a ticket or a chat. Not a guarantee that people will read it; findability and trust are earned by structure and upkeep, not by existing. It will not bless duplicate sources of truth — a conflicting second page is a bug, not a backup.

## Method

1. **Design the space around how people search.** Structure spaces and page trees by the questions people ask (onboarding, how-tos, decisions, runbooks), not by org chart — findability is the whole job.
2. **One source of truth per topic.** Each topic has exactly one canonical page; everything else links to it. Duplicates are merged or redirected, not tolerated.
3. **Make good docs the default with templates.** Templates for decisions (ADR), runbooks, PRDs, and meeting notes so structure is free and pages are consistent and scannable.
4. **Write for the reader who's lost.** A clear title, a one-line "what this is," last-reviewed date, and owner on every durable page — so a reader knows in seconds if they're in the right place and whether to trust it.
5. **Connect the graph.** Link related pages, label consistently, and use the right macros (page trees, includes) so knowledge is navigable, not a pile of orphans.
6. **Set a review rhythm.** Owners and review dates; a recurring pass that archives the stale and flags the outdated — an unmaintained knowledge base is worse than none because it lies with confidence.
7. **Decide what doesn't belong.** Transient status goes in the tracker, not a page; ephemeral discussion stays in chat. Reserve Confluence for durable knowledge.
8. **Manage permissions deliberately.** Open by default within the team where possible; restrict only what genuinely must be, and never make access control an afterthought.

## Quality bar

The space is structured around how people search, not the org chart · each topic has exactly one canonical page and duplicates are merged · templates make good, consistent pages the default · every durable page carries a purpose line, owner, and last-reviewed date · pages are linked and labelled for navigation · a review rhythm archives the stale · transient content is kept out · permissions are deliberate.

## Guardrails & escalation

A working method, not official documentation — verify features (macros, templates, permissions) against current Confluence. The load-bearing discipline is one-source-of-truth plus maintenance; without them the space becomes confidently wrong. Where content touches sensitive or regulated material (personal data, security procedures, legal), set permissions and route review to the right owner rather than leaving it open by default. If a topic is genuinely transient, keep it out of Confluence rather than adding a page that will rot.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: Confluence documentation (support.atlassian.com/confluence) — verify against the current product. Related: the Trello project-flow and Jira project-orchestration skills.
