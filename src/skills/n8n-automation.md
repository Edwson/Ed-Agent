---
name: n8n-automation
description: Use this skill to design, build, and harden workflow automations in n8n — mapping a manual process to triggers and nodes, wiring APIs and data transforms, and making the result reliable, secure, and affordable to run. For automating a repetitive multi-tool process, debugging a flaky workflow, or reviewing an automation before it touches production data. Not official n8n support, and never a licence to move money, delete data, or act irreversibly without a human in the loop.
---

# n8n Automation

> **What this is** — a repeatable method for turning a manual, multi-tool process into a dependable n8n workflow: decomposing the process into triggers, nodes, and data transforms; building and debugging it; and giving it the reliability, secret-handling, and cost discipline a real automation needs. It treats a workflow as software that must be tested, not a toy that "mostly works."
> **What this is NOT** — **not official n8n support or a security audit**, not a guarantee your third-party APIs behave, and not authority to perform irreversible or high-stakes actions unattended. Automations that send money, delete records, email customers, or change permissions stay gated behind an explicit human approval. Credentials are handled by the platform's secret store, never hard-coded.

## When to use this
- A repetitive process spans several tools (form → CRM → email → spreadsheet) and should run itself.
- An existing workflow is flaky — silent failures, duplicate runs, rate-limit errors — and needs diagnosing.
- An automation is about to touch production data or customers and needs a reliability/security pass first.
- A team wants to know whether a process *should* be automated, and where the human checkpoints belong.

## Operating principle
Model the process before wiring nodes. A good automation is a clear map of triggers, steps, data shape, and failure modes — the n8n canvas is just where that map gets expressed. Idempotency, error handling, and secret hygiene are designed in from the start, not patched on after an incident. Anything irreversible gets a human gate; the automation proposes, a person confirms.

## Capability 1 — Workflow design & node mapping
**Goal.** Turn a manual process into a concrete n8n workflow design.
**Inputs.** The process today, the systems involved, the trigger event, and what "done" looks like.
**Method.**
1. Write the process as **trigger → steps → outcome** in plain language before opening n8n.
2. Choose the **trigger** (webhook, schedule/cron, app event, manual) and the node path for each step.
3. Map the **data shape** end to end — what each node receives and emits — and where transforms/`Set`/`Code` nodes are needed.
4. Mark **branch points** (IF/Switch) and where a **human approval** step belongs.
5. Identify external APIs, their auth, and their rate limits up front.
**Output.** A node-by-node plan: trigger, sequence, data mapping, branches, and human checkpoints.
**Quality bar.** The plan is complete enough to build from; data flow is explicit; irreversible actions are flagged as gated.

## Capability 2 — Building & debugging
**Goal.** Implement the workflow and get it reliably passing on real inputs.
**Inputs.** The design, sandbox credentials, and sample data.
**Method.**
1. Build incrementally — add a node, **pin sample data**, and verify its output before the next.
2. Use expressions and `Code` nodes deliberately; keep transforms readable and testable.
3. Debug with **execution logs**: inspect each node's input/output, reproduce the failing item, isolate the break.
4. Handle the common failure modes — pagination, empty results, type mismatches, timeouts — explicitly rather than hoping.
5. Test edge cases (no results, malformed payload, API error) before considering it done.
**Output.** A working, tested workflow with sample executions and known-good behaviour on edge cases.
**Quality bar.** Runs deterministically on real inputs; failures are visible, not silent; edge cases are handled, not assumed away.

## Capability 3 — Reliability, security & cost
**Goal.** Make the workflow safe to run unattended and cheap enough to keep.
**Inputs.** The built workflow and its production context.
**Method.**
1. Add **error handling** — error-trigger workflows, retries with backoff, and alerting so failures surface.
2. Make steps **idempotent** — guard against duplicate runs and double-sends with dedupe keys or state checks.
3. Keep **secrets in n8n credentials**, never in nodes or code; scope API tokens to least privilege.
4. Put **human approval gates** on anything irreversible — payments, deletions, outbound customer comms, permission changes.
5. Watch **cost and load** — execution volume, external API quotas, schedule frequency — and tune to fit.
**Output.** A hardened workflow with error handling, idempotency, secret hygiene, human gates, and a cost profile.
**Quality bar.** A failed run alerts rather than disappears; re-runs don't double-act; no secret is exposed; nothing irreversible happens without a person.

## Worked example (illustrative)
*Illustrative only.* Inbound demo requests should flow from a form into the CRM, notify sales, and schedule a follow-up. Design: **webhook trigger → validate payload (IF) → upsert contact (dedupe on email) → Slack notify → create follow-up task**. Build: each node pinned to a sample submission, tested with a malformed payload that the IF node rejects cleanly. Harden: an error-trigger workflow posts failures to a channel; the upsert is idempotent so a double-submit doesn't create two contacts; the CRM token is a scoped credential; because nothing here is irreversible, no approval gate is needed — but the "send contract" variant they wanted later *does* get one. Silent failures become visible; duplicates become impossible.

## Guardrails & escalation
- **Human gate on irreversible actions:** money movement, deletions, customer-facing sends, and permission changes require explicit human approval inside the flow — the automation never does these alone.
- **Secrets stay in the vault:** use n8n's credential store; never hard-code API keys or tokens into nodes, code, or exported JSON.
- **Not a security or compliance sign-off:** for workflows touching regulated or personal data, route the data-handling and retention questions to the relevant security/privacy owner.
- **Test before production:** build against sandbox credentials and sample data; don't debug on live customer records.

## References & sources
- **n8n** official documentation — nodes, expressions, error-trigger workflows, and credential management.
- General **workflow-automation** and integration patterns (webhooks, idempotency keys, retry/backoff, dead-letter handling).
- API-integration best practice — least-privilege tokens, rate-limit handling, pagination.
- Reliability-engineering basics (alerting on failure, safe retries) applied to no-code/low-code automation.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
