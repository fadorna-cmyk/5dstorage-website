import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { once } from 'node:events';

let child, base;
const authorization = 'Basic ' + Buffer.from('preview:local-test-password-only-123').toString('base64');
before(async () => {
  const probe = http.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  base = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ['server.mjs'], { cwd: new URL('../', import.meta.url), env: { ...process.env, PORT: String(port), PREVIEW_PASSWORD: 'local-test-password-only-123', PREVIEW_USERNAME: 'preview' }, stdio: ['ignore', 'pipe', 'pipe'] });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server startup timed out')), 10000);
    child.once('error', reject);
    child.once('exit', code => { clearTimeout(timer); reject(new Error(`Server exited: ${code}`)); });
    child.stdout.once('data', () => { clearTimeout(timer); resolve(); });
  });
});
after(() => child?.kill());

test('pages and assets require authentication', async () => {
  for (const pathname of ['/', '/index.html', '/styles.css', '/site-config.js', '/assets/logo.webp', '/missing']) {
    const r = await fetch(base + pathname);
    assert.equal(r.status, 401);
    assert.match(r.headers.get('www-authenticate'), /^Basic/);
    assert.match(r.headers.get('cache-control'), /no-store/);
  }
});
test('invalid credentials are rejected', async () => {
  const r = await fetch(base, { headers: { Authorization: 'Basic ' + Buffer.from('preview:wrong').toString('base64') } });
  assert.equal(r.status, 401);
});
test('authorized page and image are served with security headers', async () => {
  const r = await fetch(base, { headers: { Authorization: authorization } });
  assert.equal(r.status, 200);
  assert.match(await r.text(), /Make room for life/);
  assert.equal(r.headers.get('x-frame-options'), 'DENY');
  assert.match(r.headers.get('x-robots-tag'), /noindex/);
  const asset = await fetch(base + '/assets/logo.webp', { headers: { Authorization: authorization } });
  assert.equal(asset.status, 200);
  assert.equal(asset.headers.get('content-type'), 'image/webp');
});
test('HEAD returns no body and POST is rejected', async () => {
  const r = await fetch(base, { method: 'HEAD', headers: { Authorization: authorization } });
  assert.equal(r.status, 200);
  assert.equal(await r.text(), '');
  assert.equal((await fetch(base, { method: 'POST', headers: { Authorization: authorization } })).status, 405);
});
test('private source, directory listing and encoded traversal are blocked', async () => {
  for (const pathname of ['/server.mjs', '/.env', '/assets/', '/%2e%2e%2fpackage.json', '/%2e%2e%5cpackage.json']) {
    const status = await new Promise((resolve, reject) => {
      const req = http.get(base + pathname, { headers: { Authorization: authorization } }, res => { res.resume(); resolve(res.statusCode); });
      req.on('error', reject);
    });
    assert.equal(status, 404, pathname);
  }
});
test('missing password fails closed', async () => {
  const unsafe = spawn(process.execPath, ['server.mjs'], { cwd: new URL('../', import.meta.url), env: { ...process.env, PREVIEW_PASSWORD: '' }, stdio: 'ignore' });
  const [code] = await once(unsafe, 'exit');
  assert.equal(code, 1);
});
