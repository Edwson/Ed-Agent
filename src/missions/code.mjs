// missions/code.mjs — the engineering squad: Architect · Security · QA · Doc engineer.
import { decompose, crossCompare, renderFindings, ambiguityScan } from '../skills/logic.mjs';
import { qualityBlock } from '../skills/quality.mjs';

const KB = [
  { group: 'Input validation', source: 'OWASP', ref: 'ASVS V5', claim: 'All input must be validated against an allow-list at the trust boundary before use.' },
  { group: 'Input validation', source: 'OWASP', ref: 'Top 10 A03 (Injection)', claim: 'Untrusted input should be parameterised or escaped to prevent injection.' },
  { group: 'Auth & secrets', source: 'OWASP', ref: 'ASVS V2/V6', claim: 'Secrets must never be hardcoded; credentials must be stored in a managed secret store and rotated.' },
  { group: 'Auth & secrets', source: '12-Factor App', ref: 'III. Config', claim: 'Configuration and secrets should be read from the environment, not committed to the repo.' },
  { group: 'Data storage', source: 'OWASP', ref: 'Top 10 A02 (Crypto)', claim: 'Sensitive data must be encrypted at rest and in transit with vetted algorithms.' },
  { group: 'Error handling', source: 'Google SRE', ref: 'Handling Overload', claim: 'Errors should fail closed, be logged with context, and never leak internals to the caller.' },
  { group: 'Concurrency', source: 'Google SRE', ref: 'Idempotency', claim: 'State-changing operations should be idempotent so retries are safe under concurrency.' },
  { group: 'Performance', source: 'Web Vitals', ref: 'budget', claim: 'Set explicit latency / payload budgets and measure them in CI, not after launch.' },
  { group: 'Dependency risk', source: 'OWASP', ref: 'Top 10 A06', claim: 'Pin and scan dependencies; a vulnerable transitive dependency is your vulnerability.' },
  { group: 'Observability', source: 'Google SRE', ref: 'Four Golden Signals', claim: 'Instrument latency, traffic, errors and saturation before you need them.' },
];
const CONCERN_RE = [
  [/\b(input|form|upload|param|query|user data)\b/i, 'Input validation'],
  [/\b(auth|login|token|secret|key|password|oauth|session)\b/i, 'Auth & secrets'],
  [/\b(store|database|db|persist|cache|file|s3|record)\b/i, 'Data storage'],
  [/\b(error|fail|retry|timeout|exception)\b/i, 'Error handling'],
  [/\b(concurren|parallel|queue|async|race|lock|transaction)\b/i, 'Concurrency'],
  [/\b(perf|latency|fast|scale|load|throughput)\b/i, 'Performance'],
  [/\b(depend|package|library|npm|sdk|import)\b/i, 'Dependency risk'],
  [/\b(log|metric|monitor|trace|observ|alert)\b/i, 'Observability'],
];

