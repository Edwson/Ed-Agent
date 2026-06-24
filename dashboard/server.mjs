#!/usr/bin/env node
// dashboard/server.mjs — the Ed Agent control room. A zero-dependency node:http server
// that serves one self-contained page and reads/writes the SAME human-readable
// Ed_agents_Claude.md the CLI uses. It binds to 127.0.0.1 ONLY — it never listens on a
// public interface, and it has no exfiltration path: it serves a local page and edits a
// local file. (Privacy by construction, not by promise.)
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadState, applyOps } from './data.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const HOST = '127.0.0.1'; // localhost only — never a public interface
const json = (res, code, obj) => { const b = JSON.stringify(obj); res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'content-length': Buffer.byteLength(b), 'cache-control': 'no-store' }); res.end(b); };

function readBody(req, limit = 1 << 20) {
  return new Promise((resolve, reject) => {
    let data = '', n = 0;
    req.on('data', (c) => { n += c.length; if (n > limit) { reject(new Error('body too large')); req.destroy(); } else data += c; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export function start(opts = {}) {
  const port = Number(opts.port || 4317);
  const memPath = opts.memPath || join(root, 'Ed_agents_Claude.md');
  const indexPath = join(here, 'index.html');

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://' + HOST);
      // ── API ──
      if (url.pathname === '/api/state' && req.method === 'GET') return json(res, 200, loadState(memPath));
      if (url.pathname === '/api/apply' && req.method === 'POST') {
        const body = await readBody(req);
        let ops; try { ops = JSON.parse(body || '{}').ops; } catch { return json(res, 400, { error: 'invalid JSON' }); }
        if (!Array.isArray(ops)) return json(res, 400, { error: 'ops must be an array' });
        try { return json(res, 200, applyOps(memPath, ops)); }
        catch (e) { return json(res, 400, { error: String(e && e.message || e) }); }
      }
      if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'no such endpoint' });
      // ── the single page ──
      if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
        if (!existsSync(indexPath)) { res.writeHead(500, { 'content-type': 'text/plain' }); return res.end('dashboard/index.html not found'); }
        const html = readFileSync(indexPath, 'utf8');
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' });
        return res.end(html);
      }
      res.writeHead(404, { 'content-type': 'text/plain' }); res.end('not found');
    } catch (e) {
      json(res, 500, { error: String(e && e.message || e) });
    }
  });

  server.listen(port, HOST, () => {
    const url = `http://${HOST}:${port}/`;
    const mark = existsSync(memPath) ? '' : '  (no runs yet — it will fill as you run ed-agent)';
    process.stderr.write(`\n  Ed Agent · control room\n  ${url}\n  reading ${memPath}${mark}\n  localhost only · reflects real runs · est. tokens, not a bill\n  Ctrl-C to stop\n\n`);
    if (opts.open) tryOpen(url);
  });
  server.on('error', (e) => {
    if (e && e.code === 'EADDRINUSE') process.stderr.write(`\n  Port ${port} is in use. Try: ed-agent dashboard --port ${port + 1}\n\n`);
    else process.stderr.write('  dashboard error: ' + (e && e.message || e) + '\n');
    process.exit(1);
  });
  return server;
}

// best-effort browser open (built-in only; never fatal)
function tryOpen(url) {
  import('node:child_process').then(({ spawn }) => {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    try { spawn(cmd, [url], { stdio: 'ignore', detached: true, shell: process.platform === 'win32' }).unref(); } catch { /* ignore */ }
  }).catch(() => {});
}

// run standalone: node dashboard/server.mjs [--port N] [--mem path] [--open]
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const a = process.argv.slice(2); const f = {};
  for (let i = 0; i < a.length; i++) { if (a[i] === '--port') f.port = a[++i]; else if (a[i] === '--mem') f.memPath = a[++i]; else if (a[i] === '--open') f.open = true; }
  start(f);
}
