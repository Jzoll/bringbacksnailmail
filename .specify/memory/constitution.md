# Bring Back Snail Mail — Constitution

## Core Principles

### I. Minimal & Essential
Only implement features required for a working, useful product. Prefer simple, well-documented pieces that can be extended later.

### II. Slow, Intentional Creativity
Design and copy should emphasize handwriting, slowness, and learning how to send physical mail. UX should guide users toward thoughtful actions.

### III. Privacy & Ownership
User data and uploaded mail/photos belong to the user. Store minimal personal data and protect uploads.

### IV. Framework-Agnostic, Testable Interfaces
APIs and data models must be simple and language-agnostic. Keep contracts small so any stack can implement them.

### V. Beginner-Friendly UI
Readable typography, clear forms, and simple navigation. Accessibility and responsive layout are required.

## Target Users & Success Criteria

- Target users: Individuals interested in traditional mail, handwritten letters, and slow creative habits; includes novices learning how to send a letter and hobbyists seeking inspiration or community.

- Key motivations:
  - Learn how to send physical mail easily
  - Improve or experiment with letter-writing
  - Find creative prompts
  - Archive meaningful correspondence
  - (Future) Connect with others who enjoy snail mail

- What the product allows the user to do:
  - Access clear, step-by-step instructions for sending a letter
  - Read writing tips, templates, and postal guidelines
  - Generate writing or drawing prompts for inspiration
  - Save photos of personal snail-mail correspondences
  - (Community TBD) Share letters or connect with writing buddies

- Primary interactions / navigation:
  - About → mission, purpose
  - Get Started → how to send mail (actionable flow)
  - Resources → guidelines, templates, reference library
  - Inspiration → writing + drawing prompts (generator widget)
  - Community → sharing, finding buddies (placeholder)
  - Contact

- Success criteria / outcomes:
  - User writes more letters this month than the previous month
  - User successfully archives photos/memories of their mail
  - User feels supported in building slow, meaningful writing habits
  - User can complete essential tasks (send a letter, generate a prompt, archive mail) without confusion

## Bare-minimum Product Requirements

- Static pages (public): Home, About, Get Started, Resources, Inspiration, Contact.
- Authenticated area: My Mailbox (personal archive of mailed/received letters).
- Upload flow: Users can upload photos of mailed or received letters into My Mailbox with minimal metadata.
- Minimal backend API for authentication, archive management, and prompt generation.
- Database with three tables: users, archived_mail, prompts.
- Simple top navigation linking all primary sections.
- No community features. Provide placeholders/stubs only.

## Static Pages (content scope)

- Home: Purpose statement, call to action to Get Started, quick links to My Mailbox and prompts.
- About: What the project is and why slow mail matters.
- Get Started: Actionable, step-by-step guide whose primary goal is to convert curiosity into action. Make this page a concise, single-column guided flow that leads a user from idea to posted letter and archived photo. Requirements:
  - Primary CTA: a single clear button labeled "Send your first letter" or "Get Started" that launches the guided flow (route or modal).
  - Flow steps (kept minimal and skippable):
    1. Choose a prompt or pick an idea (link to Inspiration / generator widget).
    2. Gather materials (link to the exact Resources subsection needed).
    3. Use a short, fillable template or tips section to write the letter (include a 3-line example and optional templates).
    4. Address, stamp, and mail (concise checklist + link to postal guidelines in Resources).
    5. Photograph/scan the mailed letter and Upload to My Mailbox (show image tips and a direct Upload CTA).
    6. Success screen: celebrate and link back to My Mailbox and Inspiration.
  - UX details: keep copy encouraging and concise, show progress step indicator, allow skipping or returning to any step, surface secondary CTAs: "Sign up / Log in" and "Browse Resources".
  - Outcome: user finishes the flow and either sees instructions completed or is guided to the Upload step.

- Resources: Curated, authoritative library and reference hub whose primary goal is to provide vetted resource links and deeper content for every step of the Get Started checklist. Requirements:
  - Read-only, clearly labeled reference sections that map directly to Get Started steps (supplies, templates, postal rules, photo tips, accessibility).
  - Each resource entry: one-line description, why it matters, and an external link. Mark sources and last-verified date for trust.
  - Include downloadable templates (paper sizes, printable letter templates) and short how-tos for photographing/archiving mail.
  - Keep the page non-interactive except for external links and downloads; any additional interactivity must be minimal (e.g., expand/collapse for details).

- Inspiration: Example prompts (static) and photo gallery (curated, read-only). Add a minimal AI Writing Prompt Generator UI that calls the prompts API (see /api/prompts and /api/prompts/generate). Requirements:
  - Simple input controls: type (writing | drawing), optional tone, and a Generate button.
  - Show one generated prompt at a time with a small explanation encouraging slow, intentional creativity.
  - Allow the user to copy the prompt or save it to My Mailbox (save is optional; if implemented it calls POST /api/prompts/generate then stores selection locally).
  - Keep the page primarily read-only (curated examples and gallery) — the generator is a small interactive widget, not a social feature.
