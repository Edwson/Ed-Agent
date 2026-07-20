---
name: Databricks Lakehouse
description: Build analytics and data pipelines on Databricks that stay correct, governed, and cost-controlled — medallion architecture with Delta Lake, jobs and workflows with real failure handling, Unity Catalog governance and PII protection, and cluster/cost discipline. Irreversible data operations gate on a human. For data engineers and analysts working in the lakehouse.
audience: data engineer · analytics engineer · data analyst
---

# Databricks Lakehouse

## What this is

A method for working in Databricks so pipelines are trustworthy, data is governed, and the bill doesn't surprise anyone. It structures ingestion into a medallion architecture on Delta Lake, builds jobs with real failure handling and idempotency, governs access and lineage through Unity Catalog with PII protected, and keeps compute costs honest through cluster sizing and job discipline. Operations that can't be undone — dropping tables, overwriting production data, deleting a catalog — stop for a human.

## What this is NOT

Not affiliated with or endorsed by Databricks, and not a substitute for the current Databricks documentation, which moves quickly. Not a licence to run destructive data operations on an agent's initiative — production overwrites and deletes are human-gated and reversible where the platform allows (Delta time travel, backups). Not a promise to be a platform architect for petabyte-scale or complex multi-workspace governance; where that's the stake, it defers to a specialist. Not a cost-blind "spin up a big cluster" habit — compute discipline is part of correctness here.

## Method

1. **Structure with medallion + Delta.** Bronze (raw), Silver (cleaned/conformed), Gold (business-ready) on Delta Lake — so lineage is legible and reprocessing is possible. Schemas are explicit, not inferred-and-forgotten.
2. **Build idempotent, observable jobs.** Workflows that can re-run safely (merge/upsert, not blind append), with clear failure handling, alerting, and retries — a pipeline that fails silently is worse than one that fails loudly.
3. **Govern with Unity Catalog.** Catalogs/schemas/tables with access controls and lineage; a single governed source of truth, not per-notebook copies drifting apart.
4. **Protect sensitive data.** Identify PII, apply column/row controls and masking, and respect data-residency and retention obligations — governance is part of the pipeline, not a later audit.
5. **Discipline the compute.** Right-size clusters, use job clusters over always-on where possible, enable autoscaling and auto-termination, and prefer SQL warehouses for BI — cost is a correctness property, not an afterthought.
6. **Gate irreversible operations.** Dropping tables, overwriting Gold, or deleting a catalog runs only after review, with a recovery path (Delta time travel / backup) confirmed and a human signing off.
7. **Test the data, not just the code.** Data-quality expectations (row counts, null rates, referential checks) on the pipeline so bad data is caught before it reaches Gold and a dashboard.
8. **Manage notebooks and code like software.** Version control, parameterised jobs, and no secrets in notebooks — reproducibility over one-off cells that no one can rerun.

## Quality bar

Ingestion follows a medallion architecture on Delta with explicit schemas · jobs are idempotent, observed, and handle failure loudly · Unity Catalog governs access and lineage as one source of truth · PII is identified, protected, and residency/retention respected · compute is right-sized with auto-termination and cost watched · irreversible operations are recovery-confirmed and human-gated · data-quality checks guard Gold · notebooks and jobs are version-controlled and secret-free.

## Guardrails & escalation

A working method, not the documentation — verify features (Unity Catalog, Delta, workflows) against the current Databricks platform, which changes fast. Irreversible data operations (dropping tables, overwriting production, deleting catalogs) are human-gated with a confirmed recovery path, never on an automated agent's initiative. Data governance is non-negotiable: PII protection, access control, residency, and retention are set up with the pipeline, and anything touching regulated data or cross-border transfer is routed to the data-governance owner or counsel. Where petabyte scale or complex multi-workspace architecture is in play, defer to a platform specialist.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: Databricks documentation (docs.databricks.com) — verify against the current platform. Related: the MySQL backend, AWS cloud-architect, and Google Analytics skills.
