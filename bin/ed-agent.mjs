#!/usr/bin/env node
// ed-agent — CLI. Drive one requirement through the mission-swapped army,
// or just teach it a preference.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { run, prefs } from '../src/orchestrator.mjs';
import { auditArtifact } from '../src/deliberate.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const memoryPath = join(root, 'Ed_agents_Claude.md');

const VALUE_FLAGS = ['--jurisdiction', '--mission', '--approve', '--signoff', '--eds', '--out', '--input', '--intent', '--done', '--not', '--audit', '--remember', '--prefer', '--like', '--dislike'];
const argv = process.argv.slice(2);
const flags = {}; const words = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--resolve') { (flags['--resolve'] = flags['--resolve'] || []).push(argv[++i]); } // repeatable
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

if (flags['--help'] || flags['-h']) {
  console.log(`ed-agent v${pkg.version} — one requirement → a mission-swapped, human-gated lifecycle

USAGE
  ed-agent "<requirement>" [options]
  ed-agent --remember "<idea>"            # teach it, without running

MISSIONS (auto-detected, or force with --mission)
  finance    regulated-finance design — drives the eds-mcp build engine
  code       Architect · Security · QA · Doc engineer
  marketing  Creative Director · Conversion Analyst · Consumer Psychologist · SEO
  contract   Senior Lawyer · Risk-Control Officer · Negotiator · Semantic-Logic reviewer
  optimize   總導師 review — Executor A · Reviewer B · Copy C · Data/Logic D · Market/SEO E
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

EXAMPLES
  ed-agent "Build a REST API for user onboarding with rate limiting"   # → code squad
  ed-agent "Launch a landing page for a new savings product"           # → marketing squad
  ed-agent "Draft an NDA with a 12-month liability cap"                # → contract squad
  ed-agent "Review and optimize this case study copy: <paste>"         # → optimize squad
  ed-agent --mission optimize --input case-study.md                    # optimize a file
  ed-agent "Add a payment retry flow" --intent "cut failed-payment churn" --not "no auto-charge without consent"
  ed-agent --audit pull-request.diff --intent "cut failed-payment churn"   # should I trust this?
  ed-agent "Originate a consumer loan" --intent "approve good borrowers fast" --approve "Ed" --signoff "Ed" --resolve "trust: accepted"`);
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

// build preference records from flags
const record = [];
if (flags['--remember']) record.push({ kind: 'concept', text: flags['--remember'] });
if (flags['--prefer']) record.push({ kind: 'prefer', text: flags['--prefer'] });
if (flags['--like']) record.push({ kind: 'like', text: flags['--like'] });
if (flags['--dislike']) record.push({ kind: 'dislike', text: flags['--dislike'] });

// teach-only mode: preference flags with no requirement → record + exit
if (record.length && !requirement) {
  prefs.record(memoryPath, record);
  const r = prefs.recall(memoryPath);
  console.log(`✓ remembered ${record.length} item(s). Now holding ${r.count} preference(s): ` +
    [...Object.entries(r.prefs).map(([k, v]) => `${k}=${v}`), ...r.likes.map((l) => 'like:' + l), ...r.dislikes.map((d) => 'dislike:' + d), ...r.concepts.map((cpt) => 'concept:' + cpt)].join(', '));
  process.exit(0);
}

run(requirement, {
  mission: flags['--mission'], jurisdiction: flags['--jurisdiction'],
  approve: flags['--approve'], signoff: flags['--signoff'],
  intent: flags['--intent'], done: flags['--done'], nonGoals: flags['--not'], resolve: flags['--resolve'],
  strict: !!flags['--strict'],
  edsPath: flags['--eds'], outDir: flags['--out'], quiet: !!flags['--quiet'], record,
}).then(() => process.exit(0)).catch((e) => { console.error('ed-agent error:', e && e.message ? e.message : e); process.exit(1); });
