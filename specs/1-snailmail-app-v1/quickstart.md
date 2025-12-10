# Quickstart — Snail Mail MVP

## Backend (FastAPI)

### Setup
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic passlib[bcrypt] python-multipart alembic
```

### Run
```bash
uvicorn backend.src.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend (React + Vite)

### Setup
```bash
npm install
npm run dev
```

## API Reference
See `specs/1-snailmail-app-v1/contracts/openapi.yaml`.

## Notes
- Use JWT `Authorization: Bearer <token>` for authenticated routes.
- Image access via `/images/{id}` is authenticated and streamed.
- Ensure `.env` contains database connection settings for Postgres.