- Contact: Simple form or mailto link for feedback.

## User Flow — My Mailbox (high level)

1. Unauthenticated user lands on Home or Get Started.
2. User signs up or logs in using email/username + password.
3. After authentication, user sees My Mailbox (empty state with CTA to upload).
4. Upload process (minimal steps):
   - Click Upload
   - Select photo(s) (image file input)
   - Enter optional title and short description
   - Enter optional dates: mailed_date / received_date
   - Submit → show upload progress → success → redirected to My Mailbox list
5. In My Mailbox, user can: view item details (photo + metadata), edit metadata, delete item.
6. No sharing, comments, or social feeds — placeholders only.

## Minimal Backend API (contract-level)

Authentication
- POST /api/auth/register
  - Body: { email, username?, password }
  - Response: { user: { id, email, username }, token }
- POST /api/auth/login
  - Body: { emailOrUsername, password }
  - Response: { user: { id, email, username }, token }
- GET /api/auth/me
  - Auth: Bearer token
  - Response: { user }

Archived mail
- POST /api/mail
  - Auth: Bearer token
  - Accepts multipart/form-data: file (image), title?, description?, mailed_date?, received_date?
  - Response: { item }
- GET /api/mail
  - Auth: Bearer token
  - Query: pagination (optional)
  - Response: { items: [ { id, title, description, image_url, mailed_date, received_date, created_at } ] }
- GET /api/mail/:id
  - Auth: Bearer token
  - Response: { item }
- PUT /api/mail/:id
  - Auth: Bearer token
  - Body: { title?, description?, mailed_date?, received_date? }
  - Response: { item }
- DELETE /api/mail/:id
  - Auth: Bearer token
  - Response: { success: true }

Prompts (simple AI prompt generator)
- GET /api/prompts
  - Public or authenticated: returns a list of curated prompts
- POST /api/prompts/generate
  - Auth optional (can be public)
  - Body: { type?: "writing" | "drawing", tone?: string }
  - Response: { prompt: string }

Notes:
- Keep responses JSON-first and predictable.
- File storage may be local or external (S3/Blob). API returns a stable image_url or storage reference.

## Database (minimal schema)

- users
  - id (uuid or integer, PK)
  - email (string, unique, not null)
  - username (string, unique, nullable)
  - password_hash (string, not null)
  - created_at (timestamp)

- archived_mail
  - id (uuid or integer, PK)
  - user_id (FK -> users.id, index)
  - title (string, nullable)
  - description (text, nullable)
  - image_url (string, not null) // storage reference or URL
  - mailed_date (date, nullable)
  - received_date (date, nullable)
  - created_at (timestamp)

- prompts
  - id (uuid or integer, PK)
  - text (text, not null)
  - category (string, nullable) // e.g., "writing", "drawing"
  - created_at (timestamp)

Indexes: index archived_mail on (user_id, created_at) for efficient listing.

## Navigation & Routing

- Top navigation (visible on all pages): Home | About | Get Started | Resources | Inspiration | My Mailbox | Contact | Login/Account
- Footer: repeat primary links, small copyright and privacy note.
- Routes must be clear and RESTful; UI links should map directly to the static pages and authenticated mailbox.

## UI Guidelines (minimal)

- Typography: readable, large enough for mobile; clear headings and body text.
- Colors: high-contrast, limited palette; emphasize warmth and paper-like tones.
- Layout: responsive, mobile-first, single-column focus for content pages.
- Forms: label every input, show inline validation, simple progress indicator during uploads.
- Accessibility: semantic HTML, alt text for images, keyboard navigation support.

## Security & Data Handling (minimum)

- Use password hashing (bcrypt or similar).
- Protect file uploads against malicious content; validate image types and sizes.
- Authenticate API routes; issue short-lived tokens or sessions.
- Store only necessary personal data (email, username).

## Testing & Quality

- Basic tests: auth, upload flow, retrieving mail items, prompt generation.
- End-to-end smoke test for signup → upload → view → delete.

## Placeholders / Stubs

- Community features (profiles, feeds, sharing) are out of scope. Add TODO stubs in the codebase marked: // TODO: community – placeholder
- Optional micro-interaction: home-page snail animation with fast/slow controls — UI enhancement, out of scope for v0. // TODO: micro-interaction – placeholder
- Optional integrations (payment, address verification, advanced AI) are out of scope for v0.

## Governance

- This constitution is the source of minimal product requirements.
- Amendments must be recorded with rationale and migration notes.

**Version**: 0.1.0 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-01
