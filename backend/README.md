# Bring Back Snail Mail — Backend

FastAPI-based REST API for the Snail Mail application.

## Setup

### 1. Create virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment
```bash
cp ../.env.example .env
# Edit .env with your database credentials and secret key
```

### 4. Initialize database
```bash
alembic upgrade head
```

### 5. Seed initial prompts
```bash
python -m src.seeds
```

### 6. Run development server
```bash
uvicorn src.main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Health
- `GET /health` — Check API health status

### Prompts
- `GET /prompts?type=writing|drawing` — Get a random prompt

### Auth
- `POST /auth/register` — Register new user (email, username, password)
- `POST /auth/login` — Sign in (returns JWT access token)
- `POST /auth/logout` — Sign out (client-side token cleanup)

### Mail
- `POST /mail` — Upload new mail item (multipart/form-data with image, title, notes, mail_date, direction)
- `GET /mail?direction=sent|received&skip=0&limit=50` — List user's mail items (paginated, authenticated)
- `DELETE /mail/:id` — Delete mail item (ownership verified, deletes file and DB record)

### Images
- `GET /images/:id` — Stream authenticated image (requires valid JWT token)

## Architecture

- **src/main.py** — FastAPI app setup, middleware, logging
- **src/database.py** — SQLAlchemy ORM config
- **src/models/** — Database models (User, Prompt, ArchivedMail)
- **src/api/** — Route handlers
- **src/middleware/** — Custom middleware (rate limiting, etc.)
- **alembic/** — Database migrations

## Testing

To run smoke tests:
```bash
pytest tests/ -v
```

## Logging

Logs are structured JSON formatted to stdout. Example:
```json
{
  "timestamp": "2025-12-09T00:00:00.000000",
  "level": "INFO",
  "logger": "uvicorn",
  "message": "Incoming request",
  "module": "main",
  "function": "log_requests",
  "line": 74
}
```
