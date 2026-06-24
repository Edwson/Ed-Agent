#!/usr/bin/env node
// ed-agent — CLI. Drive one requirement through the mission-swapped army,
// or just teach it a preference.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { run, prefs } from '../src/orchestrator.mjs';
import { auditArtifact } from '../src/deliberate.mjs';
import { refineLoop, loopBlock } from '../src/loop.mjs';
import { captureIntent } from '../src/skills/trust.mjs';
import { missionById } from '../src/missions/index.mjs';
import { recallRules, forge } from '../src/flywheel.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const memoryPath = join(root, 'Ed_agents_Claude.md');

const VALUE_FLAGS = ['--jurisdiction', '--mission', '--approve', '--signoff', '--eds', '--out', '--input', '--intent', '--done', '--not', '--audit', '--refine', '--loop-max', '--target', '--port', '--mem', '--remember', '--prefer', '--like', '--dislike'];
const REPEATABLE = ['--resolve', '--reject'];
const argv = process.argv.slice(2);
const flags = {}; const words = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (REPEATABLE.includes(a)) { (flags[a] = flags[a] || []).push(argv[++i]); } // repeatable
  else if (VALUE_FLAGS.includes(a)) { flags[a] = argv[++i]; }
  else if (a.startsWith('-')) { flags[a] = true; }
  else words.push(a);
}
// --input <file>: optimize/critique the contents of a file (handy for the optimize squad)
let requirement = words.join(' ');
if (flags['--input']) {
  try { requirement = readFileSync(flags['--input'], 'utf8'); }
  catch (e) { console.error('ed-agent: cannot read --input file:', e && e.message ? e.message : e); process.exit(1); }
}

// `ed-agent dashboard` — open the local control room (a zero-dependency node:http server,
// 127.0.0.1 only, reading + tuning the same memory file). Does not run a requirement.
if (words[0] === 'dashboard') {
  const { start } = await import('../dashboard/server.mjs');
  start({ port: flags['--port'], memPath: flags['--mem'] || memoryPath, open: !!flags['--open'] });
}

