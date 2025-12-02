# Quickstart: Bring Back Snail Mail MVP

## Prerequisites
- Node.js 18+
- Python 3.11+

## Frontend (React)

```bash
# Create app (Vite + React + TS)
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install react-router-dom idb
npm install -D @testing-library/react @testing-library/jest-dom jest
```

Add pages and components per plan structure. Implement IndexedDB stores via `idb` for Archive.

Run:
```bash
npm run dev
```

## Backend (FastAPI)

```bash
python -m venv .venv && source .venv/bin/activate
pip install fastapi uvicorn pydantic
```

Create `backend/src/main.py` with `/health` and `/prompts` endpoints (random prompt selection from a small in-memory list).

Run:
```bash
uvicorn backend.src.main:app --reload
```

## Verify
- Frontend renders static pages and client-side navigation.
- Inspiration page fetches `/prompts` and displays results.
- Archive stores images and metadata in IndexedDB and displays gallery.
- Backend health returns `{ status: "ok" }`.

## Next
- Add Postgres and moderation endpoints when enabling Community features.
- Run `.specify/scripts/bash/update-agent-context.sh copilot` to capture tech context.
