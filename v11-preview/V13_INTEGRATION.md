# v13 integration

- Base: 380252a048cd1d39df95fb0d378e96a2eb3d8ae2 (multi-memo cards).
- Photo source: 041f3b57aabb58620a8a00aeaa5c8a5e1d01d048; cherry-picked as 74076b6.
- No conflicts. Photo commit adds only the Da Nang audit and dragon.jpg.
- All data, Da Nang photos and audit match the photo source exactly.
- family-sync.js and memo-cards.js remain unchanged from the base.
- Version labels and cache asset URLs updated to v13; storage keys and backup
  schema remain unchanged for compatibility. No invitation UX change.
- Tests: 22 existing sync/memo regressions plus a local HTTP check of all 16
  Da Nang photos (23 passing tests). JPEG bytes match files served over HTTP.
- Existing AI, weather, Today, itinerary and backup implementations retained.
  Their live external service behavior is not covered by these regression tests.
- Preview is a separate Cloudflare Pages preview named v13-integration in the
  vietnam-family-v11-sync-test project. Deployment-only headers allow existing
  Sync and AI Workers, weather, maps and Supabase image reads; noindex retained.
- Existing Sync Worker Supabase URL is https://aqgduityefmozvkxkuzj.supabase.co,
  previously fixed and phone-tested. No Worker settings, secrets, D1, Storage
  objects or room state are changed by integration/deployment.
- Both phones must open this Preview and join the same existing test room.
  Prior phone verification applies to the v12.9 base; v13 phone testing remains.
