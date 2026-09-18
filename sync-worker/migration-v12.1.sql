CREATE TABLE IF NOT EXISTS devices (
  room_code TEXT NOT NULL,
  device_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  joined_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  last_sync_at TEXT,
  PRIMARY KEY (room_code, device_id)
);
CREATE INDEX IF NOT EXISTS idx_devices_room_seen ON devices(room_code, last_seen_at DESC);
CREATE TRIGGER IF NOT EXISTS trg_devices_max9
BEFORE INSERT ON devices
WHEN (SELECT COUNT(*) FROM devices WHERE room_code = NEW.room_code) >= 9
BEGIN
  SELECT RAISE(ABORT, 'max_devices');
END;