if (flags['--help'] || flags['-h']) {
  console.log(`ed-agent v${pkg.version} — one requirement → a mission-swapped, human-gated lifecycle

USAGE
  ed-agent "<requirement>" [options]
  ed-agent --remember "<idea>"            # teach it, without running
  ed-agent dashboard [--port N] [--mem <path>] [--open]   # open the local control room (127.0.0.1 only)

MISSIONS (auto-detected, or force with --mission)
  finance    regulated-finance design — drives the eds-mcp build engine
  code       Architect · Security · QA · Doc engineer
  marketing  Creative Director · Conversion Analyst · Consumer Psychologist · SEO
  contract   Senior Lawyer · Risk-Control Officer · Negotiator · Semantic-Logic reviewer
  optimize   grand-mentor review (総監督) — Executor A · Reviewer B · Copy C · Data/Logic D · Market/SEO E
             takes EXISTING content and runs diagnostic → debate → humanize → optimized
             (bans AI-tone filler, quantifies or flags, no blind praise; quantifies
             regulated surfaces against eds-mcp)

DELIBERATION (the trust layer — Ed Agent stops at phase checkpoints and asks)
  Every run now passes two deliberation checkpoints: FRAME (is the intent captured,
  or am I guessing the project?) and TRUST (should you trust this · does the local
  optimum serve the global goal · is it substance or over-defensive ceremony?). A run
  stays IN DELIBERATION — not shippable — until you answer the open questions.
  --intent "<goal>"    the business goal (the outcome, not the task) — clears FRAME
  --done "<signal>"    what "done" means in business terms
  --not "<non-goals>"  out of scope, ;-separated (so a local optimum can't dig a global pit)
  --resolve "<node>: <answer>"   answer a checkpoint (node = frame|trust|redteam); repeatable
  --audit <file>       standalone: point at any artifact/diff and ask "should I trust this?"
                       (no build; prints trust + coherence + substance + the open questions)

RED TEAM + CLAIM GROUNDING (v0.5 — runs every build, mission-aware, ~0 token)
  An adversarial pass attacks the produced artifact for what THIS mission cares about
  (code: injection/secrets/empty-catch; marketing: unsourced superlatives/missing
  disclaimer; contract: ambiguous quantifiers/one-sided clauses; finance: regulated
  claims with no anchor) plus the universal checks; and every load-bearing claim is
  tagged Grounded / Ungrounded / Contradicted. Report-only by default (surfaced, does
  not change the verdict). Add --strict to gate on critical findings + contradictions.
  --strict             gate the verdict on critical findings / contradicted claims
                       (resolve with --resolve "redteam: <answer>")

INNER LOOP (v0.6 — opt-in self-correction, deterministic ~0 token)
  --loop refines the produced artifact in a produce→verify→(rollback) loop before review:
  a severity gate (exit when good enough), an overshoot rollback (discard a regressed
  version — the safety valve for a non-deterministic producer), an iron-law HARD HALT
  (a crossed red line stops the loop and opens a checkpoint — never bypasses you), and a
  budget fuse (--loop-max). Every iteration writes a WHAT/WHY/PATTERN audit line. Off by
  default → the verdict is byte-stable.
  --loop               run the inner loop between produce and review
  --loop-max <N>       iteration budget / fuse (default 6)
  --target <N>         severity target — the loop exits at/under it (default 8)
  --refine <file>      standalone: point the loop at any artifact, no lifecycle
                       (prints the audit trail + the residual escalated to a human)

OPTIONS
  --mission <finance|code|marketing|contract|optimize>   force the squad
  --jurisdiction <us|eu|uk|au|sg|jp|global>      (finance/optimize) override jurisdiction
  --input <file>       optimize/critique the contents of a file (the requirement is the file)
  --approve <name>     clear the plan/design gate (records who approved)
  --signoff <name>     clear the certification sign-off gate
  --eds <path>         path to the eds-mcp repo (finance/optimize quantification)
  --out <dir>          artifact output dir
  --quiet              suppress the narrative

LEARNING (persisted to Ed_agents_Claude.md, recalled + applied on later runs)
  --remember "<idea>"          store a concept/idea
  --prefer "<key>: <value>"    e.g. --prefer "mission: marketing"  ·  --prefer "jurisdiction: uk"
  --like "<thing>"  --dislike "<thing>"
  --reject "<node>: <reason>"  the flywheel — forge a learned rule from a rejection that the
                               next run re-checks (node = frame|trust|redteam|review); repeatable

EXAMPLES
  ed-agent "Build a REST API for user onboarding with rate limiting"   # → code squad
  ed-agent "Launch a landing page for a new savings product"           # → marketing squad
  ed-agent "Draft an NDA with a 12-month liability cap"                # → contract squad
  ed-agent "Review and optimize this case study copy: <paste>"         # → optimize squad
  ed-agent --mission optimize --input case-study.md                    # optimize a file
  ed-agent "Add a payment retry flow" --intent "cut failed-payment churn" --not "no auto-charge without consent"
  ed-agent --audit pull-request.diff --intent "cut failed-payment churn"   # should I trust this?
  ed-agent "Originate a consumer loan" --intent "approve good borrowers fast" --approve "Ed" --signoff "Ed" --resolve "trust: accepted"
  ed-agent "Add a payment retry flow" --mission code --loop                 # self-correct the build
  ed-agent --refine messy-draft.md --mission marketing --target 4           # standalone loop on a file
  ed-agent --reject "trust: violates MiFID II best execution"               # teach a learned rule (flywheel)`);
  process.exit(0);
}
if (flags['--version'] || flags['-v']) { console.log(pkg.version); process.exit(0); }