export const code = {
  id: 'code',
  name: 'Code / engineering',
  detect: /\b(build|api|service|app|refactor|bug|backend|frontend|deploy|library|cli|database|microservice|sdk|endpoint|server|component|function|module|pipeline|webhook|integration)\b/i,
  build: 'skills',
  squad: [
    { id: 'architect', name: 'Architect', role: 'System design', one: 'Decomposes the system into modules, layers, interfaces and the decisions that bind them.' },
    { id: 'security', name: 'Security', role: 'Threat modelling', one: 'STRIDE threat model + mitigations; secrets, input, dependency hygiene.' },
    { id: 'qa', name: 'QA', role: 'Test strategy', one: 'Builds the test pyramid — unit, integration, e2e — from the sub-requirements.' },
    { id: 'doc', name: 'Doc Engineer', role: 'README & docs', one: 'Writes the README and the developer-facing docs so the handoff is honest.' },
  ],
  stageOwners: { research: 'security', plan: 'architect', produce: 'doc', review: 'security', certify: 'qa' },

  concerns(req) {
    const out = CONCERN_RE.filter(([re]) => re.test(req)).map(([, n]) => n);
    return [...new Set(['Input validation', 'Auth & secrets', 'Error handling', ...out])];
  },

  research(brief, ctx) {
    const cc = crossCompare(brief.concerns, (g) => KB.filter((e) => e.group === g));
    const md = renderFindings('04 · Engineering research (security + reliability references)', cc);
    const out = ctx.wa('04-research-brief.md', md);
    return { text: md, out, coverage: cc.coverage.pct, conflicts: cc.conflicts.length, findings: cc.findings.length, sources: cc.sources, summary: `${cc.coverage.pct}% concern coverage · ${cc.sources.length} reference sources` };
  },

  plan(brief, ctx) {
    const mods = decompose(brief.requirement).map((s, i) => `- **M${i + 1}** ${s} — owning module + interface`).join('\n');
    const md = `# 06 · Architecture (Architect)\n\n## Layers\n- Presentation / API\n- Application (use-cases)\n- Domain (rules)\n- Infrastructure (data, external services)\n\n## Modules (from sub-requirements)\n${mods || '- (single module)'}\n\n## Key decisions to make (with trade-offs)\n- Sync vs async at the boundary — latency vs operational complexity\n- SQL vs document store — consistency/queries vs flexibility\n- Build vs buy for auth — control vs time-to-ship\n\n## Cross-cutting (from research)\n- ${brief.concerns.join('\n- ')}\n\n> Design judgment stays human — the Architect proposes; the operator approves at the gate.\n`;
    const out = ctx.wa('06-plan.md', md);
    return { text: md, out, summary: `${decompose(brief.requirement).length || 1} module(s) · 4 layers` };
  },

  produce(brief, ctx) {
    const subs = decompose(brief.requirement);
    const tests = subs.map((s, i) => `- [ ] unit: ${s}\n- [ ] integration: ${s} against its dependency`).join('\n') || '- [ ] unit: core behaviour';
    const testPlan = `# Test plan (QA · test pyramid)\n\n## Unit + integration\n${tests}\n\n## End-to-end\n- [ ] happy path for the full requirement\n- [ ] one failure path (errors fail closed)\n\n## Gates in CI\n- lint · type-check · unit · integration · dependency scan\n`;
    const readme = `# <project>\n\n${brief.requirement}\n\n## Install\n\`\`\`bash\nnpm install\n\`\`\`\n\n## Usage\n\`\`\`bash\n# …\n\`\`\`\n\n## Architecture\nSee 06-plan.md. Layers: API → application → domain → infrastructure.\n\n## Security\nSecrets from env (12-Factor III). Input validated at the boundary. See 08-review.md.\n\n## License\nMIT\n`;
    const modules = `# Module map\n\n${subs.map((s, i) => `## M${i + 1}\n- responsibility: ${s}\n- interface: TODO\n- tests: see test plan`).join('\n\n') || '## M1\n- responsibility: core'}\n`;
    ctx.wa('07-build/test-plan.md', testPlan);
    ctx.wa('07-build/README-draft.md', readme);
    ctx.wa('07-build/modules.md', modules);
    const man = `# 07 · Produce\n\nWritten: test-plan.md, README-draft.md, modules.md (${subs.length || 1} modules).\n`;
    ctx.wa('07-build/_manifest.md', man);
    ctx._produced = readme + modules;
    return { text: testPlan + readme + modules, out: '07-build/', files: 3, summary: `${subs.length || 1} modules · test plan + README drafted` };
  },

  review(brief, ctx) {
    const stride = brief.concerns.map((c) => `- **${c}** — Spoofing/Tampering/Repudiation/Info-disclosure/DoS/Elevation: assess + mitigate`).join('\n');
    const amb = ambiguityScan(brief.requirement);
    const md = `# 08 · Security review (Security)\n\n## STRIDE over the concerns\n${stride}\n\n## Mitigations (baseline)\n- validate input at the trust boundary (allow-list)\n- secrets from a managed store, never committed\n- encrypt sensitive data at rest + in transit\n- fail closed; log with context; no internal leakage\n- pin + scan dependencies\n\n## Ambiguities in the requirement\n${amb.length ? amb.map((a) => `- "${a.term}" — ${a.why}`).join('\n') : '- none flagged'}\n`;
    const qb = qualityBlock(ctx._produced || brief.requirement, { label: 'the README + docs' });
    const full = md + qb.md;
    const out = ctx.wa('08-review.md', full);
    return { text: full, out, issues: amb.length + qb.issues, summary: `${brief.concerns.length} threat surfaces · ${amb.length} ambiguit(ies) · ${qb.verdict.label}` };
  },

  certify(brief, ctx) {
    const checklist = ['CI green (lint · type · unit · integration)', 'dependency scan clean', 'security review signed', 'README + docs updated', 'rollback plan documented'];
    const md = `# 09 · Release checklist (QA)\n\n${checklist.map((c) => `- [ ] ${c}`).join('\n')}\n`;
    ctx.wa('09-conformance.md', md);
    return { text: md, count: checklist.length, summary: `${checklist.length}-item release checklist` };
  },
};
