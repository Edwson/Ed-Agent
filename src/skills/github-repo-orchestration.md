---
name: GitHub Repo Orchestration
description: Run a repository like an engineering org with an agent — PR-first flow, CI as the merge gate, branch protection, CODEOWNERS, Dependabot, and release discipline — so an agent can move fast in the repo without anything unreviewed reaching main. For developers orchestrating GitHub with AI.
audience: developer · platform
---

# GitHub Repo Orchestration

## What this is

A method for driving GitHub with an agent so the repository stays the source of truth and the gate, not a place where an agent quietly force-pushes to main. It covers the whole loop — branches, pull requests, Actions/CI, protection rules, code owners, dependency and secret hygiene, and releases — so speed comes from automation and safety comes from the rules the repo enforces on everyone, agent included.

## What this is NOT

Not affiliated with GitHub and not a replacement for its docs — Actions syntax, API, and settings change, so verify. Not a licence for an agent to hold broad write tokens or bypass protection. The agent opens PRs and runs checks; a human (or CODEOWNERS) approves what merges, and protected branches are protected from the agent too.

## Method

1. **Branch, never commit to main.** Every change is a branch and a pull request — the agent's output is a proposal reviewed as a diff, not a fait accompli. Small, single-purpose PRs review faster and revert cleaner than one giant "AI changes" commit.
2. **CI is the merge gate.** Required status checks (build, tests, lint, type-check) must pass before merge; branch protection enforces it. "It looks done" is not done — a green required check is.
3. **Protect main, require review.** Branch protection: require PR review, require checks, disallow force-push and deletion, require up-to-date branches. CODEOWNERS routes review to the people who own the touched paths. The agent cannot merge its own unreviewed PR.
4. **Least-privilege tokens, scoped and short.** Use fine-grained PATs or GitHub App / OIDC tokens scoped to the exact repo and permissions; `GITHUB_TOKEN` in Actions gets the minimum `permissions:` block. No broad, long-lived tokens in an agent's hands or a workflow.
5. **Secrets never touch the tree.** Secrets live in Actions/repo/environment secrets, never committed, never echoed in logs. Enable secret scanning and push protection so a leaked key is blocked, not merged.
6. **Dependencies stay current and reviewed.** Dependabot for updates and alerts; a major bump is a reviewed PR with tests, not an auto-merge. A pinned, scanned dependency tree is a supply-chain control, not a chore.
7. **Actions do one job, pinned.** Workflows are minimal, pin third-party actions to a commit SHA (not a moving tag), and gate deploys behind environments with required reviewers. A deploy job with no environment gate is a production incident waiting on a merge.
8. **Release with a trail.** Tag and release with generated notes; releases are cut from a reviewed main, and the changelog is history — appended, never rewritten.

## Quality bar

Every change is a reviewed PR, never a direct push to main · required CI checks gate the merge · main is protected against force-push/deletion with required review · CODEOWNERS routes review · tokens are fine-grained, scoped, short-lived · secret scanning + push protection are on · Dependabot runs and majors are reviewed · third-party actions are SHA-pinned · deploys are environment-gated.

## Guardrails & escalation

Force-push to a protected branch, disabling protection, rotating org secrets, or changing repo/member access are human actions — never an agent's default. Anything that deploys to production goes through an environment with a required reviewer. A failing security scan or exposed secret stops the merge and escalates, it is not overridden. If the agent's PR keeps growing past its stated scope, close it and re-scope — a runaway branch doesn't converge.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- GitHub public concepts: pull requests, branch protection, required status checks, CODEOWNERS, Actions `permissions`, environments, secret scanning / push protection, Dependabot, fine-grained PATs / GitHub Apps. Confirm current behaviour against GitHub's own documentation.
