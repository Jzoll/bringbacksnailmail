# Feature Specification: Bring Back Snail Mail MVP

**Feature Branch**: `001-snailmail-mvp`  
**Created**: 2025-12-02  
**Status**: Draft  
**Input**: Build an application that helps people engage with traditional mail and handwritten letters. The app should provide clear, step-by-step instructions for writing, addressing, stamping, and sending a letter. It should include a Resources section with templates, postal guidelines, and tips for improving letter-writing. Users should be able to generate creative writing or drawing prompts for inspiration. The app should also allow users to archive photos of letters or postcards they send or receive, and view them later in a simple gallery. Navigation should include About, Get Started, Resources, Inspiration, Archive, and Contact pages.

## User Scenarios & Testing (mandatory)

### User Story 1 - Learn and act via Get Started (Priority: P1)

Users follow a short, scannable checklist to learn how to write, address, stamp, and send a letter, with a clear call-to-action to begin.

**Why this priority**: Converts curiosity into action; core value of the app is teaching how to send physical mail with minimal friction.

**Independent Test**: Navigate to Get Started and complete the 5-step checklist flow, including opening the CTA and viewing step details, without using other features.

**Acceptance Scenarios**:

1. Given a visitor is on Get Started, When they click “I’m ready — show me how”, Then steps expand (or modal opens) showing the 5-step checklist.
2. Given steps are visible, When the user opens “Addressing”, Then they see an envelope diagram and example formats for domestic and international.
3. Given steps are visible, When the user clicks “Generate a writing prompt”, Then one prompt is displayed without leaving the page.

---

### User Story 2 - Generate inspiration prompts (Priority: P2)

Users open Inspiration to generate a writing or drawing prompt on demand to jumpstart creativity.

**Why this priority**: Reduces blank-page anxiety; helps beginners start immediately.

**Independent Test**: Open Inspiration and request a prompt (writing and drawing); prompts display without requiring Archive or auth.

**Acceptance Scenarios**:

1. Given a visitor is on Inspiration, When they click “Generate writing prompt”, Then a writing prompt appears.
2. Given the visitor switches prompt type to drawing, When they click generate, Then a drawing prompt appears.
3. Given prompts exist, When the user requests multiple prompts, Then a different prompt can be returned consecutively (allowing repeats over time).

---

### User Story 3 - Archive mailed items privately (Priority: P3)

Authenticated users upload a photo and minimal details for sent/received letters or postcards and view them later in a simple gallery.

**Why this priority**: Builds a personal, private record fostering slow, intentional practice and memory-keeping.

**Independent Test**: Register/login, upload one valid image with direction (sent/received), and view it in the user’s gallery; delete it successfully.

**Acceptance Scenarios**:

1. Given a signed-in user, When they upload a JPEG/PNG with direction and optional metadata, Then the item is saved and appears in their gallery.
2. Given an uploaded item exists, When the user opens its details, Then only the owner can view it.
3. Given an uploaded item exists, When the user deletes it, Then it no longer appears in the gallery list.

### Edge Cases

- Upload is rejected if file type is not JPEG/PNG or exceeds size limit; a clear message is shown.
- Prompt request when no prompts are active returns a friendly fallback message.
- Accessing another user’s archive item returns an authorization error and does not reveal existence/details.
 - Community submission with personal data (addresses/full names) is rejected with guidance to redact.
 - Community public feed shows only approved posts; pending/rejected items are never publicly visible.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: Provide static pages: About, Get Started, Resources, Inspiration, Archive (auth), Contact.
