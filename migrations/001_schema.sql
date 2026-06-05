-- Migration 001: Schema inicial
CREATE TABLE IF NOT EXISTS graduates (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  r2_key    TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS rate_limits (
  ip        TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON rate_limits(ip);
CREATE INDEX IF NOT EXISTS idx_rate_limits_created_at ON rate_limits(created_at);
