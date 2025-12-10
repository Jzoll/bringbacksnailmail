"""
Backend entry point with structured logging and router configuration.
"""

import logging
import json
from datetime import datetime
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

# Import routers
from .api import health, prompts, auth, mail
# from .api import images  # To be created

# Structured logging setup
class JSONFormatter(logging.Formatter):
    """Format logs as JSON for structured logging."""
    
    def format(self, record):
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_data)


def setup_logging():
    """Configure structured logging for the application."""
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    # Console handler with JSON formatter
    handler = logging.StreamHandler()
    formatter = JSONFormatter()
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    
    return logger


logger = setup_logging()

# FastAPI app initialization
app = FastAPI(
    title="Bring Back Snail Mail API",
    description="REST API for the Snail Mail application",
    version="1.0.0",
)

# CORS configuration
ALLOWED_ORIGINS = os.getenv("FRONTEND_URL", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests and responses."""
    logger.info(
        f"Incoming request",
        extra={
            "method": request.method,
            "path": request.url.path,
            "client": request.client.host if request.client else None,
        },
    )
    response = await call_next(request)
    logger.info(
        f"Response sent",
        extra={
            "method": request.method,
            "path": request.url.path,
            "status": response.status_code,
        },
    )
    return response


# Include routers
app.include_router(health.router)
app.include_router(prompts.router)
app.include_router(auth.router)
app.include_router(mail.router)
# app.include_router(images.router)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle uncaught exceptions with structured logging."""
    logger.error(
        f"Unhandled exception",
        extra={
            "path": request.url.path,
            "method": request.method,
            "exception": str(exc),
        },
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("BACKEND_HOST", "127.0.0.1"),
        port=int(os.getenv("BACKEND_PORT", 8000)),
        reload=os.getenv("ENV") == "development",
    )
