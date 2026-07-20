---
name: Cloudflare Edge Platform
description: Ship and defend at the edge with an agent — Workers, Pages, R2/D1/KV, caching, WAF, and Zero Trust — with DNS and security changes gated because they take effect globally in seconds. For developers building on Cloudflare's edge and CDN.
audience: developer · platform · ops
---

# Cloudflare Edge Platform

## What this is

A method for putting an agent to work across Cloudflare's edge — compute (Workers, Pages), storage (R2, D1, KV, Durable Objects), delivery (CDN, cache), and protection (WAF, Bot Management, Zero Trust, DNS) — while treating the things that propagate instantly and globally (DNS records, WAF rules, cache purges) as gated, because at the edge a mistake is live everywhere before you've finished typing.

## What this is NOT

Not affiliated with Cloudflare and not a replacement for its docs — Workers runtime, bindings, and dashboard change, so verify. Not a licence for an agent to edit production DNS or disable security features on its own. The agent builds and deploys to preview; a human owns production DNS, WAF, and anything that changes what the world can reach.

## Method

1. **Deploy through code and previews.** Wrangler + version control for Workers/Pages; every change gets a preview deployment before production. A Worker pushed straight to prod is a global change with no rehearsal.
2. **Edge compute stays small and stateless.** Workers do one thing within CPU/time limits; state lives in KV (eventually-consistent, cache-like), D1 (SQL), R2 (objects), or Durable Objects (coordination) — chosen for the access pattern, not habit. Secrets are Wrangler secrets, never in code or a prompt.
3. **Cache deliberately, purge surgically.** Set cache rules and TTLs for what's actually cacheable; purge by URL/tag, not "purge everything," which stampedes your origin. A blanket purge on a busy site is a self-inflicted traffic spike.
4. **WAF and Bot Management as layered defense.** Managed rules on, custom rules for your app's shape, rate limiting on expensive and auth endpoints. Security rules are tested against real traffic patterns before enforcing, so you block attacks, not customers.
5. **DNS is the most dangerous surface — gate it.** A wrong DNS record takes your site or mail down globally in seconds. DNS changes are human-approved on the exact record, proxied/orange-cloud status is deliberate, and changes are made with a rollback in hand.
6. **Zero Trust for internal access.** Put internal tools and admin behind Cloudflare Access with real identity, not an IP allowlist or a shared secret. An internal service on the open internet is a breach with a countdown.
7. **Observe the edge.** Workers analytics, logs (Logpush), and error rates wired in; a Worker failing at the edge is invisible until customers can't load the page. Watch CPU time and sub-request limits before they throttle you.
8. **Gate the irreversible and the global.** Production DNS edits, disabling WAF, deleting an R2 bucket or D1 database, or a full cache purge pause for a human on the exact effect. Test in a staging zone / preview first.

## Quality bar

Workers/Pages deploy via code with previews before prod · edge compute is small, stateless, and secret-safe · storage matches the access pattern · caching is deliberate and purges are surgical · WAF/rate-limiting is tested before enforcing · DNS changes are human-gated with rollback · internal access is behind Zero Trust identity · the edge is observed · global/irreversible actions require a human.

## Guardrails & escalation

Production DNS, WAF disable, and data-store deletion are never an agent's default — they propagate globally and some are unrecoverable. Anything fronting personal data has TLS, appropriate geo/compliance settings, and an owner. A security-rule change that would block legitimate traffic, or a DNS edit that would affect mail/deliverability, escalates to the responsible owner with a rollback plan. A full cache purge on a production zone is a human decision, made knowingly.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Cloudflare public concepts: Workers/Pages, Wrangler, KV/D1/R2/Durable Objects, cache rules, WAF/Bot Management, rate limiting, DNS proxy status, Zero Trust/Access, Logpush. Confirm current runtime, bindings, and limits against Cloudflare's own documentation.
