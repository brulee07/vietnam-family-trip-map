# v12.8 Supabase 사진 동기화 설정

- Supabase bucket: `memo-photos` (Public)
- Cloudflare Worker runtime variable: `SUPABASE_URL`
- Cloudflare Worker secret: `SUPABASE_SECRET_KEY`
- Existing D1 binding: `DB`
- Replace the Worker code with `sync-worker/worker.js` and deploy.
- Health endpoint should show `version: 12.8-supabase`, `photoSync: true`, `photoStorage: supabase`.

Note: the v12.8 Worker in this package uses Supabase Storage's documented bulk-delete endpoint for photo deletion.
