import http from 'node:http';
import { createHash, timingSafeEqual } from 'node:crypto';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const password = process.env.PREVIEW_PASSWORD;
const username = process.env.PREVIEW_USERNAME || 'preview';
if (!password || password.length < 16) {
  console.error('Set PREVIEW_PASSWORD to a unique password of at least 16 characters before starting.');
  process.exit(1);
}
const root = await realpath(fileURLToPath(new URL('./public/', import.meta.url)));
const hash = value => createHash('sha256').update(value).digest();
const expected = hash(`${username}:${password}`);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

function authenticated(header) {
  if (typeof header !== 'string' || header.length > 4096 || !/^Basic [A-Za-z0-9+/]+={0,2}$/i.test(header)) return false;
  const credentials = Buffer.from(header.slice(6), 'base64').toString('utf8');
  return timingSafeEqual(hash(credentials), expected);
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.google.com https://maps.google.com https://www.google.com.ph; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
  if (!authenticated(req.headers.authorization)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="5D Storage Preview", charset="UTF-8"');
    res.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Password required.');
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }
  try {
    const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (requestPath.includes('\0') || requestPath.includes('\\')) throw new Error('Invalid path');
    const requested = path.resolve(root, `.${requestPath === '/' ? '/index.html' : requestPath}`);
    if (!requested.startsWith(root + path.sep)) throw new Error('Outside public directory');
    const actual = await realpath(requested);
    if (!actual.startsWith(root + path.sep) || !(await stat(actual)).isFile()) throw new Error('Not a public file');
    const data = await readFile(actual);
    res.writeHead(200, { 'Content-Type': types[path.extname(actual).toLowerCase()] || 'application/octet-stream', 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found.');
  }
});
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('5D Storage password-protected preview is listening.'));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
