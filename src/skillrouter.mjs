// skillrouter.mjs — deterministic skill selection over the .md library.
// Given a plain-English need, ranks src/skills/*.md by keyword relevance
// (name + id weighted over description + audience), with an optional
// mission-affinity nudge. Zero-dependency, ~0 token: the harness routes,
// the human or agent decides which method to load. No model is called.

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
export const SKILLS_DIR = join(HERE, 'skills');

const STOP = new Set(
  ('a an and or of to for in on with without your our their you we they it its this that these those is are be as at by ' +
   'from into over under per via use uses used using method skill when not what how why about across against only also more ' +
   'most less than then so such each every any all no yes do does done make made build built one two three both either neither ' +
   'the them he she his her him who whom whose which where here there now new old good bad big small ' +
   // query-noise: generic asks about "Ed Agent" itself that carry no domain signal.
   'can could would should will help please need needs want wants able assist support someone something anyone ask asked ' +
   'agent agents run runs ran get got give let team teams department dept people work works working really just like').split(/\s+/));

function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split(/\r?\n/)) {
    const mm = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
    if (mm) out[mm[1].toLowerCase()] = mm[2].trim();
  }
  return out;
}

function tokenize(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

let CACHE = null;

/** Load and index every *.md skill in `dir` (deterministic, sorted by id). */
export function loadSkillLibrary(dir = SKILLS_DIR) {
  let files;
  try { files = readdirSync(dir).filter((f) => f.endsWith('.md')); }
  catch { return []; }
  return files.map((f) => {
    const text = readFileSync(join(dir, f), 'utf8');
    const fm = parseFrontmatter(text);
    const id = f.replace(/\.md$/, '');
    const name = fm.name || id;
    const description = fm.description || '';
    const audience = fm.audience || '';
    const weight = new Map();
    for (const t of tokenize(name + ' ' + id)) weight.set(t, (weight.get(t) || 0) + 3);
    for (const t of tokenize(description + ' ' + audience)) weight.set(t, (weight.get(t) || 0) + 1);
    return { id, name, description, audience, path: `src/skills/${f}`, weight };
  }).sort((a, b) => a.id.localeCompare(b.id));
}

// mission affinity — a small, honest nudge toward the domain the squad works in.
const MISSION_HINTS = {
  marketing: ['seo', 'geo', 'brand', 'campaign', 'copy', 'content', 'blog', 'funnel', 'conversion', 'audience', 'competitive', 'competitor', 'market', 'gtm', 'launch', 'growth', 'crisis', 'analytics', 'positioning', 'humanizer', 'personalization', 'journey', 'retention'],
  finance: ['compliance', 'risk', 'kyc', 'aml', 'audit', 'ebitda', 'forecast', 'regulatory', 'financial', 'credit', 'securities', 'tax', 'disclosure', 'wealth', 'banking'],
  code: ['code', 'codebase', 'api', 'refactor', 'architecture', 'typescript', 'javascript', 'test', 'deploy', 'backend', 'database', 'sql', 'cloud', 'devops', 'firebase', 'observability'],
  contract: ['contract', 'legal', 'license', 'terms', 'nda', 'compliance', 'patent', 'intellectual'],
  optimize: ['review', 'audit', 'quality', 'optimize', 'objectivity', 'logic', 'adversarial'],
};

/**
 * Rank skills against a plain-English need.
 * @returns [{ id, name, path, description, score, why[] }] — top `limit`, deterministic.
 */
export function routeSkills(query, opts = {}) {
  const { mission = null, limit = 6, dir } = opts;
  const lib = dir ? loadSkillLibrary(dir) : (CACHE || (CACHE = loadSkillLibrary()));
  const qSet = new Set(tokenize(query));
  const hints = mission && MISSION_HINTS[mission] ? new Set(MISSION_HINTS[mission]) : null;
  return lib.map((sk) => {
    let score = 0; const why = [];
    for (const t of qSet) { const w = sk.weight.get(t); if (w) { score += w; why.push(t); } }
    if (hints) { let aff = 0; for (const t of hints) if (sk.weight.has(t)) aff++; score += Math.min(aff, 6) * 0.75; }
    return { id: sk.id, name: sk.name, path: sk.path, description: sk.description, score: +score.toFixed(2), why: why.slice(0, 6) };
  }).filter((s) => s.score > 0).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, limit);
}

/** Full catalog (id/name/description/audience/path), deterministic. */
export function skillCatalog(dir) {
  const lib = dir ? loadSkillLibrary(dir) : (CACHE || (CACHE = loadSkillLibrary()));
  return lib.map((s) => ({ id: s.id, name: s.name, description: s.description, audience: s.audience, path: s.path }));
}
