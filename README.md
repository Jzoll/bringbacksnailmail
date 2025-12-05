# Bring Back Snail Mail

A web app to inspire, guide, and celebrate handwritten correspondence. Built with React + TypeScript (frontend) and FastAPI (Python) (backend), this MVP provides static-first pages, beginner-friendly guidance, creative prompts, and a private client-side archive for your snail mail memories.

## Features

- **Get Started**: Step-by-step hero checklist to write your first letter
- **Inspiration**: Creative prompts for writing and drawing (drawing prompts for decorating envelopes/postcards)
- **Archive**: Private client-side gallery using IndexedDB to save photos of your sent/received mail
- **Resources**: Postal guidelines, templates, and supplies
- **Community** (roadmap): Showcase Wall with moderation-first rollout for sharing mail photos

## Overview

- **Frontend**: React (TypeScript) with Vite
- **Backend**: FastAPI (Python 3.11)
- **Storage**: Client-side IndexedDB for Archive (MVP); future Postgres for Community features

## Structure

```
frontend/
  src/
    components/
      Nav.tsx             # Global navigation
      ArchiveForm.tsx     # Upload form for archive items
    pages/
      Home.tsx            # Landing page
      About.tsx           # Project purpose
      GetStarted.tsx      # Hero checklist guide
      Resources.tsx       # Postal guidelines and supplies
      Inspiration.tsx     # Prompt generation
      Archive.tsx         # Private gallery
      Community.tsx       # Showcase Wall stub
      Contact.tsx         # Contact info
    services/
      promptsClient.ts    # API client for /prompts
      idb.ts              # IndexedDB wrapper for Archive
    styles/
      base.css            # Accessibility baseline

backend/
  data/
    prompts.json          # Seed data for writing/drawing prompts
  src/
    api/
      prompts.py          # GET /prompts endpoint
      community.py        # Future routes (disabled)
    models/
      prompt.py           # Pydantic Prompt model
      community.py        # Community models (future)
    services/
      prompt_service.py   # Prompt selection logic
      community_service.py # Moderation service (future)

specs/                    # Feature spec, plan, tasks, contracts
.specify/                 # Governance docs (constitution, templates, scripts)
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

API available at [http://localhost:8000](http://localhost:8000)

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_BACKEND_URL` | `http://localhost:8000` | Backend API base URL (frontend) |

## API Endpoints

### Available Now

- `GET /health` - Health check
- `GET /prompts?type=writing|drawing` - Get random prompt by type

### Future (Not Implemented)

- `POST /community/posts` - Submit to Showcase Wall
- `GET /community/posts` - Get approved posts
- `POST /community/reports` - Report a post
- `GET /community/matches` - Get writing buddy matches

## Testing

### Manual Testing

**US1 Get Started**:
1. Visit `/get-started`
2. Verify hero checklist loads with 5 steps
3. Click "Show me how" to expand detailed instructions
4. Verify links to `/resources` and `/inspiration` work

**US2 Inspiration**:
1. Visit `/inspiration`
2. Select "Writing" or "Drawing"
3. Click "Generate Prompt"
4. Verify prompt displays without errors
5. Test fallback behavior (stop backend and retry)

**US3 Archive**:
1. Visit `/archive`
2. Click "+ Add Mail"
3. Upload a JPEG/PNG image (max 5MB)
4. Fill optional fields (title, notes, mail date)
5. Select direction (Sent/Received)
6. Click "Save Mail"
7. Verify item appears in gallery with thumbnail
8. Click "Delete" and confirm removal

**US4 Community**:
1. Visit `/community`
2. Verify stub page with moderation guidelines
3. Verify submit button is disabled

### Future Automated Tests

Smoke tests planned for `/prompts`, `/health`, and prompt generation UI (see tasks.md T037).

## Accessibility

- Base font size: 16px (system default)
- Focus outlines: 2px solid blue with 2px offset
- Respects `prefers-reduced-motion`
- Semantic HTML with ARIA labels
- All interactive elements keyboard-accessible

## Documentation

- [Spec](specs/001-snailmail-mvp/spec.md) — user stories, requirements, success criteria
- [Plan](specs/001-snailmail-mvp/plan.md) — technical context, decisions, structure
- [Tasks](specs/001-snailmail-mvp/tasks.md) — implementation checklist
- [Quickstart](specs/001-snailmail-mvp/quickstart.md) — detailed setup
- [Constitution](.specify/memory/constitution.md) — principles and governance
- [Data Model](specs/001-snailmail-mvp/data-model.md) — entities and relationships
- [OpenAPI Contracts](specs/001-snailmail-mvp/contracts/) — API specifications

## Environment Variables

### Frontend

Create `frontend/.env.local`:

```env
VITE_BACKEND_URL=http://localhost:8000
```

### Backend

No environment variables required for MVP. Prompts are loaded from `backend/data/prompts.json`.

## Pages

- Home
- About
- Get Started (5-step checklist)
- Resources (postal guidelines, templates, supplies)
- Inspiration (AI prompt generator)
- Archive (private client-side gallery)
- Contact
- Community (future: moderated Showcase Wall)

## API Endpoints

- `GET /health` → `{ status: "ok" }`
- `GET /prompts?type=writing|drawing` → random prompt
- Future: `/community/*` moderation endpoints

## License

MIT
