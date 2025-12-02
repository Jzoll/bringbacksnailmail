# Data Model: Bring Back Snail Mail MVP

## Client-side (MVP)

- ArchivedMail (IndexedDB)
  - id (string/uuid)
  - direction ("sent"|"received")
  - title? (string)
  - notes? (string)
  - mail_date? (ISO date string)
  - image_blob (Blob) or storage_key
  - created_at (ISO date string)

## Backend (MVP)

- Prompt (in-memory or file seed)
  - id (string)
  - type ("writing"|"drawing")
  - text (string)
  - active (boolean)

## Future (Community)

- CommunityPost (Postgres)
  - id (uuid)
  - user_id (uuid)
  - image_url (string)
  - caption (string, sanitized; no personal data)
  - status ("pending"|"approved"|"rejected")
  - created_at (timestamp)

- BuddyPreference (Postgres)
  - id (uuid)
  - user_id (uuid)
  - preferences (JSON)
  - created_at (timestamp)

- SafetyReport (Postgres)
  - id (uuid)
  - reporter_user_id (uuid)
  - subject_user_id? (uuid)
  - subject_post_id? (uuid)
  - type (string)
  - notes (string)
  - status (string)
  - created_at (timestamp)
