# Research: Bring Back Snail Mail MVP

## Decisions

- Decision: Client-side archive via IndexedDB; backend remains stateless for MVP.
  - Rationale: Privacy-first, minimal scope, offline-friendly; avoids handling PII/files server-side.
  - Alternatives: S3/object storage + backend metadata (Rejected: added complexity, violates MVP privacy constraint).

- Decision: FastAPI for minimal JSON endpoints (health, prompts).
  - Rationale: Lightweight, fast to implement; good fit for random prompt selection.
  - Alternatives: External AI API (Rejected: cost/latency, unnecessary for simple prompt selection).

- Decision: React + React Router for static-first pages and client nav.
  - Rationale: Simple component model; widely used; progressive enhancement possible.
  - Alternatives: Next.js or SSR (Rejected: exceeds minimal static-first requirement for MVP).

## Best Practices

- IndexedDB: Use a small wrapper (idb) for simplicity; define clear store names and versioning; handle migrations gracefully.
- Accessibility: Base font >=16px, visible focus states, alt text for images; respect prefers-reduced-motion.
- Prompt Seeding: Maintain a small prompt list (writing/drawing); random selection; allow future expansion.
- API: Keep endpoints minimal and versioned; return stable JSON shapes; handle errors consistently.

## Patterns

- Client-side Gallery: Store metadata + blob references; render thumbnails via object URLs; paginate with cursors or simple offsets.
- Moderation (Future): State machine (pending, approved, rejected); admin endpoints; public feed reads only approved.
- Matching (Roadmap): Preference collection via forms; matching service mediated by backend; reporting/blocking flows.
