---
name: SEO & GEO Self-Audit
description: Turn your own site's traffic data into an honest SEO and GEO (generative-engine optimization) improvement plan. Ed Chen's method for auditing a portfolio or product site — fold out your own dev/QA traffic, separate bots from real humans, read timezone and referrer signals, then strengthen both classic search ranking and AI-answer discoverability. For anyone who owns a site and has real analytics to work from.
audience: designer · founder · growth · developer
---

# SEO & GEO Self-Audit

## What this is

A method for converting a site's real analytics into a prioritised SEO + GEO plan, drawn from strengthening this portfolio's own machine layer. SEO is being found by search engines; GEO (generative-engine optimization) is being found — and quoted accurately — by AI answer engines. The method starts from *your* data (AWStats, GA4, server logs), establishes what is actually happening, and only then recommends changes: crawlability and sitemaps, per-page metadata and structured data, entity/`sameAs` graphs, `llms.txt` and machine-readable contracts, and content that an AI can cite without hallucinating.

## What this is NOT

Not a ranking guarantee and not a black-hat playbook — search and AI systems change, and anyone promising a #1 spot is selling something. Not affiliated with Google, Bing, or any analytics vendor. It refuses to fabricate numbers: every claim comes from the user's own data, and where the data can't answer a question, it says so. It will not recommend cloaking, keyword stuffing, or manufactured backlinks; those buy a short-term spike and a long-term penalty.

## Method

1. **Fold out yourself first.** Your own dev/QA visits (the ISP you deploy from, the row with the highest bandwidth and lowest pages/visit) inflate every number. Remove them before reading anything, or the whole audit is a mirror.
2. **Separate bots from humans.** Crawlers scan; humans browse with intent. Filter Googlebot, proxies, and 4:1 hits-per-page rows; analyse unique visitors and pages/visit, not raw hits.
3. **Read the signals that matter.** Timezone peaks map to markets; referrer mix tells you discovery is search vs sharing; entry/exit pages reveal land-and-leave. Name what the data shows, not what you hope.
4. **Audit crawlability.** `robots.txt` allows the right crawlers (including AI agents), `sitemap.xml` covers every real URL, canonicals are correct, and nothing important is behind JavaScript a crawler can't run.
5. **Audit the SEO layer per page.** One `<h1>`, a title under ~60 rendered chars with the keyword front-loaded, a real meta description, Open Graph + Twitter cards, and valid JSON-LD (`Person`, `FAQPage`, `Article`, `BreadcrumbList`) that matches the visible content.
6. **Audit the GEO layer.** `llms.txt` / `llms-full.txt`, a machine-readable profile, an entity graph (`sameAs` linking the site to its GitHub, products, profiles) so an AI can resolve *who* this is, and content phrased as verifiable, quotable claims with sources — AI answers cite what it can attribute.
7. **Prioritise by impact, not by ease.** Fix the pages that already get traffic first (your entry pages), then the structural gaps (missing sitemap URLs, invalid JSON-LD, no entity graph). One correct change on a high-traffic page beats ten on a page nobody visits.
8. **Instrument and re-measure.** Submit to Search Console, ping IndexNow on deploy, and re-audit against the same folded-out baseline in a few weeks — improvement is measured against your own data, not a vanity chart.

## Quality bar

Own traffic is folded out before anything is read · bots are separated from humans and only unique visitors / pages-per-visit are trusted · crawlability (robots, sitemap, canonical) is verified · every page carries one H1, a front-loaded title, a real description, OG/Twitter, and valid content-matched JSON-LD · the GEO layer (llms.txt, entity graph, quotable claims) is present · recommendations are ranked by impact on real traffic · every number traces to the user's own analytics.

## Guardrails & escalation

This is an analysis and improvement method, not a guarantee — ranking and AI-citation behaviour are outside anyone's control, and the honest deliverable is a prioritised plan plus a way to measure it. No cloaking, keyword stuffing, or purchased links. Where a change touches privacy (analytics cookies, consent), route it through the site's consent mechanism and applicable law (GDPR/CCPA). Every figure is the user's own or is marked unverified — a confident audit built on fabricated numbers is exactly the failure this method exists to avoid.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary sources to verify against: Google Search Central docs, Schema.org, the site's own AWStats / GA4 / Search Console. Related: the Perplexity cited-research and design-system-analysis skills.
