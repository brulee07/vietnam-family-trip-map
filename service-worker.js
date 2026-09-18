// Root release cache. Never delete user storage or another project's caches.
const ROOT = new URL('./', self.location.href);
const PREFIX = 'vietnam-family-root:' + ROOT.pathname + ':';
const CACHE = PREFIX + '13.2-1';
const FILES = ['./','./index.html','./memo-cards.js?v=13.2','./app.css?v=13.2','./map-improvements.css?v=13.2','./home-improvements.css?v=13.2','./family-sync.css?v=13.2','./app.js?v=13.2','./ai-config.js?v=13.2','./sync-config.js?v=13.2','./family-sync.js?v=13.2','./manifest.json','./data/trip.json?v=13.2','./data/cities.json?v=13.2','./data/places.json?v=13.2','./data/itineraries.json?v=13.2','./data/safety.json?v=13.2','./icons/icon-192.png','./icons/icon-512.png','./da_nang.html','./quy_nhon.html','./tuy_hoa.html','./nha_trang.html','./da_nang_json_beta.html','./quy_nhon_json_beta.html','./tuy_hoa_json_beta.html','./nha_trang_json_alpha.html','./nha_trang_json_beta.html','./data/index.html','./v11-preview/index.html'];
const shellPaths = new Set(FILES.map(p => new URL(p, ROOT).pathname));
const inside = url => url.origin === ROOT.origin && url.pathname.startsWith(ROOT.pathname);
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const name of await caches.keys()) {
    if (name === CACHE) continue;
    if (name.startsWith(PREFIX)) { await caches.delete(name); continue; }
    // Delete a legacy root cache only when every entry belongs to this app.
    // Preview caches are retained; the new worker never reads them.
    if (/^vietnam-family-trip-v[0-9]/.test(name)) {
      const entries = await (await caches.open(name)).keys();
      if (entries.length && entries.every(request => inside(new URL(request.url)))) await caches.delete(name);
    }
  }
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || !inside(url)) return;
  const cacheable = shellPaths.has(url.pathname) || url.pathname.startsWith(ROOT.pathname + 'photos/') || url.pathname.startsWith(ROOT.pathname + 'icons/');
  if (!cacheable) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(new Request(request, {cache:'no-store'}));
      if (response.ok) { try { await cache.put(request, response.clone()); } catch {} }
      return response;
    } catch {
      return await cache.match(request, {ignoreSearch:true}) || Response.error();
    }
  })());
});
