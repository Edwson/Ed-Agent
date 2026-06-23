// missions/index.mjs — the squad registry + mission detection.
import { finance } from './finance.mjs';
import { code } from './code.mjs';
import { marketing } from './marketing.mjs';
import { contract } from './contract.mjs';
import { optimize } from './optimize.mjs';

// order = tie-break preference (optimize first: a review/optimize intent wins a tie)
export const MISSIONS = [optimize, finance, contract, marketing, code];
export const missionById = (id) => MISSIONS.find((m) => m.id === id) || null;

/** Pick the mission: explicit flag wins; else score keyword hits; default code. */
export function detectMission(requirement, flag) {
  if (flag) { const m = missionById(String(flag).toLowerCase()); if (m) return m; }
  const req = String(requirement || '');
  let best = null, bestScore = 0;
  for (const m of MISSIONS) {
    const re = new RegExp(m.detect.source, 'gi');
    const score = (req.match(re) || []).length;
    if (score > bestScore) { bestScore = score; best = m; }
  }
  return best || code;
}
