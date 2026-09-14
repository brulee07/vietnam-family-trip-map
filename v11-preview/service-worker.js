const CACHE='family-travel-v11-6-preview-1';
const PREFIX='family-travel-';
const FILES=['./','./index.html','./app.css?v=11.6','./map-improvements.css?v=11.6','./home-improvements.css?v=11.6','./app.js?v=11.6','./ai-config.js?v=11.6','./manifest.json','./data/trip.json','./data/cities.json','./data/places.json','./data/itineraries.json','./data/safety.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(new Request(e.request,{cache:'no-store'})).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.open(CACHE).then(c=>c.match(e.request,{ignoreSearch:true})).then(r=>r||Response.error())));});
