// skills/quality.mjs — the quality disciplines every mission shares. Deterministic,
// zero-dependency. Enforces the house rules: ban AI-tone filler, quantify or flag,
// no blind praise. Powers the optimize (grand-mentor · 総監督) mission and folds into every review.
import { ambiguityScan } from './logic.mjs';

// ── AI-tone: the filler/transition words a top reviewer treats as a tell ──
// Connectives we will also auto-strip (humanTone); content-y tells we only flag.
const TRANSITIONS_EN = [
  'moreover', 'furthermore', 'in conclusion', 'in summary', 'to summarize', 'firstly',
  'secondly', 'lastly', 'additionally', 'that being said', 'it is worth noting',
  "it's worth noting", 'in today\'s digital age', 'in the modern era', 'at the end of the day',
  'needless to say', 'as we all know', 'it goes without saying',
];
const TELLS_EN = [
  'delve', 'leverage', 'seamless', 'seamlessly', 'robust', 'cutting-edge', 'game-changer',
  'game-changing', 'unlock', 'unleash', 'elevate', 'tapestry', 'realm', 'navigate the landscape',
  'in the realm of', 'a testament to', 'when it comes to', 'plethora', 'paramount', 'pivotal',
  'revolutionize', 'revolutionary', 'world-class', 'best-in-class', 'state-of-the-art', 'synergy',
];
const TRANSITIONS_ZH = ['總之', '綜上所述', '首先', '其次', '再者', '此外', '另外', '值得一提的是', '值得注意的是', '眾所周知', '不言而喻', '在當今數位時代', '在當今數字時代', '在這個時代', '無庸置疑'];
const TELLS_ZH = ['賦能', '抓手', '閉環', '顆粒度', '打法', '對齊', '心智', '生態', '護城河', '降本增效', '全方位', '一站式', '無縫', '極致', '頂級', '革命性', '顛覆'];
// JA — per Convention 14 (EN primary · JA secondary · ZH last), the agent also catches
// Japanese AI-tone filler. No word boundaries in Japanese, so matched by substring like ZH.
const TRANSITIONS_JA = ['まず', '次に', '最後に', 'さらに', '加えて', 'つまり', '要するに', '結論として', '言うまでもなく', '周知のとおり', 'ご存知のとおり', '今日のデジタル時代において'];
const TELLS_JA = ['シームレス', '革新的', '最先端', '世界クラス', '業界をリード', 'パラダイムシフト', '次世代', 'ワンストップ', 'とにかく', 'まさに', '圧倒的', '相乗効果', '抜本的'];

const AI_TONE_EN = [...TRANSITIONS_EN, ...TELLS_EN];
const AI_TONE_ZH = [...TRANSITIONS_ZH, ...TELLS_ZH];
const AI_TONE_JA = [...TRANSITIONS_JA, ...TELLS_JA];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Scan for AI-tone filler. Returns [{ term, count, lang }] sorted by count desc. */
export function aiToneScan(text) {
  const t = String(text || '');
  const lo = t.toLowerCase();
  const hits = [];
  for (const p of AI_TONE_EN) {
    const re = new RegExp((/^[a-z]/.test(p) ? '\\b' : '') + esc(p) + (/[a-z]$/.test(p) ? '\\b' : ''), 'g');
    const n = (lo.match(re) || []).length;
    if (n) hits.push({ term: p, count: n, lang: 'en' });
  }
  for (const p of AI_TONE_ZH) {
    let n = 0, i = 0;
    while ((i = t.indexOf(p, i)) !== -1) { n++; i += p.length; }
    if (n) hits.push({ term: p, count: n, lang: 'zh' });
  }
  for (const p of AI_TONE_JA) {
    let n = 0, i = 0;
    while ((i = t.indexOf(p, i)) !== -1) { n++; i += p.length; }
    if (n) hits.push({ term: p, count: n, lang: 'ja' });
  }
  return hits.sort((a, b) => b.count - a.count);
}

const CLAIM_RE = /\b(improv|increas|reduc|boost|faster|better|save|grow|optimi[sz]|drive|deliver|value|roi|efficien|transform|enhanc|scal|convert|accelerat)\w*/i;
const CLAIM_ZH = ['提升', '增加', '減少', '降低', '優化', '轉化', '轉換', '效率', '價值', '成長', '翻倍', '加速', '節省', '提高', '改善'];
const NUM_RE = /(\$|€|£|¥)?\d[\d,.]*\s?(%|x|bps|k|m|bn|億|萬|倍|％)?/g;
const AUDIENCE_RE = /\b(you|your|team|teams|customer|customers|user|users|client|clients|buyer|recruiter|operator)\b/gi;
const AUDIENCE_ZH = ['你', '您', '客戶', '用戶', '使用者', '團隊', '企業', '買家', '招聘'];

