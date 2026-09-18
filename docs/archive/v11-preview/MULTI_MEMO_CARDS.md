# Multiple memo cards (v12.9 preview)

## Data and migration

`familyTravelV11.memoCards` is an object keyed by memo ID. Each record contains
`id`, `routeKey`, `text`, `position` (place gap or null for the end), `order`
(order within that gap), `photo`, `deleted`, and `updatedAt`.
New cards use UUIDs. Legacy records use `legacy:<city>:<date>` so both devices
migrate the same old memo to the same ID. Migration is idempotent and preserves
`notes`, `notePositions`, and `memoPhotos` unchanged as compatibility/recovery
copies. A deleted card remains a tombstone and is not migrated back into view.
Photos keep existing remote URLs and local JPEG data, including offline photos.
Backup schemaVersion is 3; version 11 backups without cards are still accepted.

## Sync

The existing Worker state JSON API and D1 schema are unchanged. `memoCards`
is shared and merged per ID. Different cards never replace the entire day's
memo list. For one card, newest `updatedAt` wins; equal timestamps use deletion
priority then a canonical value tie-break, independent of merge direction.
This is record-level convergence, not collaborative text editing within one card.
Snapshots accepted by push remain distinct from edits made during the request.

Shared photos omit dataUrl and retain a pendingId until upload succeeds. Local
image bytes are restored only when the winning photo identity matches. Upload
results cannot revive a deleted card or overwrite a replacement photo, and text
edits made during an upload survive. Deleting a card or removing a photo is a
logical edit: Storage objects are retained, protecting offline users and backups.

Both family devices must run v12.9 for multiple-card editing. Older clients do
not understand memoCards. Legacy fields remain preserved but are not a live
projection of new cards. Do not run mixed-version editing as an acceptance test.
The existing Worker 350 KB shared-state limit and browser localStorage limits
still apply; there is no new per-day memo-count cap.

## UI

Schedule has an always-available Add memo button. Each card opens its own editor,
has one photo, and can select a gap between places. In edit mode, drag handles
and up/down controls move multiple cards, including within the same gap.
Today and route-map views render every card in the corresponding position.
Backup counts and AI route-note context include all non-deleted cards.
Service-worker cache version/assets were updated only to load the new model;
its fetch/activation structure is unchanged.

## Validation

Run from repository root: `node --test tests/family-sync.test.cjs`.
The tests execute the actual model, app validation/save functions and family-sync
code with mocked transport/storage/timers, without any production network access.
They cover independent concurrent creation/editing, deletions, deterministic
clock ties, migration, photos, positions, backups, conflicts, offline recovery,
and saves while push/poll/upload is in flight.
No production Worker, D1, Supabase or Pages deployment is part of this change.

Local validation (2026-09-18): all 22 regression tests passed. Browser checks
confirmed two cards in the same place gap, photo attachment and decoded image,
independent text editing, up/down reordering, persistence after reload, and both
cards in Today and map views. The browser's confirmation-dialog adapter blocked
completion of the manual delete check; deletion and tombstone convergence passed
the automated tests. Actual two-phone testing and deployment remain outstanding.
