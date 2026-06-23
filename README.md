<p align="center">
  <a href="img/ed_agent_Intro.mp4"><img src="img/ed_agent.png" width="160" alt="Ed Agent"></a>
</p>

<h1 align="center">Ed Agent</h1>

<p align="center">
  <b>A mission-swappable one-person army — for build, review <i>and</i> trust.</b><br>
  ▶ <a href="img/ed_agent_Intro.mp4">Watch the 30-second intro</a> · MIT · zero-dependency core
</p>

Once AI writes the code, the job stops being *"how do I write this"* and becomes *"should I
**trust** this?"* Ed Agent is built for that shift. It drives one requirement — **or any
content, or a diff** — through **nine stages** with a **swappable squad**, but it **stops at two
deliberation checkpoints** and surfaces the questions only a human can answer:

- **Was the intent captured, or is it guessing the project?** Unstated intent is the **#1 flagged risk**, not a silent guess.
- **Should you trust this** (not *"is it correct"*) — provenance, verification, blast radius, the confidence-vs-evidence gap.
- **Does the local optimum serve the global goal?** It flags the *technically-right, business-wrong* decision that digs a global pit.
- **Is it substance, or over-defensive ceremony?** The "looks-rigorous, all-filler" detector.

Plus a **mission-aware red team** that attacks every build for what its domain cares about,
**claim-level grounding** (Grounded / Ungrounded / Contradicted), a **memory that learns your
preferences**, **quality disciplines** (ban AI-tone filler · quantify-or-flag · no blind praise),
real artifacts at every stage, and a quantified ledger. Drop it into any bot via **MCP** or the
**`AGENTS.md`** brief. Zero-dependency core (Node 18+).

> _Click the mascot above to watch the intro._

> **Honest by construction.** Ed Agent does not pretend to *understand* your business — a
> harness can't. It forces the intent to be captured, runs deterministic trust / coherence /
> substance checks, and **puts the right question at the right node**. The judgment, the two
> checkpoints, and the two gates stay human. Velocity, not autonomy.

```bash
node bin/ed-agent.mjs "Build a REST API for user onboarding with rate limiting"   # → code squad
node bin/ed-agent.mjs "Launch a landing page for a new savings product"           # → marketing squad
node bin/ed-agent.mjs "Draft an NDA with a 12-month liability cap"                # → contract squad
node bin/ed-agent.mjs "KYC onboarding with EDD source of funds"                   # → finance squad (eds-mcp)
node bin/ed-agent.mjs --mission optimize --input case-study.md                    # → optimize squad (review)
```

## The squad swaps to the mission

The mission is auto-detected from the requirement (override with `--mission`):

| Mission | Squad | Produces |
|---|---|---|
| **Code** | Architect · Security · QA · Doc engineer | architecture · security review (STRIDE) · test plan · README |
| **Marketing** | Creative Director · Conversion Analyst · Consumer Psychologist · SEO | creative brief · conversion model · SEO plan · copy outline |
| **Contract** | Senior Lawyer · Risk-Control Officer · Negotiator · Semantic-Logic reviewer | clause map · risk register · negotiation positions · ambiguity review |
| **Finance** *(default)* | Planning · Regulation · Data · Development · QA · Risk & Governance | eds-mcp compliant build — scaffolded HTML/CSS/JS + conformance tests |
| **Optimize** *(總導師)* | Executor A · Reviewer B · Copy C · Data/Logic D · Market/SEO E | blind-score diagnostic · adversarial debate · de-AI'd draft · three-part output |

Browse committed runs in **[`examples/`](./examples/)** — one per mission.

## Review & optimize anything — the 總導師 squad

The optimize mission takes **existing content** (a deck, a case study, a landing page, a clause)
and runs the review SOP, so Ed Agent is a *thinking* unit, not only a *build* unit:

1. **Diagnostic** — the squad blind-scores the content across five dimensions and names the **three most fatal flaws**.
2. **Adversarial debate** — Reviewer B (a hard buyer) and Data/Logic D challenge it: *how does this create a real benefit, with a number?*
3. **Humanize** — Copy C strips the AI-tone filler (a deterministic de-AI pass) and lays out the structure to finish.
4. **Optimized version** — assembled in the exact three-part format: **【專家診斷回饋】 / 【優化後的最終版本】 / 【商業價值評估】**.

