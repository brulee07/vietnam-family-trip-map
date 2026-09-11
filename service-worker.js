const CACHE_NAME = 'vietnam-family-trip-v9-5-1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './da_nang.html',
  './quy_nhon.html',
  './tuy_hoa.html',
  './nha_trang.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './data/index.html',
  './data/trip.json',
  './data/cities.json',
  './data/places.json',
  './data/itineraries.json',
  './data/safety.json',
  './ai-assistant.css',
  './ai-config.js',
  './ai-assistant.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const accept = req.headers.get('accept') || '';

  // HTML 문서는 최신 배포가 바로 반영되도록 network-first로 처리합니다.
  if (req.mode === 'navigate' || accept.includes('text/html')) {
    event.respondWith(
      fetch(req).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return response;
      }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