- **FR-002**: Global navigation links to all primary sections; Sign In/Out shown when applicable.
- **FR-003**: Get Started presents a 5-step checklist (Write, Address, Stamp, Seal, Mail) with a primary CTA that expands steps.
- **FR-004**: Inspiration allows users to request a writing or drawing prompt; displays the returned prompt.
- **FR-005**: Auth supports registration, login, logout using email or username + password.
- **FR-006**: Archive supports create (upload image + metadata), list (paginated), get (owner-only), and delete for the current user.
- **FR-007**: Uploaded images are validated for type (JPEG/PNG) and size; rejected uploads return clear errors.
- **FR-008**: Prompts endpoint returns a random active prompt filtered by type (writing|drawing).
- **FR-009**: Health endpoint returns a simple OK payload for uptime checks.
- **FR-010**: Owner-only access is enforced for all archive reads and deletes; no cross-user discovery or search.
- **FR-011**: UI copy is concise, warm, beginner-friendly; typography is readable (>=16px base) and keyboard navigation works across interactive elements.
- **FR-012**: Resources provides structured content areas (postal guidelines, templates, supplies, deep dives) reachable from Get Started links.
- **FR-013**: Archive gallery shows user items in a simple list/grid with thumbnail and basic metadata.
- **FR-014**: Sessions are established on login and expire; either session cookie or token is acceptable.
- **FR-015**: Basic rate limiting is applied to auth endpoints; inputs are validated server-side.
- **FR-016**: Community Showcase Wall (future-enabled): Users can submit a post (image + short caption) to a moderation queue; only approved posts appear publicly; submissions must exclude personal data (no addresses/full names).
- **FR-017**: Community interaction is limited to viewing approved posts; no likes, comments, or DMs in MVP.
- **FR-018**: Moderation workflow exists with states (pending, approved, rejected); moderators can change state; public feed shows only approved.
- **FR-019**: Writing Buddy Matching (roadmap): preference-based matching mediated by the system; real contact info is never publicly exposed; includes reporting and blocking mechanisms; messaging/DMs explicitly out-of-scope.
- **FR-020**: The landing page will incorporate the tagline "slow and steady"

### User Story 4 - Community Showcase Wall (Priority: P4)

Users can submit a photo + short caption to the Showcase Wall for consideration; moderation approves safe content for public viewing. Public viewers can browse approved posts only.

**Why this priority**: Introduces community in a strictly safety-first manner without interactive risks.

**Independent Test**: Submit content with and without personal data; verify moderation states and that only approved content appears publicly; verify no interactive controls beyond viewing.

**Acceptance Scenarios**:

1. Given a signed-in user submits a photo and caption without personal data, When a moderator approves it, Then it appears on the public Showcase Wall.
2. Given a submission contains personal data, When it is validated, Then the submission is rejected with guidance to remove sensitive information.
3. Given the public Showcase Wall is viewed, When a visitor browses posts, Then only approved posts are shown and no likes/comments/DMs are available.

### Key Entities

- **User**: id, email (unique), username (optional unique), password_hash, created_at.
- **ArchivedMail**: id, user_id, direction (sent|received), title?, notes?, mail_date?, image_url, created_at.
- **Prompt**: id, type (writing|drawing), text, active (bool), created_at.
- **CommunityPost** (future): id, user_id, image_url, caption, status (pending|approved|rejected), created_at; public view excludes personal data.
- **BuddyPreference** (roadmap): id, user_id, preferences (structured fields), created_at.
- **SafetyReport** (roadmap): id, reporter_user_id, subject_user_id?, subject_post_id?, type, notes, created_at, status.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: 90% of users can locate and expand the Get Started checklist in under 15 seconds.
- **SC-002**: 95% of prompt requests display a prompt within 1 second of click (perceived, standard network).
- **SC-003**: 95% of valid image uploads succeed and appear in the user’s gallery within 3 seconds of submission (standard network, <5MB file).
- **SC-004**: 100% of archive reads/deletes are owner-only in manual and automated tests (no unauthorized access).
- **SC-005**: All interactive controls are keyboard-operable with visible focus, and base font size is at least 16px on mobile and desktop.
- **SC-006**: 100% of public community posts pass moderation (no unreviewed content displayed); 0 incidents of exposed addresses/full names in public views.
- **SC-007**: Buddy matching (when enabled) logs 100% of mediated exchanges and supports reporting/blocking within one click from the match view; no direct exposure of real contact details.
