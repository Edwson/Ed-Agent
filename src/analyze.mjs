// analyze.mjs — Stage 3. Deep analysis: decompose + surface constraints +
// carry the mission's concerns into the brief the research stage verifies.
import { decompose } from './skills/logic.mjs';
import { uniq } from './util.mjs';

export function analyze(intk, concerns) {
  const subRequirements = decompose(intk.requirement);

  const constraints = uniq([
    intk.jurisdiction ? `Jurisdiction: ${intk.jurisdictionName} (${intk.jurisdiction})` : null,
    intk.rule ? `Governing baseline: ${intk.rule}` : null,
    'Every claim must carry a source or a named instrument',
    intk.missionId === 'finance' ? 'Tokens-only styling + WCAG 2.1 AA (design-system contract)' : 'Output is reviewable, not a black box',
  ].filter(Boolean));

  const assumptions = [
    'Design / creative / legal judgment stays human — the squad drafts and checks.',
    'Research runs over an offline knowledge base; a live-retrieval hook is pluggable.',
    'Token counts are estimates (~4 chars/token), not billed figures.',
  ];

  return { subRequirements, concerns: concerns && concerns.length ? concerns : ['baseline'], constraints, assumptions };
}
