# Bring Back Snail Mail — Application Spec (v1)

## Overview
Target users are individuals interested in traditional mail, handwritten letters, and slow creative habits (beginners, hobbyists, archivists). The product provides beginner-friendly guidance, inspiration via prompts, a private archive (Sent/Received), and a roadmap toward community features.

Non-functional goals: The application SHOULD be mobile-friendly (responsive layouts and touch-accessible interactions) and designed for scalability (stateless backend endpoints, cache-friendly assets, and modular architecture to add features or scale services without rewrites).

## Actors
- **Visitor**: Unauthenticated user browsing public pages.
- **User**: Authenticated user with access to My Mailbox and favorites.
- **Moderator (Future)**: Reviews Community Wall submissions.

## Goals
- Learn how to send physical mail quickly and confidently.
- Improve letter-writing skills with templates and tips.
- Generate writing or drawing prompts.
- Archive meaningful correspondence (photos + metadata).
- Explore community content (future, moderated).

## Primary Pages / Navigation
- Home, About, Get Started, Resources, Inspiration, My Mailbox (Authenticated), Community Wall (TBD), Contact, Sign In / Register.

### Landing Page Interaction (PE)
- A snail graphic will crawl across a defined section of the landing page as a progressive enhancement.
- Controls: "Fast" and "Slow" buttons to adjust speed; honors `prefers-reduced-motion` by pausing or minimizing motion.
- Page remains fully usable without JavaScript; the snail animation is optional and non-blocking.

## User Scenarios & Testing
### US1: Get Started — First Letter
- Visitor reads supplies, addressing, postage placement, mailing options.
- Visitor follows a simple checklist and prints templates.
- Acceptance test: All steps are discoverable and scannable; user completes checklist within 10 minutes.

### US2: Inspiration — Prompt Generation
- Visitor selects writing or drawing prompts; can refresh for a new prompt.
- User can favorite prompts (future) and share to community (future).
- Acceptance test: 95% of prompt requests display a prompt within 1 second.

### US3: My Mailbox — Private Archive
- User uploads photos of Sent/Received items; adds title, date, notes.
- User views items in tabs (Sent, Received); clicks a card to enlarge and zoom.
- Acceptance test: User can add an item (JPEG/PNG) < 5MB and see it in the correct tab; delete removes it.

### US4: Community Wall (TBD)
- Visitor sees curated examples; no uploads in v1.
- Future: Moderation-first submission and safety reporting.
- Acceptance test: UI clearly communicates that submissions are disabled.

## Functional Requirements
- **FR1: Navigation**: Global nav lists all primary pages; indicates auth state.
- **FR2: Get Started Content**: Supplies list, addressing diagram, postage placement, mailing options, templates, checklist.
- **FR3: Resources Library**: Categorized educational content with templates and external references.
- **FR4: Prompts API**: Return a random prompt for `writing|drawing`; friendly 404 when none.
- **FR5: Inspiration UI**: Toggle writing/drawing; request prompt; display/loading/error states.
- **FR6: Archive Upload**: Validate image type `image/jpeg|image/png` and size ≤ 5MB; store image on server filesystem with metadata in Postgres; images accessed via authenticated streaming.
- **FR7: Archive Views**: Tabs for Sent and Received; grid of cards; enlarge/zoom view.
- **FR8: Archive Delete**: Remove item and reflect in UI immediately.
- **FR9: Privacy**: Archive is private; no public sharing.
- **FR10: Community Stub**: Public page communicates moderation-first roadmap; submissions disabled.
- **FR11: Accessibility**: WCAG AA color contrast, keyboard operability, labeled diagrams, reduced motion.
- **FR12: Auth (v1 scope)**: Register and Sign In/Out with JWT; My Mailbox is gated behind authentication. Favorites are deferred post‑MVP.
- **FR13: Logging**: Structured logs on backend for requests and errors.
- **FR13.1: Rate Limiting (v1)**: Enable lightweight limits on auth and upload endpoints to reduce abuse.
- **FR14: Mobile-Friendly**: Responsive layouts and touch-target sizes; navigation and forms are usable on small screens (≤ 360px) and tablet.
- **FR15: Scalability Baseline**: Backend endpoints are stateless; assets are cacheable; architecture is modular to support future horizontal scaling.
- **FR16: Snail Interaction (PE)**: Landing page includes a snail graphic with speed controls (Fast/Slow); motion respects accessibility settings and degrades gracefully.

## Success Criteria
- **SC1**: 90% of first-time visitors complete the Get Started checklist in ≤ 10 minutes.
- **SC2**: 95% of prompt requests display within 1 second.
- **SC3**: 95% of valid uploads (≤ 5MB JPEG/PNG) succeed; user sees item immediately.
- **SC4**: 90% of users report “clear and easy” for Sending a Letter task.
- **SC5**: Archive browsing latency feels instant; enlarge/zoom interaction under 300ms.
- **SC6**: Accessibility audit passes core checks (focus, labels, contrast).
- **SC7**: Mobile usability: 95% of interactions (nav, forms, prompt generation, archive add/delete) complete successfully on small screens (≤ 360px) without zooming.
- **SC8**: Scalability readiness: Backend returns p95 response ≤ 300ms for `/health` and `/prompts` under light concurrency (e.g., 50 RPS in test), and static assets are served with cache headers.
 - **SC9**: Basic rate limiting active on auth and upload endpoints without blocking normal usage.

## Key Entities
- **ArchivedMail**: { id, direction: sent|received, title?, notes?, date?, file_path, created_at }
- **Prompt**: { id, type: writing|drawing, text, active }
- **User**: { id, email, username?, password_hash }

## Assumptions
- Archive in v1 uses server-side image storage with file paths in the DB; access is authenticated and streamed (no public URLs).
- Community features are stub-only; no uploads or interactions.
- Auth is planned for future; v1 UI works without sign-in, except archive.

## Constraints
- No public sharing of personal archive content.
- No complex social features in v1.
- Performance suitable for low-power devices and slow connections.

## Risks
- Image storage growth; mitigate via size validation and guidance.
- Accessibility omissions; mitigate with audit and clear diagrams.

## Out of Scope (v1)
- Full community submissions and moderation workflows.
- Server-side image storage and CDN.
- Complex search or tagging systems.

## Notes
- Spec aligns with constitution v0.2.1 (README/CHANGELOG policy, accessibility, privacy).

## Clarifications
### Session 2025-12-09
- Q: What auth scope should v1 include? → A: Register/login with JWT; gate My Mailbox; favorites deferred.
 - Q: Where should images be stored in v1? → A: Server-side storage with Postgres metadata; access via authenticated streaming.
 - Q: Should v1 include rate limiting? → A: Yes — basic limits on auth and uploads.
 - Q: How should upload errors be surfaced? → A: Friendly inline messages for type/size with retry guidance.
 - Q: Expected per-user item volume? → A: ~200 items; paginate lists.
 - Q: Accessibility audit tooling? → A: Use axe DevTools + Lighthouse.
