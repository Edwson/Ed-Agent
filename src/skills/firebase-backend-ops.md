---
name: Firebase Backend Ops
description: Build and maintain a Firebase backend with an agent — security rules first, Emulator-tested, App Check-protected, and cost-aware — so a Flutter or web app gets auth, data, functions, and storage that are fast to ship and safe to run. For developers maintaining a Firebase server layer.
audience: developer · mobile · ops
---

# Firebase Backend Ops

## What this is

A method for standing up and keeping healthy a Firebase backend — Auth, Firestore / Realtime Database, Cloud Functions, Storage, Hosting, Remote Config, Crashlytics — the way an agent should: rules and tests before features, and the failure modes (open data, runaway reads, unverified clients) closed by construction. Firebase makes a working backend in an afternoon; this skill is how to make one that survives contact with real users.

## What this is NOT

Not affiliated with Google or Firebase and not a replacement for the Firebase docs — SDKs, limits, and pricing change, so verify against the console. Not a licence to ship `allow read, write: if true`. The agent builds and maintains; a human owns anything that changes production security rules, deletes data, or moves billing.

## Method

1. **Security Rules are the product, not an afterthought.** Write Firestore/Storage rules alongside the data model — default deny, then grant the minimum. Rules are tested, not hoped: the Emulator Suite runs a rules test suite in CI. `if true` is a data breach with a deploy button.
2. **Model for the queries, not the entities.** Firestore is denormalized on purpose — design collections around how the app reads, keep documents small, and never write an unbounded fan-out. A query that scans a collection is a bill and a latency spike.
3. **Test locally against the Emulator Suite.** Auth, Firestore, Functions, and Storage run locally; the agent develops and tests there, never against production data. A "quick test" against prod is how you corrupt real users' records.
4. **Verify the client with App Check.** Enforce App Check on callable Functions and data access so only your real app talks to the backend — otherwise your Firestore is an open API anyone can script against.
5. **Functions are small, idempotent, and observed.** Cloud Functions do one thing, handle retries idempotently, set concurrency and memory deliberately, and log to Cloud Logging. Secrets go in the secret manager, never in the function's config or a prompt. Watch cold starts and set min instances only where latency demands it.
6. **Watch reads, writes, and quotas like a hawk.** Firestore bills per operation; a mis-scoped listener or an N+1 in a Function can 100× your cost overnight. Set budget alerts, review usage, and cache with Remote Config / client-side where it's safe.
7. **Crashlytics + Performance close the loop.** Wire Crashlytics and Performance Monitoring so the backend's real-world failures and latency are visible — the same "observability from the start" the AWS and edge skills insist on.
8. **Gate the irreversible.** Deploying rules to production, deleting a collection, changing Auth providers, or altering billing pauses for a human. Rules deploy through a reviewed pipeline with the Emulator test suite green, never an ad-hoc push.

## Quality bar

Security rules exist and are tested in the Emulator before any deploy · default-deny, minimum-grant · development never touches production data · App Check enforces real-client access · Functions are idempotent, observed, and secret-safe · read/write costs are estimated and budget-alarmed · Crashlytics/Performance are wired · production rule and billing changes require a human.

## Guardrails & escalation

Personal data in Firestore/Storage has a residency and consent check before it ships — a permissive rule on a collection of user records is a privacy incident, not a shortcut. Auth flows follow the CDS onboarding/consent patterns (symmetric consent, no dark defaults). Deleting user data or changing security rules in production is a human decision, logged; regulated data (children → COPPA, health, payments) routes through the responsible owner. When Firestore costs spike, stop and diagnose the query, don't raise the budget.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Firebase public concepts: Security Rules, Emulator Suite, App Check, Cloud Functions, Firestore/RTDB, Crashlytics, Performance Monitoring, Remote Config. Confirm current SDKs, limits, and pricing against Firebase's own documentation.