```bash
node bin/ed-agent.mjs --mission optimize "In conclusion, our world-class platform seamlessly leverages cutting-edge synergy to improve value."
# → REWORK (low blind score): AI-tone filler flagged · claims missing numbers · fatal flaws named
```

When the content is a **regulated-finance surface**, the Data/Logic officer **calls the
real [eds-mcp](https://github.com/Edwson/eds-mcp) engine** to *show* the numbers instead of
asserting them — the guardrail components the surface should map to, the regulatory anchors for
the jurisdiction, and the token-contrast WCAG pass rate of the system it would ship on.

## The quality disciplines — folded into every mission

Three house rules run in **every** review, not just optimize (the same `skills/quality.mjs`):

- **Ban AI-tone filler** — an EN + 中文 scanner flags `in conclusion`, `leverage`, `seamless`, `總之`, `賦能`, … so the voice stays human.
- **Quantify or flag** — any sentence that asserts a benefit with no number is surfaced for a measured figure (ROI / cost / conversion / time saved).
- **No blind praise** — a blind score (five dimensions) yields a **PASS / REWORK** verdict; mediocre work is told it *"would not pass a top-tier interview/review yet,"* with the reasons.

## The trust & deliberation layer

The hard problems once AI writes the code aren't syntax — they're **trust, lost intent, blind
global judgment, and plausible-nonsense defensive code**. Ed Agent stops at **two deliberation
checkpoints** and pulls you into the reasoning instead of rubber-stamping:

| Checkpoint | Asks | Catches |
|---|---|---|
| **FRAME** *(after analyze)* | Is the business intent captured, or is the agent guessing the project? | lost intent — the agent inferring the goal from text alone |
| **TRUST** *(after review)* | Should you trust it? Does the local optimum serve the global goal? Substance or ceremony? | the *technically-right, business-wrong* decision · over-defensive filler · LOW-trust output |

A run **stays IN DELIBERATION — not shippable — until you answer the open questions**, even when
both sign-off gates are cleared. State the intent up front; resolve the rest:

```bash
node bin/ed-agent.mjs "Add a payment retry flow"        # → IN DELIBERATION: "What is the business goal?"
node bin/ed-agent.mjs "Add a payment retry flow" \
  --intent "cut failed-payment churn" \
  --not "no auto-charge without consent; do not change the payments schema" \
  --resolve "trust: reviewed, accept the blast radius"   # → checkpoints clear
```

**Point it at an existing artifact / diff — "should I trust this?"** (no build):

```bash
node bin/ed-agent.mjs --audit pull-request.diff --intent "cut failed-payment churn" \
                      --not "do not change the payments schema"
# → Trust: LOW · ⚠ local optimum: "migrate the payments schema" does a declared NON-GOAL
#   · Substance: CEREMONY (empty catch, TODO, grand claims with no numbers) · open questions
```

The four assessors live in **`skills/trust.mjs`** (intent capture · trust score · global
coherence · substance scan) — all deterministic, all framed as *questions for you*, none of
them making the call.

## The red team + claim grounding *(v0.5)*

Every build now also runs two **mission-aware, deterministic** passes — **~0 token** (no LLM
calls), because they're pure functions, not prompts. "Caring about more" costs almost nothing.

- **Red team** — an adversarial pass whose only job is to **attack** the produced artifact for
  what *this* mission cares about. The universal checks (unquantified claims · AI-tone filler ·
  over-defensive ceremony · anything that does what a **non-goal** forbids) run for any
  business; the domain catalog adds the rest — **code:** injection / empty-catch / hardcoded
  secrets · **marketing:** unsourced superlatives / missing disclaimer · **contract:** ambiguous
  quantifiers / one-sided clauses · **finance:** a regulated claim with no anchor. It **states
  its own coverage** ("checks the loaded catalog + known anti-patterns; not exhaustive; does not
  replace a human expert") — so it passes its own no-confident-nonsense test.
- **Claim grounding** — tags every load-bearing claim **Grounded** (traces to a cited source or
  the stated goal) · **Ungrounded** (confident, with nothing behind it) · **Contradicted** (does
  what a non-goal forbids). The **universal source is the captured intent**, so it runs with
  **zero domain pack** — a bakery, a SaaS, a law firm, all the same.

**Report-only by default** — both are surfaced in `08b-redteam-grounding.md` and **do not change
the verdict**, so existing runs stay byte-stable. Add **`--strict`** to *gate* on critical
findings + contradictions (they open a red-team checkpoint; resolve with
`--resolve "redteam: …"` — the human consciously accepts; the harness never bypasses it).

```bash
node bin/ed-agent.mjs "Add a payment retry flow and migrate the payments schema" \
  --intent "cut failed-payment churn" --not "do not migrate the payments schema"
# → REDTEAM: 2 critical · grounding 1G/0U/1C   (report-only — surfaced, verdict unchanged)

node bin/ed-agent.mjs "…same…" --not "do not migrate the payments schema" --strict
# → IN DELIBERATION: red-team checkpoint open — the contradiction must be accepted or fixed
```

Standalone, no lifecycle: **`ed_agent_redteam`** and **`ed_agent_ground`** (MCP), or
`skills/redteam.mjs` + `skills/grounding.mjs` as a library.

## The nine stages + two checkpoints

`intake → context → analyze →` **`◆FRAME`** `→ research → ledger → plan → produce → review →`
**`◆TRUST`** `→ certify`

The middle five swap their content per mission; the spine is universal. **Research**
cross-compares sources, compresses each claim to its load-bearing clause, and quarantines
unverified ones. **Plan** and **Certify** each hold a **human sign-off gate**; **FRAME** and
**TRUST** are **deliberation checkpoints**. A run is shippable only when **both gates are
cleared AND both checkpoints are closed**.

## It learns you

Ed Agent remembers your preferences in `Ed_agents_Claude.md` and applies them on later runs
(and across hosts):

```bash
node bin/ed-agent.mjs --prefer "mission: marketing"     # default squad when none is given
node bin/ed-agent.mjs --prefer "jurisdiction: uk"
node bin/ed-agent.mjs --remember "we ship a savings product for Gen-Z in the UK"
node bin/ed-agent.mjs --like "dense data tables"  --dislike "emoji in headings"
```

It records likes, dislikes, preferences and concepts; recalls them at the **Context** stage;
and applies the preferred mission / jurisdiction automatically.

## Drop it into any bot

**MCP (Claude · Cursor · Codex):**

```jsonc
{ "mcpServers": { "ed-agent": { "command": "npx", "args": ["-y", "github:Edwson/Ed-Agent", "ed-agent-mcp"] } } }
```

Tools (11): `ed_agent_run` · `ed_agent_deliberate` (audit any artifact/diff — "should I trust
this?") · `ed_agent_redteam` (mission-aware adversarial scan) · `ed_agent_ground` (claim
grounding, three states) · `ed_agent_trust_scan` (fast trust + substance) · `ed_agent_optimize`
(the 總導師 review) · `ed_agent_quality_scan` · `ed_agent_missions` · `ed_agent_skills` ·
`ed_agent_remember` · `ed_agent_recall`. Enable with `npm install @modelcontextprotocol/sdk zod`
(optional — the CLI and library are zero-dependency).

**The host loop (deep deliberation):** `ed_agent_run` and `ed_agent_deliberate` return the open
checkpoint questions. The host LLM (Claude/Cursor/Codex) discusses them **with you**, then calls
the tool again with your answers in `intent` / `resolve[]` to close the deliberation. The engine
surfaces the questions; the conversation — and the decision — stay between you and the host.

**Any other LLM (Hermes, …):** paste the operating contract from **[`AGENTS.md`](./AGENTS.md)**
into the system prompt — the host then *behaves* as Ed Agent.

## Different from eds-mcp

[**eds-mcp**](https://github.com/Edwson/eds-mcp) is the **design-system engine** (it scaffolds
compliant finance UI). **Ed Agent** is the **special-ops orchestrator** that runs the whole
lifecycle across *any* domain — and calls eds-mcp **twice over**: the **finance** mission drives
it to *build* compliant UI, and the **optimize** mission calls it to *quantify* a regulated
surface under review (guardrail mapping · regulatory anchors · WCAG token-contrast). The engine
resolves from `--eds <path>`, `ED_AGENT_EDS_MCP`, or a sibling `../eds-mcp`; if absent, both run
in honest contract-only mode and every other mission is unaffected.

## Tests

```bash
npm test        # zero-dependency contract test: missions, skills, memory, gates
npm run test:mcp  # live MCP-protocol test (needs the optional SDK)
```

## License

MIT © Ed Chen — [edwson.com](https://www.edwson.com)
