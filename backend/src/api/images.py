"""Authenticated image streaming endpoint."""

from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
import logging

from ..database import get_db
from ..models import Letter
from .auth import jwt, SECRET_KEY, ALGORITHM, JWTError

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/images", tags=["images"])


def get_current_user_id(authorization: str) -> int:
    """Extract user ID from JWT token."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header"
        )
    
    token = authorization.replace("Bearer ", "")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
        return user_id
    except (JWTError, ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )


@router.get("/{item_id}")
async def stream_image(
    item_id: int,
    authorization: str = Depends(lambda r: r.headers.get("authorization", "")),
    db: Session = Depends(get_db),
):
    """
    Stream an image file for authenticated users (ownership verified).
    
    Args:
        item_id: Mail item ID
        authorization: JWT token
        db: Database session
        
    Returns:
        Image file
        
    Raises:
        HTTPException 404 if item not found or not owned by user
    """
    user_id = get_current_user_id(authorization)
    
    # Verify ownership
    item = db.query(Letter).filter(
        Letter.id == item_id,
        Letter.user_id == user_id
    ).first()
    
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found"
        )
    
    # Check if file exists
    if not os.path.exists(item.file_path):
        logger.error(f"File not found on disk: {item.file_path}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image file not found"
        )
    
    # Determine media type
    media_type = "image/jpeg" if item.file_path.endswith(".jpg") else "image/png"
    
    logger.info(f"Streaming image {item_id} for user {user_id}")
    
    return FileResponse(
        item.file_path,
        media_type=media_type,
        headers={
            "Cache-Control": "private, max-age=3600",
        }
    )
