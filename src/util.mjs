// util.mjs — tiny zero-dependency helpers shared across the pipeline.

const NO_COLOR = !!process.env.NO_COLOR || !process.stdout.isTTY;
const wrap = (code) => (s) => (NO_COLOR ? String(s) : `[${code}m${s}[0m`);
export const c = {
  dim: wrap('2'), bold: wrap('1'), gold: wrap('33'), green: wrap('32'),
  red: wrap('31'), cyan: wrap('36'), gray: wrap('90'), mag: wrap('35'),
};

/** Honest, deterministic token estimate (~4 chars/token). Always labelled "est." in output. */
export const estTokens = (input) => {
  const s = typeof input === 'string' ? input : JSON.stringify(input ?? '');
  return Math.max(0, Math.ceil(s.length / 4));
};

export const slugify = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'run';

export const fmt = (n) => Number(n).toLocaleString('en-US');

/** Split a requirement sentence into candidate clauses on natural connectors. */
export const clauses = (s) =>
  String(s)
    .split(/[;.]|—|\bwith\b|\band\b|\bincluding\b|\bplus\b|,/i)
    .map((x) => x.trim())
    .filter((x) => x.length > 3);

export const uniq = (arr) => [...new Set(arr)];

export const todayISO = () => new Date().toISOString().slice(0, 10);