const sentences = (t) => String(t).split(/[.!?。！？\n]+/).map((s) => s.trim()).filter((s) => s.length > 2);
const words = (t) => (String(t).toLowerCase().match(/[a-z0-9']{2,}/g) || []);
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const hasClaim = (s) => CLAIM_RE.test(s) || CLAIM_ZH.some((w) => s.includes(w));
const hasNumber = (s) => /\d/.test(s);

/** Sentences that assert a benefit but carry no number → where to attach ROI/cost/conversion. */
export function quantifyGaps(text) {
  const out = [];
  for (const s of sentences(text)) {
    if (hasClaim(s) && !hasNumber(s)) {
      out.push({ sentence: s.length > 110 ? s.slice(0, 107) + '…' : s, why: 'asserts a benefit with no number — attach ROI / cost / conversion / % or time saved' });
    }
    if (out.length >= 8) break;
  }
  return out;
}

/** Blind-score across five reviewer dimensions; the three weakest are the fatal flaws. */
export function blindScore(text) {
  const t = String(text || '');
  const ss = sentences(t), ws = words(t);
  const nums = (t.match(NUM_RE) || []).filter((x) => /\d/.test(x)).length;
  const aiHits = aiToneScan(t).reduce((a, h) => a + h.count, 0);
  const vague = ambiguityScan(t).length;
  const gaps = quantifyGaps(t).length;
  const claims = ss.filter(hasClaim).length;
  const headings = (t.match(/^\s*(#+\s|\*\s|-\s|\d+\.\s|【)/gm) || []).length;
  const aud = (t.match(AUDIENCE_RE) || []).length + AUDIENCE_ZH.reduce((a, w) => a + (t.split(w).length - 1), 0);
  const avgSent = ss.length ? ws.length / ss.length : ws.length;

  // most-repeated content word → a head term to rank for
  const freq = {}; for (const w of ws) if (w.length >= 4) freq[w] = (freq[w] || 0) + 1;
  const headRepeats = Math.max(0, ...Object.values(freq), 0);

  const clarity = clamp(100 - Math.max(0, avgSent - 18) * 3 + (headings ? 8 : -6));
  const evidence = clamp((nums > 0 ? 55 + nums * 6 : (claims > 0 ? 22 : 55)) - gaps * 14);
  const differentiation = clamp(92 - aiHits * 8 - vague * 6);
  const audience = clamp(aud > 0 ? 48 + aud * 11 : 42);
  const discover = clamp(50 + headings * 7 + (headRepeats > 1 ? 16 : 0));

  const dims = [
    { dim: 'Clarity & structure', score: clarity, why: clarity < 60 ? 'long, run-on sentences or no scannable structure' : 'reads cleanly' },
    { dim: 'Evidence & quantification', score: evidence, why: evidence < 60 ? `${gaps} claim(s) carry no number — quantify them` : 'claims are backed by numbers' },
    { dim: 'Differentiation', score: differentiation, why: differentiation < 60 ? `${aiHits} AI-tone tell(s) + ${vague} vague term(s) make it generic` : 'specific, not generic' },
    { dim: 'Audience fit', score: audience, why: audience < 60 ? 'does not speak to a named reader or job-to-be-done' : 'addresses a clear reader' },
    { dim: 'Discoverability', score: discover, why: discover < 60 ? 'weak structure / no repeated head term to rank for' : 'structured + a clear head term' },
  ];
  const overall = clamp(dims.reduce((a, d) => a + d.score, 0) / dims.length);
  const fatalFlaws = [...dims].sort((a, b) => a.score - b.score).slice(0, 3);
  return { overall, dims, fatalFlaws, signals: { numbers: nums, aiHits, vague, gaps, claims, headings, audience: aud, avgSentenceLen: Math.round(avgSent) } };
}

/** No blind praise: PASS only if it clears the bar; else REWORK with the reason. */
export function verdict(score) {
  const weak = score.fatalFlaws.map((f) => f.dim).slice(0, 2).join(' + ');
  const pass = score.overall >= 70 && score.dims.every((d) => d.score >= 35);
  return {
    pass, label: pass ? 'PASS' : 'REWORK', score: score.overall,
    line: pass
      ? `PASS (${score.overall}/100) — clears the bar. To reach the top 1%, sharpen: ${weak}.`
      : `REWORK (${score.overall}/100) — this would not pass a top-tier interview/review yet. Fix first: ${weak}.`,
  };
}

/** Deterministic de-AI pass: strip filler transitions. The creative rewrite is the human's/host LLM's. */
export function humanTone(text) {
  let t = String(text || ''), removed = 0;
  for (const p of TRANSITIONS_EN) {
    const re = new RegExp('(^|[\\n.!?]\\s*)' + esc(p) + '\\b[,:]?\\s*', 'gi');
    t = t.replace(re, (m, pre) => { removed++; return pre; });
  }
  for (const p of TRANSITIONS_ZH) {
    const re = new RegExp(esc(p) + '[，,、：:]?\\s*', 'g');
    t = t.replace(re, () => { removed++; return ''; });
  }
  for (const p of TRANSITIONS_JA) {
    const re = new RegExp(esc(p) + '[、，,：:]?\\s*', 'g');
    t = t.replace(re, () => { removed++; return ''; });
  }
  return { text: t.replace(/[ \t]{2,}/g, ' ').trim(), removed };
}

/**
 * A compact review block every mission folds into its review stage.
 * Returns { md, issues, score, verdict } so reviews carry the same discipline.
 */
export function qualityBlock(text, opts = {}) {
  const label = opts.label || 'the produced content';
  const scan = aiToneScan(text);
  const gaps = quantifyGaps(text);
  const score = blindScore(text);
  const v = verdict(score);
  const aiTotal = scan.reduce((a, h) => a + h.count, 0);
  let md = `\n## Quality discipline — house rules\n\n`;
  md += `**AI-tone scan (${label}):** ${aiTotal ? scan.slice(0, 8).map((h) => `\`${h.term}\`×${h.count}`).join(', ') : 'clean — no filler detected'}\n\n`;
  md += `**Quantify-or-flag:** ${gaps.length ? gaps.length + ' claim(s) missing a number:' : 'no unquantified claims flagged'}\n`;
  for (const g of gaps) md += `- "${g.sentence}" → ${g.why}\n`;
  md += `\n**Blind score**\n\n| Dimension | Score |\n|---|---:|\n${score.dims.map((d) => `| ${d.dim} | ${d.score} |`).join('\n')}\n| **Overall** | **${score.overall}** |\n\n`;
  md += `**Verdict (no blind praise):** ${v.line}\n`;
  return { md, issues: aiTotal + gaps.length + (v.pass ? 0 : 1), score, verdict: v };
}
