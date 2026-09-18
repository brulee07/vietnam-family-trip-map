# v13.1 final usability

Base: `88d48b2c81e17e9b491802f311a79d2cd5d6361c`, branch `work-v13-integration`.

## Place cleanup

- Removed only the approved five built-in places: Quy Nhon Gold Laundry; Tuy Hoa Giặt Ủi Tuy Hòa Laundry and Giặt Sấy Phú Yên; Nha Trang 2H Laundry and Wash & Go.
- `places.json`: 100 places, no laundry category; Da Nang had no additional laundry entry. Removed three itinerary ID references and corresponding laundry instructions in itinerary notes.
- Home/search counts derive from the dataset. Search no longer offers a laundry category for new places. Existing arbitrary custom places are not deleted.
- Retired IDs are filtered from old local routes, saved places, custom entries reusing reserved IDs, Today completion and AI undo lists. Explicit route memo gaps are adjusted for removed entries. The same cleanup is applied to backups and incoming shared state; unrelated invalid IDs still fail validation.
- Inspected trip/cities/safety data, Today, search/map, backup and sync consumers. They have no remaining live references to the retired places. Root legacy HTML and root `data/` still contain historical entries: these are the existing production/older versions, intentionally left unchanged per scope. Historical photo CSVs and audit documents remain unchanged.

## Family invitation

- Existing `#family=...&key=...` links remain compatible. The invitation is captured locally and its fragment removed before showing the join sheet. Pending invitations survive a reload without exposing the key on screen.
- Default invitation UI asks only for device name and offers **가족 여행 참여**. Fresh devices join without a second confirmation. An empty family room retains local records automatically.
- If both sides contain records, the user chooses whether to merge or use the family state. Local pre-join records are saved through the existing pre-restore backup. A network-time local edit aborts applying the join result rather than overwriting that edit.
- Previewing or cancelling another room does not change active credentials. Non-preview pull must register the device successfully before adoption. Storage failure does not report a successful connection.
- `familyTravelFamilySyncV12` and device IDs are preserved. Identity is persisted before first connection. Existing devices reconnect automatically; the server's nine-device limit remains authoritative, including the existing-device-at-cap case.
- Invite copy and device list/count remain in the main family panel. Direct code/key input is under **고급 설정 · 직접 참여 코드 입력**; the key input uses password masking. Manual invite URL selection is also collapsed by default.
- QR deferred: link copy is complete without a new library, service or paid API.
- No actual family key, invite or room backup is committed or logged. Automated/UI checks used isolated synthetic credentials.

## Validation

- `node --test tests/family-sync.test.cjs tests/v13-assets.test.cjs tests/v13-usability.test.cjs`: **35 passed, 0 failed**.
- Existing 22 memo/sync regressions and Da Nang photo HTTP regression pass. Added 12 checks for data references, retired-ID migration/backup, invitations, pending reload, reconnect/device identity, conflict backup, cancellation, errors and Worker device cap.
- Actual browser: name-only invitation, successful join, clipboard invite contents, reload without invite, device count staying 1/9, device list and hidden manual recovery. 390px mobile invitation/recovery/panel buttons fit. Home shows 100; Nha Trang Jan 23 Today/map show the ten remaining stops without laundry.
- UI network used an isolated local in-memory test server; it did not mutate an existing remote family room. Automated sync/photo tests also use a mock server. Real two-phone and authenticated Supabase upload/GET tests remain for the user's existing test room.
- Existing Sync Worker `/health` returned HTTP 200, `ok: true`, `maxDevices: 9`, `photoSync: true`, `photoStorage: supabase`. Worker, D1 and Supabase configuration unchanged.
- All 81 local representative JPEGs decode; photo files and all Freeze audit reports unchanged. Only the app's outdated photo-count label was corrected to the existing frozen total 81.
- Cache identifiers/asset query versions bumped to 13.1 so old data/code caches cannot be confused with this revision. No cache strategy redesign.

## Deployment preparation

- A root-layout static ZIP is prepared outside the repository for a new `v13-final-preview` deployment in `vietnam-family-v11-sync-test`.
- Deployment-only `_headers` reproduce the existing v13 Preview's CSP and noindex/no-referrer policy, including existing Sync/AI Workers, weather/maps and Supabase image reads. Actual checked-in `sync-config.js` points to the existing real Worker; the UI test override is not packaged.
- Cloudflare dashboard currently requires login on this home PC. At this commit, **new Preview deployment and remote Preview validation are pending authentication**. The old Preview and production site have not been replaced.
- No main merge/rebase/push, root promotion, legacy deletion or server/schema change.