// --audit <file>: standalone deliberation audit — point at any artifact/diff, no build.
// "Should I trust this?" — trust + global-coherence + substance + the open questions.
if (flags['--audit']) {
  let body;
  try { body = readFileSync(flags['--audit'], 'utf8'); }
  catch (e) { console.error('ed-agent: cannot read --audit file:', e && e.message ? e.message : e); process.exit(1); }
  const a = auditArtifact(body, { requirement: requirement || flags['--audit'], intent: flags['--intent'], done: flags['--done'], not: flags['--not'] });
  console.log(a.md);
  process.exit(a.questions.length ? 2 : 0); // exit 2 = needs deliberation (useful in CI)
}

// --refine <file>: standalone inner loop — point at any artifact and watch it self-correct
// (severity gate + overshoot rollback + iron-law hard-halt + budget fuse), no lifecycle.
if (flags['--refine']) {
  let body;
  try { body = readFileSync(flags['--refine'], 'utf8'); }
  catch (e) { console.error('ed-agent: cannot read --refine file:', e && e.message ? e.message : e); process.exit(1); }
  const mission = flags['--mission'] ? missionById(String(flags['--mission']).toLowerCase()) || {} : {};
  const intent = captureIntent(body, { intent: flags['--intent'], done: flags['--done'], not: flags['--not'] });
  const r = refineLoop({ artifact: body, mission, intent, learnedRules: recallRules(memoryPath), maxIter: flags['--loop-max'] ? Number(flags['--loop-max']) : 6, target: flags['--target'] != null ? Number(flags['--target']) : 8 });
  console.log(loopBlock(r));
  process.exit(r.ironLaw.crossed || r.endScore > (flags['--target'] != null ? Number(flags['--target']) : 8) ? 2 : 0); // exit 2 = red line crossed or residual above target
}

// build preference records from flags
const record = [];
if (flags['--remember']) record.push({ kind: 'concept', text: flags['--remember'] });
if (flags['--prefer']) record.push({ kind: 'prefer', text: flags['--prefer'] });
if (flags['--like']) record.push({ kind: 'like', text: flags['--like'] });
if (flags['--dislike']) record.push({ kind: 'dislike', text: flags['--dislike'] });

// teach-only: --reject with no requirement → forge the learned rule(s) + exit (the flywheel)
if (flags['--reject'] && !requirement && !record.length) {
  for (const rj of flags['--reject']) { const i = String(rj).indexOf(':'); forge(memoryPath, { node: i > 0 ? String(rj).slice(0, i).trim() : 'review', reason: i > 0 ? String(rj).slice(i + 1).trim() : String(rj).trim() }); }
  const rules = recallRules(memoryPath);
  console.log(`✓ forged ${flags['--reject'].length} learned rule(s). Now holding ${rules.length} rule(s) the next run re-checks: ` + rules.map((r) => r.id).join(', '));
  process.exit(0);
}

// teach-only mode: preference flags with no requirement → record + exit
if (record.length && !requirement) {
  prefs.record(memoryPath, record);
  const r = prefs.recall(memoryPath);
  console.log(`✓ remembered ${record.length} item(s). Now holding ${r.count} preference(s): ` +
    [...Object.entries(r.prefs).map(([k, v]) => `${k}=${v}`), ...r.likes.map((l) => 'like:' + l), ...r.dislikes.map((d) => 'dislike:' + d), ...r.concepts.map((cpt) => 'concept:' + cpt)].join(', '));
  process.exit(0);
}

if (words[0] !== 'dashboard') {
  run(requirement, {
    mission: flags['--mission'], jurisdiction: flags['--jurisdiction'],
    approve: flags['--approve'], signoff: flags['--signoff'],
    intent: flags['--intent'], done: flags['--done'], nonGoals: flags['--not'], resolve: flags['--resolve'],
    strict: !!flags['--strict'],
    loop: !!flags['--loop'], loopMax: flags['--loop-max'], target: flags['--target'], reject: flags['--reject'],
    edsPath: flags['--eds'], outDir: flags['--out'], quiet: !!flags['--quiet'], record,
  }).then(() => process.exit(0)).catch((e) => { console.error('ed-agent error:', e && e.message ? e.message : e); process.exit(1); });
}
