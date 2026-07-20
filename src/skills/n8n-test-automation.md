---
name: n8n Test Automation
description: Build fully-automated end-to-end and integration test pipelines in n8n — scheduled runs, HTTP/API assertions, webhook triggers, contract checks, and fail-loud alerting — so a product's critical paths are verified on a cadence, not by hope. For developers and QA who want tests that run themselves.
audience: developer · QA · ops
---

# n8n Test Automation

## What this is

A method for turning n8n (the open-source workflow automation tool) into a standing test harness. n8n is usually framed as "connect app A to app B" — but its scheduler, HTTP node, code node, and error handling make it a capable engine for **automated smoke, integration, and synthetic-monitoring tests** that run on a cron, assert on real responses, and shout when something breaks. This is the discipline for building those pipelines so they catch regressions instead of becoming flaky noise everyone mutes.

## What this is NOT

Not official n8n documentation and not affiliated with n8n. Not a replacement for unit tests inside your codebase (those belong in CI, close to the code) or for a full APM/observability stack. It is the layer that verifies **behaviour across systems** — the checks that only fail when a real, deployed path is broken. Node names and UI change; the testing discipline doesn't.

## Method

1. **Write the assertion before the workflow.** One line per test: given this input, this endpoint must return this shape / status / value within this time. A test with no explicit pass condition is a request that logs, not a test.
2. **One trigger, three shapes.** Schedule Trigger for periodic smoke tests (every 5–15 min for critical paths); Webhook Trigger for on-deploy runs (CI calls it after a release); manual for authoring. Keep the *test body* identical across all three so a green scheduled run and a green deploy run mean the same thing.
3. **Assert in a Code node, never by eyeballing.** After each HTTP Request, a Code node checks status, JSON shape, and specific values, then `throw new Error(...)` on failure with a message that names *what* was expected and *what* came back. A silent 200 that returns garbage must fail the test.
4. **Test the contract, not the vibe.** Validate the response against a schema (fields present, types correct, enum values legal) — the same discipline the CDS component contracts use. Snapshot the shape; diff against it; fail on drift.
5. **Make failure loud and specific.** The error branch (n8n's error workflow or an IF on the assertion) posts to Slack/email/PagerDuty with the test name, the diff, and a link to the run. "Something failed" is not an alert; "checkout `POST /orders` returned 500, expected 201, since 09:42" is.
6. **Isolate side effects.** Tests that create data clean up after themselves (teardown step) or run against a dedicated test tenant. Never let a synthetic test pollute production analytics, send a real email, or move real money — gate anything irreversible behind an explicit test-mode flag.
7. **Retry transient, fail persistent.** Set retries on network flakiness (2–3, backing off) so a blip doesn't page anyone; but a check that fails every retry is a real failure and must escalate. Distinguish "the network hiccuped" from "the feature is broken" in the alert.
8. **Version the workflow.** Export the workflow JSON into your repo. A test harness that only exists in one person's n8n instance is tribal knowledge that dies when they leave — the same failure the CDS "landing on a system you didn't build" method exists to prevent.

## Quality bar

Every test has an explicit pass condition · assertions live in code, not in a human's glance · failures name expected-vs-actual · alerts are specific and routed to someone on call · no test mutates production state without a test-mode gate · transient failures retry, persistent ones escalate · the workflow JSON is in version control.

## Guardrails & escalation

Credentials live in n8n's credential store, never in a node's plain text or a prompt. Tests that touch personal data run against synthetic or test-tenant data — a "test" that reads real customer records is a privacy incident wearing a QA badge. Load-generating tests get owner sign-off before they point at production. If a scheduled test starts flapping (green/red/green), it is quarantined and fixed, not muted — a muted test is worse than no test, because it looks like coverage.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- n8n public concepts: Schedule/Webhook Triggers, HTTP Request node, Code node, Error Workflows, credential store. Confirm current node behaviour against n8n's own docs before shipping.
