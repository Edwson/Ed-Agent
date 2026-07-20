---
name: Organizational Memory Architect
description: Turn a company's scattered history — tickets, epics, reports, chat, version history, UAT and release records — into a cited, role-scoped, continuously maintained institutional memory. Decision archaeology with provenance, so domain knowledge survives attrition and new people ramp in days, not quarters.
audience: founders · PMs · design & engineering leads · people ops
---

# Organizational Memory Architect

> **What this is** — a working method for building a company's institutional memory with an AI agent: reconstructing past decisions and constraints from the artifacts the company already has (issue trackers, epics, reports, chat exports, version history, UAT and production release records), labelling every conclusion by its evidence, and distilling the result into role-scoped briefs — so a PM, a designer, an engineer, and a new hire each receive the slice of history their job actually needs. The knowledge stops living in three people's heads and starts living in a maintained, citable record.
>
> The premise, in one sentence: **a system only three people understand is not a system — it is a hostage situation.** This method is the ransom-free exit.

## The pain this solves

Name the costs before the method, because the method is judged against them:

1. **Ramp cost.** A new senior hire spends 6–12 weeks reverse-engineering context that already exists — scattered across 4 tools and 3 veterans' calendars. Every onboarding meeting is a veteran re-narrating history from memory, differently each time.
2. **Attrition loss.** When the person who "knows why the payment flow is like that" leaves, the company doesn't lose a headcount — it loses the only index to five years of decisions. The artifacts remain; the ability to read them leaves.
3. **Re-litigation.** Teams re-open decisions that were settled — and re-make documented mistakes — because the original rationale is findable by nobody. The most expensive meetings in a company are the ones deciding something for the second time.
4. **Strategy drift.** Veterans on project A can't see how project B's constraints changed this quarter; leadership's strategy update never reaches the level where daily trade-offs are made. Everyone is aligned to a memory of the strategy.
5. **The unwritten rules tax.** "We never touch that module before a release", "Legal has to see anything with that word in it" — enforced by folklore, invisible to newcomers, discovered by incident.

A knowledge base does not fix these — companies with wikis have all five problems. The fix is **decision archaeology with provenance plus role-scoped distribution plus a maintenance loop**. Each element alone fails: archaeology without provenance produces confident fiction; provenance without distribution produces an archive nobody reads; distribution without maintenance produces a beautifully organised snapshot of last quarter.

## What this is NOT

- **Not a surveillance tool.** The corpus is the company's *work record* — tickets, specs, commits, project channels. It is not private messages, HR conversations, or anything a reasonable colleague would consider personal. Scope is allowlisted, named, and approved before the first fetch.
- **Not an oracle of "why".** An AI reading commit diffs and ticket histories produces *hypotheses* about past decisions, not facts. Every reconstructed rationale is labelled **documented** (a source states it — linked) or **inferred** (deduced from artifacts — awaiting human confirmation). An inferred rationale presented as fact is not institutional memory; it is institutional fiction with good formatting.
- **Not a replacement for the people who were there.** The method's most valuable step is the shortest: putting the inferred decisions in front of the humans who made them and asking "is this what happened?" The archive drafts; the veterans sign.
- **Not legal-discovery or compliance tooling.** If the corpus touches regulated records, privileged communications, or anything under litigation hold, that portion routes to counsel before any agent reads it.
- **Not a one-shot report.** A snapshot of institutional memory starts rotting the day it ships. This method ends with a maintenance cadence, or it hasn't ended.
- **Not a performance file.** The record explains decisions; it never grades the people who made them. The moment an output drifts toward "who was slow" or "who was wrong", it has left this method's scope.

## When to use

- Onboarding costs weeks because the real rules live in veterans' heads and 40 Slack scrollbacks.
- A key person is leaving (or just left) and their domain knowledge is about to walk out with them.
- Teams keep re-litigating decisions that were already made — and re-making documented mistakes.
- Leadership wants project status, decision history, and strategy alignment readable by role, not archaeology-by-meeting.
- An acquisition, audit, or platform migration demands a defensible account of how the product got here.
- The company is wiring AI agents into its tools anyway — and wants them to inherit the same law humans follow, from day one.

## Operating principle

**Provenance is the product.** A memory system is only as trustworthy as its worst citation. Every claim in every output links to its source (ticket ID, message permalink, commit, release record) or carries the *inferred* label and a named human who should confirm it. The agent produces; the veterans verify; the record carries receipts. And the whole thing begins where every responsible data project begins — with the security question, not the crawl.

## Method

### Phase 0 — the security gate (before anything reads anything)

