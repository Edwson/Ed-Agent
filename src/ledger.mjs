// ledger.mjs — Stage 2 (recall) + Stage 5 (checkpoint) + finalize.
// Ed_agents_Claude.md is both the working memory (context that survives runs)
// and the append-only I/O ledger that quantifies estimated tokens per stage.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fmt, todayISO } from './util.mjs';

const SEED = `# Ed_agents_Claude.md — Ed Agent working memory & I/O ledger

> Persistent memory for the Ed Agent orchestrator. The **Context memory** survives across
> runs; the **Run ledger** is append-only and quantifies estimated input/output per stage.
> Token counts are estimates (~4 chars/token), framed as DesignOps cost governance — not billed figures.

## Context memory

- Operator: Ed Chen — design judgment + human sign-off stay with the operator.
- Engine: the build half (design / develop / QA / certify) runs on the eds-mcp design system.
- Conventions: tokens-only styling, reduced-motion + WCAG 2.1 AA, every claim carries a source.
- Honesty: agents ingest / analyse / research / scaffold / check; the human holds the two gates and the two deliberation checkpoints (FRAME · TRUST).

<!-- LAST-BRIEF -->
_No brief recorded yet._
<!-- /LAST-BRIEF -->

## Preferences

_Recorded preferences the agent recalls and applies. Edit freely._

## Run ledger

`;

export function recall(memoryPath) {
  if (!existsSync(memoryPath)) {
    writeFileSync(memoryPath, SEED, 'utf8');
    return { exists: false, priorRuns: 0, contextFacts: '' };
  }
  const txt = readFileSync(memoryPath, 'utf8');
  const priorRuns = (txt.match(/^## Run \d{4}-/gm) || []).length;
  const m = txt.match(/## Context memory\n([\s\S]*?)\n## (?:Preferences|Run ledger)/);
  return { exists: true, priorRuns, contextFacts: m ? m[1].trim() : '' };
}

/** Stage 5 — grow the context memory with the current brief (the "remember context" step). */
export function checkpoint(memoryPath, brief) {
  if (!existsSync(memoryPath)) writeFileSync(memoryPath, SEED, 'utf8');
  let txt = readFileSync(memoryPath, 'utf8');
  const block = `<!-- LAST-BRIEF -->
**Last brief — ${todayISO()}**
- Requirement: ${brief.requirement}
- Detected: ${brief.domain} · ${brief.jurisdictionName}
- Triggers: ${brief.triggers.join('; ')}
- Research coverage: ${brief.coveragePct}% (${brief.findings} findings, ${brief.conflicts} conflict(s) quarantined)
<!-- /LAST-BRIEF -->`;
  txt = txt.replace(/<!-- LAST-BRIEF -->[\s\S]*?<!-- \/LAST-BRIEF -->/, block);
  writeFileSync(memoryPath, txt, 'utf8');
}

/** Finalize — append the append-only run entry with the I/O table + gate outcomes. */
export function commit(memoryPath, run) {
  if (!existsSync(memoryPath)) writeFileSync(memoryPath, SEED, 'utf8');
  let txt = readFileSync(memoryPath, 'utf8');
  const totIn = run.meter.reduce((a, s) => a + s.inTok, 0);
  const totOut = run.meter.reduce((a, s) => a + s.outTok, 0);
  const rows = run.meter
    .map((s) => `| ${s.stage} | ${s.agent} | ${fmt(s.inTok)} | ${fmt(s.outTok)} | ${s.artifact || '—'} |`)
    .join('\n');
  const gates = run.gates.map((g) => (g.status === 'approved' ? `✓ ${g.name} (by ${g.by})` : `⏸ ${g.name} (pending)`)).join(' · ');
  const cps = run.checkpoints || [];
  const delib = cps.length ? `\n- **Deliberation:** ${cps.map((cp) => (cp.status === 'open' ? `◆ ${cp.name} (${cp.questions.length}Q open)` : `✓ ${cp.name}`)).join(' · ')}` : '';
  const entry = `## Run ${todayISO()} · ${run.slug}

- **Requirement:** ${run.requirement}
- **Mission:** ${run.mission || '—'}
- **Detected:** ${run.domain} · ${run.jurisdictionName}
- **Research:** ${run.coveragePct}% coverage · ${run.conflicts} conflict(s) quarantined
- **Gates:** ${gates}${delib}
- **Shippable:** ${run.shippable ? 'yes — gates + deliberation cleared' : 'no — gate(s) or open checkpoint(s) pending'}

| Stage | Agent | In (est) | Out (est) | Artifact |
|---|---|---:|---:|---|
${rows}
| **Total** | | **${fmt(totIn)}** | **${fmt(totOut)}** | est. tokens |

`;
  writeFileSync(memoryPath, txt.replace(/\s*$/, '\n\n') + entry, 'utf8');
  return { totIn, totOut };
}
