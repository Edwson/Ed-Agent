// intake.mjs — Stage 1. Detect the mission (squad), then domain + jurisdiction.
import { slugify } from './util.mjs';
import { detectMission } from './missions/index.mjs';

// finance recipes: how a requirement maps to a component seed + market.
export const RECIPES = [
  { key: 'payments', match: /\b(payment|payout|money|transfer|remit|fx|rail|settle|reconcil)\b/i, jurisdiction: 'eu', domain: 'Payments & money movement', feature: 'payment', rule: 'ISO 20022', seed: ['PaymentRailSelector', 'MoneyMovementTracker', 'FxQuoteTicket', 'ReconciliationMatch', 'MandateConsent'] },
  { key: 'lending', match: /\b(loan|credit|lend|mortgage|borrow|apr|afford|repay)\b/i, jurisdiction: 'uk', domain: 'Consumer lending', feature: 'credit', rule: 'FCA CONC', seed: ['LoanOriginationStepper', 'APRDisclosure', 'AffordabilityCheck', 'RepaymentSchedule'] },
  { key: 'wealth', match: /\b(wealth|advis|rebalanc|portfolio|suitab|fiduciar|invest)\b/i, jurisdiction: 'us', domain: 'Wealth & advisory', feature: 'suitability', rule: 'SEC Reg BI', seed: ['SuitabilityProfile', 'PortfolioRebalanceProposal', 'FeeAndConflictDisclosure', 'AiSuggestion', 'SignOffBar'] },
  { key: 'identity', match: /\b(auth|login|2fa|mfa|sca|step.?up|consent|identity|verif)\b/i, jurisdiction: 'eu', domain: 'Identity & authentication', feature: 'identity', rule: 'GDPR', seed: ['StepUpAuth', 'ConsentReceipt'] },
  { key: 'aml', match: /\b(sanction|monitor|ubo|beneficial|launder|alert)\b/i, jurisdiction: 'global', domain: 'AML monitoring', feature: 'aml', rule: 'FATF', seed: ['SanctionsScreen', 'UboGraph', 'ReasoningChain', 'AuditTrail'] },
  { key: 'kyc', match: /\b(kyc|onboard|edd|due diligence|source of funds|identity check)\b/i, jurisdiction: 'au', domain: 'KYC / onboarding', feature: 'kyc', rule: 'FATF', seed: ['KycStepper', 'RegCitation', 'SanctionsScreen', 'SuitabilityGate', 'AuditTrail'] },
];

const JUR_NAME = { us: 'United States', eu: 'European Union', uk: 'United Kingdom', au: 'Australia', sg: 'Singapore', jp: 'Japan', global: 'Global' };

export function intake(requirement, opts = {}) {
  const req = String(requirement || '').trim();
  const mission = detectMission(req, opts.mission);
  const base = { requirement: req, mission, missionId: mission.id, slug: slugify(req) };

  if (mission.id === 'finance') {
    const recipe = RECIPES.find((r) => r.match.test(req)) || RECIPES[RECIPES.length - 1];
    const jur = String(opts.jurisdiction || recipe.jurisdiction).toLowerCase();
    return { ...base, domain: recipe.domain, recipe, seed: recipe.seed.slice(), feature: recipe.feature, rule: recipe.rule, jurisdiction: jur, jurisdictionName: JUR_NAME[jur] || jur.toUpperCase() };
  }
  const jur = opts.jurisdiction ? String(opts.jurisdiction).toLowerCase() : null;
  return { ...base, domain: mission.name, seed: [], jurisdiction: jur, jurisdictionName: jur ? (JUR_NAME[jur] || jur.toUpperCase()) : '—' };
}
