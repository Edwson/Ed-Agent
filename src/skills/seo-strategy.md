---
name: seo-strategy
description: Use this skill when a request calls for search-engine strategy — keyword opportunity analysis, a technical SEO audit, or a content blueprint. It turns a vague "we need to rank / grow organic" ask into a structured, prioritised first pass.
---

# SEO Strategy

> **What this is** — a repeatable, AI-assisted working method for taking a request in organic search and producing a rigorous, well-structured first pass quickly: opportunity sizing, a technical health check, and a content plan tied to intent.
> **What this is NOT** — not a guarantee of rankings or traffic; search engines change and outcomes depend on competition and execution. Follow official search-engine guidelines and avoid manipulative tactics that risk penalties. Treat outputs as drafts to validate before they are relied on or shipped.

## When to use this
- A stakeholder asks "why aren't we ranking?" or "how do we grow organic traffic?" and needs a plan, not a guess.
- A new site, section, or product line is launching and needs an SEO foundation.
- A migration, redesign, or platform change risks indexation or Core Web Vitals regressions.
- Content investment needs prioritising: which topics, in what order, at what depth.
- A competitor is outranking you and you need a gap analysis and a response.

## Operating principle
Search value comes from matching real user intent with pages a crawler can reach, render, and trust — everything else is downstream of those two facts. The method separates opportunity (what is worth ranking for) from feasibility (what the site can technically support) from execution (what to actually build), so a stakeholder can act on a shortlist rather than a wishlist. AI accelerates expansion, classification, and drafting; human review owns intent judgement, business value, and any claim that could mislead.

## Capability 1 — Keyword opportunity analysis
**Goal.** Produce a priority shortlist of search targets scored by opportunity and business value, not just volume.
**Inputs.** Seed terms, product/service descriptions, target audience and market, a list of competitors, and any available metrics (search volume, difficulty, current rankings).
**Method.**
1. Expand seeds into a candidate set using related terms, questions, modifiers, and long-tail variants.
2. Classify each term by intent — informational, navigational, commercial, or transactional — and drop mismatches to the offering.
3. Group terms into topic clusters so effort maps to pages, not to isolated keywords.
4. Score each cluster on difficulty vs. volume vs. business value (proximity to conversion), flagging where estimates are uncertain.
5. Run a gap analysis against competitors: terms they rank for and you do not, and terms you both contest.
6. Rank into a shortlist — quick wins (low difficulty, real value) separated from long-term bets.
**Output.** A ranked cluster shortlist with intent labels, an opportunity/value score, competitor gaps, and a recommended sequence.
**Quality bar.** Every priority claim traces to a stated metric or a labelled assumption; intent classification is defensible against the live SERP; no invented volume or difficulty figures.

## Capability 2 — Technical SEO audit
**Goal.** Surface the crawl, index, performance, and structured-data issues that cap a site's search ceiling.
**Inputs.** Site URL(s), access to crawl data / Search Console coverage where available, `robots.txt`, XML sitemaps, and representative page templates.
**Method.**
1. Check crawlability and indexation: `robots.txt` rules, XML sitemaps, canonical tags, `noindex` usage, and HTTP status codes (200/301/404/410/5xx).
2. Review Core Web Vitals — LCP, INP, and CLS — at the template level, not just the homepage.
3. Validate structured data (Schema.org / JSON-LD) for correctness and eligibility, not just presence.
4. Confirm mobile rendering and HTTPS across the site; flag mixed content or viewport issues.
5. Assess internal linking: orphan pages, crawl depth, anchor context, and hub-to-detail flow.
6. Cross-reference coverage/log data (where available) to separate "not crawled" from "crawled, not indexed" from "indexed, not ranking."
7. Rank findings by impact and effort into a remediation list.
**Output.** A prioritised remediation list grouped by crawl/index, performance, structured data, and internal linking, each finding with evidence and a suggested fix.
**Quality bar.** Findings cite the specific page, rule, or metric observed; INP is used as the responsiveness metric (it replaced FID in the Core Web Vitals in 2024); no fix is asserted as guaranteed to move rankings.

## Capability 3 — Content blueprint planning
**Goal.** Turn a keyword shortlist into a buildable content architecture with briefs matched to search intent.
**Inputs.** The priority cluster shortlist, existing content inventory, brand voice, and target audience.
**Method.**
1. Design topic clusters as pillar/hub-and-spoke: one authoritative hub per theme, supporting pages linked to it.
2. For each target page, inspect the live SERP and specify the format and depth that matches the dominant intent.
3. Write SERP-intent-matched briefs: primary and secondary terms, key questions to answer, suggested structure, and internal links.
4. Map the information architecture so URLs and navigation reflect the cluster structure.
5. Define an internal-link plan connecting spokes to hubs and related clusters.
6. Set a refresh cadence for pages likely to decay (time-sensitive or competitive topics).
**Output.** A content blueprint: cluster map, per-page briefs, IA/URL recommendations, an internal-link plan, and a refresh schedule.
**Quality bar.** Each brief is grounded in an actual SERP observation for its target term; recommendations serve the reader's intent rather than keyword density; nothing promises a specific ranking.

## Worked example (illustrative)
*Illustrative only — figures are placeholders.* A B2B analytics vendor asks why blog traffic is flat. Keyword analysis expands "data pipeline" seeds into ~200 candidates, classifies ~40% as informational and ~15% as commercial, and clusters them into eight themes; three low-difficulty, high-value clusters surface as quick wins. The technical audit finds a template shipping a large hero image that hurts LCP and a set of paginated pages canonicalising to page 1, hiding deep content from the index. The content blueprint proposes a pillar page per quick-win cluster with four supporting briefs each, an internal-link plan pointing spokes to the pillar, and a quarterly refresh on two time-sensitive comparisons. Every number here is placeholder and would be replaced by measured data before any commitment.

## Guardrails & escalation
- Stop and validate against measured data (Search Console, a real crawl, live SERPs) before presenting any opportunity as certain; a first pass built on estimates is a hypothesis, not a forecast.
- Never ship or recommend manipulative tactics — cloaking, hidden text, link schemes, doorway pages, scaled low-value content — that violate Google Search Essentials and risk manual actions.
- Flag uncertainty explicitly: label estimated vs. measured metrics, and note where intent or difficulty is a judgement call.
- Escalate migrations, mass redirects, and canonical/indexation changes for engineering and stakeholder review before deployment.

## References & standards
- Google Search Essentials (formerly Webmaster Guidelines) and Google Search Central documentation.
- Core Web Vitals: LCP, INP, and CLS (INP replaced FID as the responsiveness metric in March 2024).
- Schema.org vocabulary and Google's structured-data guidelines (JSON-LD).
- XML Sitemaps protocol; `robots.txt` (Robots Exclusion Protocol); rel=canonical.
- Think with Google and first-party SERP inspection for intent validation.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
