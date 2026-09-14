CREATE TABLE IF NOT EXISTS rooms (
  code TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL,
  state_json TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rooms_updated_at ON rooms(updated_at);
