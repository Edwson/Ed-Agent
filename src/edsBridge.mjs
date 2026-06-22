// edsBridge.mjs — wires the build half (design / develop / QA / certify) to the
// eds-mcp design-system engine. Pluggable: resolves eds-mcp from --eds, the
// ED_AGENT_EDS_MCP env var, or ../eds-mcp. If not found, every stage still runs
// and writes an artifact in honest "contract-only (eds-mcp not wired)" mode.
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');

export async function loadEngine(opts = {}) {
  const candidates = [opts.edsPath, process.env.ED_AGENT_EDS_MCP, join(repoRoot, '..', 'eds-mcp'), join(repoRoot, 'eds-mcp')].filter(Boolean);
  for (const dir of candidates) {
    try {
      const corePath = join(dir, 'core.js');
      if (!existsSync(corePath)) continue;
      const j = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
      const mod = await import(pathToFileURL(corePath).href);
      const core = mod.createCore({ tokens: j('tokens.json'), components: j('components.json'), manifest: j('manifest.json') });
      return { wired: true, core, dir, components: j('components.json').components, stats: core.getStats() };
    } catch { /* try next candidate */ }
  }
  return { wired: false };
}

const arr = (x) => (Array.isArray(x) ? x : x && Array.isArray(x.pairs) ? x.pairs : x && Array.isArray(x.results) ? x.results : x && Array.isArray(x.recommendations) ? x.recommendations : []);

export function design(engine, intk) {
  if (!engine.wired) {
    return { wired: false, components: intk.seed, markdown: `# Design draft (contract-only)\n\neds-mcp is not wired, so this draft lists the intended component set from the recipe rather than scaffolding it. Wire eds-mcp (\`--eds <path>\`) for a real draft.\n\n- ${intk.seed.join('\n- ')}\n` };
  }
  const rec = arr(engine.core.recommend(intk.requirement, 6)).map((r) => r.id || r).filter(Boolean);
  const md = `# Design draft — ${intk.domain}\n\n**Recipe seed (build set):** ${intk.seed.join(', ')}\n\n**Engine recommendations for the requirement:** ${rec.length ? rec.join(', ') : '—'}\n\nDesign judgment stays human (Ed + Figma MCP). The agents propose the component set from the system; the operator approves it at the gate below.\n`;
  return { wired: true, components: intk.seed, recommended: rec, markdown: md };
}

export function develop(engine, intk, buildDir) {
  mkdirSync(buildDir, { recursive: true });
  if (!engine.wired) {
    writeFileSync(join(buildDir, 'NOTE.md'), '# Build (contract-only)\n\neds-mcp not wired — no code scaffolded. The intended components are:\n\n- ' + intk.seed.join('\n- ') + '\n');
    return { wired: false, order: intk.seed, written: 0, tokens: [] };
  }
  const flow = engine.core.composeFlow({ ids: intk.seed, name: intk.slug });
  const order = (flow.steps && flow.steps.map((s) => s.id || s)) || intk.seed;
  const tokens = flow.tokens || [];
  let written = 0;
  try { writeFileSync(join(buildDir, 'theme.css'), engine.core.exportTheme('css').output || ''); written++; } catch { /* skip */ }
  for (const id of order) {
    const sc = engine.core.scaffoldComponent(id);
    if (!sc || sc.error || !sc.files) continue;
    const sub = join(buildDir, sc.prefix || id);
    mkdirSync(sub, { recursive: true });
    if (sc.files.html) { writeFileSync(join(sub, 'component.html'), sc.files.html); written++; }
    if (sc.files.css) { writeFileSync(join(sub, 'styles.css'), sc.files.css); written++; }
    if (sc.files.js) { writeFileSync(join(sub, 'script.js'), sc.files.js); written++; }
  }
  return { wired: true, order, written, tokens, missing: flow.missing || [] };
}

export function qa(engine, intk) {
  if (!engine.wired) {
    return { wired: false, markdown: '# QA (contract-only)\n\neds-mcp not wired — lint / a11y / contrast not run.\n', errors: 0, a11yChecked: 0, contrastChecked: 0 };
  }
  let errors = 0, a11yChecked = 0;
  let md = '# QA report\n\n## Lint + accessibility (per component)\n\n| Component | Lint issues | A11y |\n|---|---:|---|\n';
  for (const id of intk.seed) {
    const comp = engine.components[id] || {};
    const dc = engine.core.getDataContract(id).dataContract || {};
    const sc = engine.core.scaffoldComponent(id);
    const lint = engine.core.lintUsage({ tokens: comp.tokens || [], states: dc.states || [], css: sc && sc.files ? sc.files.css : '' });
    const issues = (lint.issues || []).filter((i) => i.severity === 'error').length;
    errors += issues;
    const au = engine.core.auditAccessibility(id);
    const auIssues = (au.issues || []).filter((i) => i.severity === 'error').length;
    a11yChecked++;
    md += `| ${id} | ${issues} | ${auIssues === 0 ? 'pass' : auIssues + ' issue(s)'} |\n`;
  }
  const cr = arr(engine.core.contrastReport());
  const contrastFail = cr.filter((p) => p.ratio && p.AA === false).length;
  md += `\n## Contrast\n\n${cr.length} token pairs checked · ${contrastFail} below AA.\n`;
  return { wired: true, markdown: md, errors, a11yChecked, contrastChecked: cr.length, contrastFail };
}

export function certify(engine, intk, testDir) {
  mkdirSync(testDir, { recursive: true });
  if (!engine.wired) {
    writeFileSync(join(testDir, 'NOTE.md'), '# Conformance tests (contract-only)\n\neds-mcp not wired — no tests scaffolded.\n');
    return { wired: false, count: 0 };
  }
  let count = 0;
  for (const id of intk.seed) {
    const st = engine.core.scaffoldTest(id);
    if (!st || st.error || !st.files) continue;
    for (const [fname, code] of Object.entries(st.files)) { writeFileSync(join(testDir, fname), code); count++; }
  }
  return { wired: true, count };
}
