// Retire the nested registration without deleting user data or caches.
// An existing editor is not forcibly navigated or reloaded.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await self.clients.claim();
  await self.registration.unregister();
})()));
