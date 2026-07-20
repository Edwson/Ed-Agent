---
name: MySQL Backend
description: Design and operate a MySQL backend that stays correct, fast, and safe — a schema modelled from access patterns, indexes that match real queries, parameterised access that closes injection, least-privilege accounts, and backups proven by restore. Every destructive or schema-changing operation gates on a human and a backup. For developers building on MySQL or MariaDB.
audience: backend developer · full-stack developer · founder
---

# MySQL Backend

## What this is

A method for building and running MySQL so it holds up in production. It models the schema from how the data is actually queried, indexes for the real workload, accesses the database in a way that closes SQL injection by construction, runs application accounts at least privilege, and treats backups as untested until a restore proves them. The defining rule: any operation that can lose data or change the schema in production stops for a human and a fresh backup first.

## What this is NOT

Not affiliated with or endorsed by Oracle / MySQL, and not a substitute for the current MySQL or MariaDB documentation. Not a licence to run destructive SQL against production on an agent's say-so — `DROP`, `TRUNCATE`, un-`WHERE`d `UPDATE`/`DELETE`, and migrations are human-gated, backup-first, and rehearsed on a copy. Not a claim to be a DBA for high-scale or high-availability tuning; where replication topology, sharding, or serious performance engineering is at stake, it defers to a specialist. Not an ORM tutorial — the principles hold whether you use raw SQL or a query builder.

## Method

1. **Model from access patterns.** Design tables from the queries the application will run, not from an abstract diagram; normalise for integrity, denormalise deliberately and only where a measured read path demands it.
2. **Choose types and keys tightly.** Right-sized column types, a sensible primary key, foreign keys and constraints where integrity matters, and a consistent charset/collation (utf8mb4) from the start.
3. **Index for the real workload.** Index the columns that filter, join, and sort the hot queries; verify with `EXPLAIN`; avoid the trap of indexing everything, which slows writes and wastes space.
4. **Close injection by construction.** Parameterised queries / prepared statements everywhere — never string-concatenate user input into SQL. This is not optional.
5. **Run least privilege.** The application account has only the grants it needs; no shared root, no `GRANT ALL`. Separate accounts for migrations and for runtime.
6. **Gate destructive and schema changes.** `DROP`/`TRUNCATE`/mass `UPDATE`-`DELETE`/migrations run only after a fresh backup, a review of the exact statement, and a rehearsal on a copy — with a rollback plan. A human signs.
7. **Prove backups by restore.** Automated backups plus a periodic test restore — a backup you have never restored is a hope, not a backup. Know your recovery point and time objectives.
8. **Operate with observability.** Slow-query log, connection-pool sizing, and sensible timeouts; watch for the N+1 and full-table-scan patterns before they become an incident.

## Quality bar

The schema is modelled from real access patterns with tight types, keys, and utf8mb4 · indexes match the hot queries and are verified with EXPLAIN · all access is parameterised — no string-built SQL · application accounts run least-privilege · every destructive or schema change is backup-first, reviewed, rehearsed, and human-signed · backups are proven by a test restore with known RPO/RTO · slow queries and connection limits are observed.

## Guardrails & escalation

A working method, not the documentation — verify syntax and features against the MySQL/MariaDB version in use. The hard rules are non-negotiable: parameterised access, least privilege, and human-gated backup-first destructive operations. Never run `DROP`, `TRUNCATE`, an un-`WHERE`d write, or a migration against production without a fresh backup, a reviewed statement, and a rollback plan — and never on an automated agent's initiative alone. Where high availability, replication, or serious scale tuning is in play, route to a DBA. Anything touching regulated or personal data brings retention and protection obligations — handle accordingly.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: MySQL documentation (dev.mysql.com/doc) — verify against the version in use. Related: the AWS cloud-architect, Firebase backend-ops, and Databricks lakehouse skills.