1. **Convene IT/InfoSec and data protection first.** Decide in writing: which systems may be read, by what service identity, with what retention, on which infrastructure (vendor cloud vs. on-prem — for regulated or IP-sensitive corpora, on-prem or VPC-scoped models are the honest default). Produce three artifacts:
   - an **allowlist** — named projects, channels, repos, spaces;
   - an **exclusion list** — HR and people-ops content, legal-privileged material, incident reports under privilege, DMs and private channels, anything under litigation hold;
   - a **data-handling note** — residency, retention, who can query the outputs, how access is logged.
   In works-council jurisdictions (Germany, Austria, Netherlands and peers), processing employee-generated records at scale may require consultation — ask before, not after. An AI workflow that starts by quietly exfiltrating the backlog is not a workflow; it is an incident.
2. **Announce it.** Tell the org what is being read, why, and what will never be read. A memory system built in secret poisons the trust it needs to be used. The announcement is also your best source of "you should really talk to X about Y".

### Phase 1 — inventory and calibration

3. **Inventory the corpus and rate each source.** Map what exists and what each source is *good for* — the reliability model matters more than the volume:
   | Source | Reliably tells you | Routinely lies about / omits |
   |---|---|---|
   | Tickets / epics | what was asked, when, acceptance criteria | why; scope changes made verbally |
   | Project chat | why, objections, the decision moment | resolution (decisions often move to calls) |
   | Version history (code/design) | what actually changed, when, by whom | intent; the alternatives that were rejected |
   | Specs / reports | intended behaviour, the official story | what shipped differently and why |
   | UAT / QA records | what failed before release, severity | root cause; what was waived and by whom |
   | Release / production logs | what reached users, when, rollbacks | the discussion that preceded the rollback |
   No single source states the truth. The method triangulates: a decision is *documented* only when at least one source states the rationale explicitly; agreement between two artifact types upgrades confidence; contradiction between sources is itself a finding worth recording.
4. **Pilot on one project, not the company.** Pick a project with living veterans, moderate history (1–3 years), and current pain. Prove the loop end-to-end there before scaling — the pilot's confirmed record is also your sales demo to the rest of the org. (Scaling a method that hasn't survived one project's veterans is how these initiatives die as shelfware.)

### Phase 2 — decision archaeology

5. **Mine the decision points.** Walk the timeline for forks: a requirement that changed mid-flight, a rewrite, a rollback, a UAT round that failed and what shipped after, a feature cut at the last minute, a dependency swapped. Signals worth automating: ticket status ping-pong, epics whose scope text was edited after work began, chat threads that end in "let's take this to a call" followed by a changed artifact, commits that revert commits, release notes that quietly drop an announced item.
6. **Draft a decision record per fork** — one page, fixed shape:
   - **Context** — what was true and what was pressing at the time (with dates);
   - **Options visible then** — not the options obvious now;
   - **What was chosen** — and who owned the call, if documented;
   - **Observed consequences** — what the record shows happened after;
   - **Constraint left behind** — the rule this decision created ("we can't change X without Y");
   - **Sources** — every claim linked (ticket ID, permalink, commit, release entry);
   - **Evidence label** — *documented* or *inferred*, per the honesty layer below.
7. **Label the evidence — the honesty layer.** Mark each record **documented** (rationale stated in a linked source) or **inferred** (reconstructed from artifacts). Mark each figure **measured** (from a system of record) or **estimated**. Two binding rules: an inference never hardens into history by repetition; and when sources contradict each other, the record says so instead of choosing the tidier story.
8. **Confirm with the humans who were there.** Route inferred records to the people involved — a 15-minute review pass, not a memoir request. Three outcomes, all recorded with attribution and date: *confirmed*, *corrected* (the correction becomes the record, the inference is kept as history), or *disputed* (both accounts stay, labelled). Departed authors' records stay labelled inferred — honestly, forever if need be.

### Phase 3 — distribution by role

9. **Distill the confirmed base into working briefs** — each one short, cited, and built for its reader's decisions, not for completeness:
   - **PM brief** — per project: decision history, open constraints, current status against strategy, the three questions this project keeps answering wrong;
   - **Engineering brief** — architectural decisions with their "why", the *don't-touch list* with origin stories (a constraint without its story gets deleted by the next confident refactor), environment quirks, the waiver history from UAT;
   - **Design brief** — pattern decisions, research findings that still bind, the graveyard of rejected directions and why they died (nothing wastes a design team like re-exploring a documented dead end);
   - **Leadership digest** — cross-project: where reality and strategy diverged this quarter, decisions made below deck that changed the ship's heading;
   - **Onboarding packs, calibrated two ways** — by **position** (a PM pack ≠ an engineer pack) and by **background** (a senior domain hire skips fundamentals; a career-switcher gets them; both get the same constraints and the same citations). Day-one goal: the newcomer can state the product's three load-bearing constraints, the last two major decisions in their area, and who to ask about each.
10. **Write the rules where work happens.** Promote recurring constraints into the team's system of record (Confluence/Notion/wiki) as short, cited rules — and, where the team runs agents, into a machine-readable brief (an AGENTS.md or a project MCP server) so human and AI readers consume the same law. One source, two kinds of reader; neither can drift from the other because neither is a copy.

