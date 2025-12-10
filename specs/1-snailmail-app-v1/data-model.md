# Data Model — Bring Back Snail Mail (v1)

## Entities

### users
- id (UUID)
- email (string, unique)
- username (string, optional)
- password_hash (string)
- created_at (timestamp)

### archived_mail
- id (UUID)
- user_id (UUID, FK -> users.id)
- title (string, optional)
- notes (text, optional)
- direction (enum: sent | received)
- mail_date (date, optional)
- file_path (string)
- created_at (timestamp)

### prompts
- id (UUID)
- type (enum: writing | drawing)
- text (string)
- active (boolean)
- created_at (timestamp)

## Relationships
- users 1..N archived_mail

## Validation Rules
- uploads: type `image/jpeg|image/png`, size ≤ 5MB
- prompts: `type` required; `text` non-empty; `active` default true
- users: `email` unique; password hashed via `passlib`

## Indexes
- users.email (unique)
- archived_mail.user_id
- prompts.type, prompts.active
