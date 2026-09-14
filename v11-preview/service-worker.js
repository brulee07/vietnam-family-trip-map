const CACHE='family-travel-v11-4-preview-1';
const FILES=['./','./index.html','./app.css','./map-improvements.css','./home-improvements.css','./app.js','./ai-config.js','./manifest.json','./data/trip.json','./data/cities.json','./data/places.json','./data/itineraries.json','./data/safety.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.open(CACHE).then(c=>c.match(e.request,{ignoreSearch:true})).then(r=>r||Response.error())));});
