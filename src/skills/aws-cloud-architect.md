---
name: AWS Cloud Architect
description: Design, deploy, and operate AWS infrastructure with an agent — infrastructure-as-code, least-privilege IAM, cost guardrails, and the Well-Architected discipline — so a coding agent can build real cloud systems fast without leaving a security hole or a surprise bill. For developers and platform teams shipping on AWS.
audience: developer · platform · ops
---

# AWS Cloud Architect

## What this is

A method for putting an agent to work on AWS and getting the most out of it — provisioning, wiring services, and operating them — while keeping the things that go catastrophically wrong (public buckets, over-broad IAM, runaway spend, deleted prod) behind hard gates. AWS rewards automation and punishes carelessness at the same scale; this skill is how an agent extracts the first without the second.

## What this is NOT

Not affiliated with AWS and not a substitute for the AWS documentation or a security review — service APIs, limits, and pricing change constantly, so confirm against the console and current docs. Not permission for an agent to hold long-lived root or admin credentials. The agent proposes and builds; a human owns anything that spends, exposes, or destroys.

## Method

1. **Everything as code.** Provision through IaC (CDK, Terraform, CloudFormation, SAM) — never click-ops the agent can't reproduce or review. The diff is the proposal; `plan` before `apply` is the checkpoint.
2. **IAM least-privilege by default.** Scope every role and policy to the exact actions and resources it needs, with conditions. No `*:*`, no wildcard resources on write, no long-lived keys where a role or OIDC would do. An over-broad policy is the breach you haven't had yet.
3. **Private by default.** S3 buckets block public access unless a human explicitly opens one; security groups deny inbound by default; secrets live in Secrets Manager / SSM Parameter Store, never in code, env files, or a prompt.
4. **Cost is a design property.** Estimate the monthly cost of what you provision before you provision it; set budgets and billing alarms; prefer serverless and auto-scaling to always-on. Tag everything for attribution. A resource with no owner tag is a bill nobody will notice.
5. **Follow the Well-Architected pillars.** Operational excellence, security, reliability, performance, cost, sustainability — check the design against them, and state the trade-off you're making where you skip one. Multi-AZ for anything that matters; backups and a tested restore, not just snapshots.
6. **Observability from the start.** CloudWatch metrics, logs, and alarms wired as you build, not bolted on after an incident. An unmonitored service is one you'll debug from customer complaints.
7. **Gate the irreversible.** `terraform destroy`, deleting a database, emptying a bucket, changing prod IAM, or opening a security group to `0.0.0.0/0` pauses for a human who sees the exact effect. Run against a sandbox/dev account first; production changes go through a reviewed pipeline, never an ad-hoc agent run.
8. **Prefer managed, prefer smallest.** Managed services over self-hosted where they fit; the smallest instance/quant that meets the SLO over the biggest that fits the budget. Right-size from real metrics, not guesses.

## Quality bar

Infrastructure is code with a reviewed plan · IAM is least-privilege with no long-lived admin keys · storage and networks are private by default · monthly cost is estimated and budgeted with alarms · the design is checked against the Well-Architected pillars · observability ships with the service · destructive actions require a human on the exact effect · changes land in a non-prod account first.

## Guardrails & escalation

No agent holds root or standing admin credentials — use short-lived, scoped, auditable access (SSO/OIDC, assumed roles). Anything touching customer data has a residency, encryption (at rest + in transit), and compliance check before it ships; regulated workloads (PCI, HIPAA, SOC 2 scope) route through the responsible owner and, where relevant, counsel. Spend anomalies and security-group / IAM changes escalate immediately, not at month-end. Deleting data is never the agent's call.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- AWS public concepts: IAM, S3 Block Public Access, CDK/CloudFormation/Terraform, Secrets Manager/SSM, CloudWatch, Budgets, Well-Architected Framework. Confirm current APIs, limits, and pricing against AWS's own documentation.
