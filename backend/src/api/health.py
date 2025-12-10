"""Health check endpoint."""

from fastapi import APIRouter, Response
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=dict)
async def health_check():
    """
    Health check endpoint.
    
    Returns:
        dict with status "ok"
    """
    logger.info("Health check requested")
    return {"status": "ok"}
