#!/usr/bin/env node
// ed-agent — CLI. Drive one requirement through the mission-swapped army,
// or just teach it a preference.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { run, prefs } from '../src/orchestrator.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const memoryPath = join(root, 'Ed_agents_Claude.md');

const VALUE_FLAGS = ['--jurisdiction', '--mission', '--approve', '--signoff', '--eds', '--out', '--remember', '--prefer', '--like', '--dislike'];
const argv = process.argv.slice(2);
const flags = {}; const words = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (VALUE_FLAGS.includes(a)) { flags[a] = argv[++i]; }
  else if (a.startsWith('-')) { flags[a] = true; }
  else words.push(a);
}
const requirement = words.join(' ');

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

OPTIONS
  --mission <finance|code|marketing|contract>   force the squad
  --jurisdiction <us|eu|uk|au|sg|jp|global>      (finance) override jurisdiction
  --approve <name>     clear the plan/design gate (records who approved)
  --signoff <name>     clear the certification sign-off gate
  --eds <path>         path to the eds-mcp repo (finance build)
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
  ed-agent --prefer "jurisdiction: uk"
  ed-agent "Originate a consumer loan" --approve "Ed Chen" --signoff "Ed Chen"`);
  process.exit(0);
}
if (flags['--version'] || flags['-v']) { console.log(pkg.version); process.exit(0); }

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
  edsPath: flags['--eds'], outDir: flags['--out'], quiet: !!flags['--quiet'], record,
}).then(() => process.exit(0)).catch((e) => { console.error('ed-agent error:', e && e.message ? e.message : e); process.exit(1); });