### Phase 4 — the maintenance loop (or it was a snapshot)

11. **Run a delta pass per week or per release**, whichever is shorter: append new decision records, update project status, refresh the briefs' "current constraints" sections, and flag contradictions between the record and observed reality. History entries are never edited — corrections are new, dated entries. Budget honesty: the pass should cost minutes, not hours; if it costs hours, the scope is wrong, not the team.
12. **Instrument the memory itself.** Track what gets asked and what gets read: questions that keep escaping the record reveal the next mining target; briefs nobody opens reveal a reader mismatch, not lazy readers. Retire or merge artifacts that stopped earning their maintenance — a smaller, living record beats a complete, dead one.

## What good looks like (measure it honestly)

- **Ramp time** — time until a new hire's first reviewed contribution, before vs. after (label it: this is a proxy, confounded by hiring quality and season — report it as observed, not as proof).
- **Question deflection** — share of "how did we get here?" questions answered by the record with citations vs. escalated to a veteran.
- **Re-litigation rate** — decisions re-opened without new information, counted from meeting notes; the record should make the second debate short ("here's the record — what's new?").
- **Veteran interrupt load** — self-reported time veterans spend re-narrating history (an estimate, and say so).
- **Record vitality** — delta-pass streak and citation-click depth; a maintained record is used, a used record is maintained.

Do not promise percentages up front. The honest pitch to leadership is: *these five numbers, measured before and after the pilot, with their confounds named.* A method that manufactures its own ROI slide has already broken its first rule.

## Failure modes and their countermeasures

| Failure mode | What it looks like | Countermeasure built into the method |
|---|---|---|
| Confident fiction | Fluent "history" nobody can trace | Citation-per-claim; documented/inferred labels survive every summary |
| Scope creep into surveillance | "While we're at it, let's read DMs" | Exclusion list is signed; expansions repeat the Phase-0 gate |
| Shelfware | Beautiful wiki, zero readers | Role-scoped briefs sized to decisions; usage instrumentation; retire dead artifacts |
| Snapshot rot | Record describes last quarter | Delta cadence is part of the definition of done |
| Veteran alienation | "The bot rewrote my history" | Veterans confirm before inference becomes record; corrections carry their name |
| Tidy-story bias | Contradictions silently resolved | Contradiction is a recorded finding, never an editorial choice |
| Blame archaeology | Record used in a performance dispute | Personnel conclusions out of scope, stated in the charter; access-logged outputs |

## Guardrails & escalation

- **InfoSec approval precedes ingestion, every time** — including scope *expansions*. New source, new sign-off.
- **Privacy by scope**: work artifacts only; no private messages, no HR or performance content; personal data minimised per GDPR Art. 5(1)(c) and access-logged. People are quoted from work records, not profiled from them. Works-council consultation where applicable.
- **Privileged and regulated material routes to counsel** before any agent contact — litigation holds, board materials, incident reports under privilege.
- **Inference discipline is binding**: an inferred rationale is never promoted to documented without a named human confirmation. If this guardrail conflicts with a stakeholder's desire for a cleaner story, the guardrail wins.
- **Personnel conclusions are out of scope.** The record explains decisions; it does not grade the people who made them. Anything drifting toward individual performance assessment stops and routes to leadership/HR as a human matter.
- **Departure risk is not an excuse to skip consent**: when the goal is capturing a leaver's knowledge, the leaver is a participant, not a target — and their review of the record of their own work is the single highest-value hour in this entire method.
- **When the record is subpoenaed, audited, or due-diligenced**, hand over the provenance chain, not a narrative — that is what it was built for.

## References

- GDPR Art. 5(1)(c) data minimisation · Art. 6 lawful basis for processing internal records; works-council codetermination norms (e.g. German BetrVG §87) for employee-data processing
- Architecture Decision Records (ADR) practice — Michael Nygard's decision-record format
- "Working knowledge" transfer literature: Nonaka & Takeuchi's tacit-to-explicit knowledge spiral (SECI)
- Blameless postmortem discipline (Google SRE) — history as learning, not indictment
- Append-only record discipline as practised in regulated finance (SEC 17a-4-adjacent thinking, applied to product history)
- The single-designer field version of this method: the *Landing on a system you didn't build* onboarding protocol in the Edwson Design System showcase (design-system-showcase.html — AI-Native Development), of which this skill is the organizational generalisation

---
- Catalogue: https://edwson.com/consumer-design-system.html
- Machine contracts: https://edwson.com/cds/components.json (170 entries, agentProtocol, bundles, hardRules) · https://edwson.com/cds/tokens.json (both themes)
- Agent brief: https://edwson.com/cds/AGENTS.md · MCP precedent: https://github.com/Edwson/eds-mcp
