// skills/ironlaws.mjs — the red lines (v0.6). Iron laws are NOT the same thing as a
// deliberation checkpoint or a report-only red-team finding. A checkpoint asks a human a
// judgment question; a red-team finding is surfaced for consideration. An IRON LAW is a
// hard boundary the inner loop must never cross: the moment an artifact crosses one, the
// loop HARD-HALTS, no further iteration runs, and the run escalates to the human. The
// harness still does not "decide" — a human can consciously override a red line with a
// documented reason (--resolve "ironlaw: …") — but it is never crossed silently.
//
// Universal laws apply to every mission; the overlay (keyed by mission.id) adds the
// domain red lines. Deterministic regex predicates, zero LLM calls — so a red line can
// never be "reasoned around" by a model in the loop.

// Each law: { id, law (the rule, plain English), test (text → bool), evidence (text → snippet), source }
const firstMatch = (re) => (t) => { const m = String(t).match(re); return m ? m[0].slice(0, 120) : ''; };

const UNIVERSAL = [
  {
    id: 'no-self-authority',
    law: 'The harness never approves, signs off, ships, deploys, merges, or bypasses a human gate by itself.',
    re: /\b(auto[-\s]?(?:approve|sign[-\s]?off|ship|deploy|merge|release|authorize)|bypass(?:es|ed|ing)?\s+(?:the\s+)?(?:gate|review|human|sign[-\s]?off|approval|checkpoint)|skip(?:s|ped|ping)?\s+(?:the\s+)?(?:review|approval|sign[-\s]?off|human|gate))\b/i,
    source: 'Ed Agent operating contract — execution automated, decision human',
  },
  {
    id: 'no-secret-exfil',
    law: 'Never move a credential / secret / private key to an external destination.',
    re: /\b(send|post|upload|exfiltrat\w*|leak|transmit|email|curl|fetch|forward)\b[^.\n]{0,60}\b(secret|api[-\s]?key|password|passwd|credential|private[-\s]?key|access[-\s]?token|bearer)\b/i,
    source: 'security red line',
  },
  {
    id: 'no-disable-safety',
    law: 'Never disable, silence, or weaken a security / compliance / audit control to make something pass.',
    re: /\b(disable|turn\s+off|silence|suppress|weaken|remove|comment\s+out)\b[^.\n]{0,50}\b(audit|logging|validation|sanitiz\w*|security|compliance|encryption|auth\w*|csrf|signature\s+check)\b/i,
    source: 'integrity red line',
  },
];

const OVERLAY = {
  finance: [
    {
      id: 'no-bypass-kyc-aml',
      law: 'Never skip / bypass / disable KYC · AML · CDD · EDD · sanctions screening · suitability.',
      re: /\b(skip|bypass|disable|omit|drop|without|circumvent|waive)\b[^.\n]{0,60}\b(kyc|aml|cdd|edd|sanction\w*|suitab\w*|due\s+diligence|source\s+of\s+funds)\b/i,
      source: 'AML/KYC red line — FATF · BSA · the obligation cannot be designed away',
    },
    {
      id: 'no-auto-money-movement',
      law: 'Never auto-execute money movement / trades / withdrawals without an explicit human sign-off.',
      re: /\b(auto[-\s]?(?:execute|trade|transfer|withdraw|disburse|settle|pay\s?out)|without\s+(?:human\s+)?(?:approval|sign[-\s]?off|confirmation|authoriz\w*))\b[^.\n]{0,60}\b(fund|money|trade|order|payment|withdrawal|transfer|disburse\w*|settlement)\b/i,
      source: 'fiduciary red line — money moves only behind a human signature',
    },
    {
      id: 'no-bypass-fiduciary-signoff',
      law: 'Never bypass the ASIC double-blind / fiduciary sign-off that a regulated recommendation requires.',
      re: /\bbypass\w*\b[^.\n]{0,50}\b(double[-\s]?blind|fiduciar\w*|sign[-\s]?off|best[-\s]?interest|reg\s?bi)\b/i,
      source: 'fiduciary red line — SEC Reg BI / ASIC',
    },
  ],
  code: [
    {
      id: 'no-destructive-prod-op',
      law: 'No destructive production / customer-data operation (drop · truncate · delete · rm -rf) in a shippable path.',
      re: /\b(drop\s+table|truncate|delete\s+from|rm\s+-rf|destroy\s+all|wipe)\b[^.\n]{0,50}\b(prod\w*|production|customer\w*|users?|database|schema|table|account\w*)\b|\brm\s+-rf\s+\//i,
      source: 'data-safety red line',
    },
  ],
  contract: [
    {
      id: 'no-unlimited-liability',
      law: 'Never accept uncapped / unlimited liability with no carve-out — that is a red line, not a clause to optimise.',
      re: /\b(unlimited|uncapped|no\s+(?:cap|limit)\s+on|without\s+limit\w*)\b[^.\n]{0,40}\b(liabilit\w*|indemnif\w*|damages?)\b/i,
      source: 'contract red line',
    },
  ],
  marketing: [
    {
      id: 'no-guaranteed-returns',
      law: 'Never publish a guaranteed-return / risk-free / no-loss financial claim — a regulatory red line in any jurisdiction.',
      re: /\b(guarantee\w*|risk[-\s]?free|no[-\s]?loss|assured|can'?t\s+lose|certain)\b[^.\n]{0,40}\b(return\w*|profit\w*|yield\w*|gain\w*|income)\b/i,
      source: 'advertising red line — SEC / FCA / ASIC misleading-conduct rules',
    },
  ],
  optimize: [],
};

/**
 * Scan an artifact against the iron laws for a mission (universal + overlay).
 * mid = mission.id (or 'universal'). Returns the trips (each a crossed red line).
 */
export function checkIronLaws(artifact, mid = 'universal') {
  const text = String(artifact || '');
  const laws = [...UNIVERSAL, ...(OVERLAY[mid] || [])];
  const trips = [];
  for (const law of laws) {
    if (law.re.test(text)) {
      trips.push({ id: law.id, law: law.law, evidence: firstMatch(law.re)(text), source: law.source });
    }
  }
  return { mid, trips, crossed: trips.length > 0 };
}

/** The crossed red lines as the questions a human must consciously override (if at all). */
export function ironLawQuestions(report) {
  return report.trips.map((t) => `IRON LAW crossed — ${t.law} Evidence: "${t.evidence}". The loop hard-halted. Override only with a documented reason, or fix it.`);
}

export function ironLawBlock(report) {
  if (!report.crossed) return '\n## Iron laws — red lines\n\n_None crossed. The loop ran inside the boundary._\n';
  let md = `\n## Iron laws — RED LINE CROSSED (${report.trips.length})\n\n`;
  md += '| Red line | Evidence | Source |\n|---|---|---|\n';
  for (const t of report.trips) md += `| ${t.law.replace(/\|/g, '\\|')} | \`${t.evidence.replace(/\|/g, '\\|')}\` | ${t.source.replace(/\|/g, '\\|')} |\n`;
  md += `\n> An iron law is a hard boundary, not a judgment call. The loop hard-halts the moment one is crossed and escalates to a human. The harness never crosses it silently; a human may consciously override with a documented reason.\n`;
  return md;
}

export const IRON_LAW_IDS = [...UNIVERSAL, ...Object.values(OVERLAY).flat()].map((l) => l.id);
