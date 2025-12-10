"""Mail archive endpoints."""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
import os
import logging
import uuid

from ..database import get_db
from ..models import ArchivedMail, User
from .auth import jwt, SECRET_KEY, ALGORITHM, JWTError

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/mail", tags=["mail"])

IMAGE_STORAGE_PATH = os.getenv("IMAGE_STORAGE_PATH", "./uploads/images")
ALLOWED_TYPES = {"image/jpeg", "image/png"}
MAX_SIZE_MB = 5
MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024


# Response models
class MailItemResponse(BaseModel):
    id: int
    direction: str
    title: Optional[str]
    notes: Optional[str]
    mail_date: Optional[str]
    created_at: str

    class Config:
        from_attributes = True


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


@router.post("", response_model=MailItemResponse, status_code=status.HTTP_201_CREATED)
async def upload_mail_item(
    direction: str = Form(..., description="sent or received"),
    image: UploadFile = File(...),
    title: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    mail_date: Optional[str] = Form(None),
    authorization: str = Depends(lambda r: r.headers.get("authorization", "")),
    db: Session = Depends(get_db),
):
    """
    Upload a new mail item with image and metadata.
    
    Args:
        direction: "sent" or "received"
        image: Image file (JPEG or PNG, max 5MB)
        title: Optional title
        notes: Optional notes
        mail_date: Optional date (YYYY-MM-DD format)
        authorization: JWT token from header
        db: Database session
        
    Returns:
        Created mail item
        
    Raises:
        HTTPException 400 for validation errors
        HTTPException 401 for auth errors
    """
    # Authenticate user
    user_id = get_current_user_id(authorization)
    
    # Validate direction
    if direction not in ["sent", "received"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Direction must be 'sent' or 'received'"
        )
    
    # Validate image type
    if image.content_type not in ALLOWED_TYPES:
        logger.warning(f"Invalid file type uploaded: {image.content_type}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must be JPEG or PNG format. Please select a valid image file."
        )
    
    # Read file and check size
    contents = await image.read()
    if len(contents) > MAX_SIZE_BYTES:
        size_mb = len(contents) / (1024 * 1024)
        logger.warning(f"File too large: {size_mb:.2f}MB")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Image size ({size_mb:.1f}MB) exceeds the maximum allowed size of {MAX_SIZE_MB}MB. Please compress or resize your image and try again."
        )
    
    # Ensure storage directory exists
    os.makedirs(IMAGE_STORAGE_PATH, exist_ok=True)
    
    # Generate unique filename
    file_extension = ".jpg" if image.content_type == "image/jpeg" else ".png"
    filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(IMAGE_STORAGE_PATH, filename)
    
    # Write file to disk
    with open(file_path, "wb") as f:
        f.write(contents)
    
    logger.info(f"Image saved: {file_path}")
    
    # Parse mail_date if provided
    parsed_mail_date = None
    if mail_date:
        try:
            parsed_mail_date = date.fromisoformat(mail_date)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid date format. Use YYYY-MM-DD."
            )
    
    # Create database record
    new_item = ArchivedMail(
        user_id=user_id,
        direction=direction,
        title=title,
        notes=notes,
        mail_date=parsed_mail_date,
        file_path=file_path,
    )
    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    
    logger.info(f"Mail item created: {new_item.id} for user: {user_id}")
    
    return MailItemResponse(
        id=new_item.id,
        direction=new_item.direction,
        title=new_item.title,
        notes=new_item.notes,
        mail_date=new_item.mail_date.isoformat() if new_item.mail_date else None,
        created_at=new_item.created_at.isoformat(),
    )


@router.get("", response_model=list[MailItemResponse])
async def list_mail_items(
    authorization: str = Depends(lambda r: r.headers.get("authorization", "")),
    limit: int = 50,
    offset: int = 0,
    direction: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List user's mail items with optional filtering.
    
    Args:
        authorization: JWT token
        limit: Max items to return (default 50)
        offset: Pagination offset
        direction: Optional filter ("sent" or "received")
        db: Database session
        
    Returns:
        List of mail items
    """
    user_id = get_current_user_id(authorization)
    
    query = db.query(ArchivedMail).filter(ArchivedMail.user_id == user_id)
    
    if direction:
        query = query.filter(ArchivedMail.direction == direction)
    
    items = query.order_by(ArchivedMail.created_at.desc()).offset(offset).limit(limit).all()
    
    return [
        MailItemResponse(
            id=item.id,
            direction=item.direction,
            title=item.title,
            notes=item.notes,
            mail_date=item.mail_date.isoformat() if item.mail_date else None,
            created_at=item.created_at.isoformat(),
        )
        for item in items
    ]


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mail_item(
    item_id: int,
    authorization: str = Depends(lambda r: r.headers.get("authorization", "")),
    db: Session = Depends(get_db),
):
    """
    Delete a mail item (ownership verified).
    
    Args:
        item_id: Mail item ID
        authorization: JWT token
        db: Database session
        
    Raises:
        HTTPException 404 if item not found or not owned by user
    """
    user_id = get_current_user_id(authorization)
    
    item = db.query(ArchivedMail).filter(
        ArchivedMail.id == item_id,
        ArchivedMail.user_id == user_id
    ).first()
    
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mail item not found"
        )
    
    # Delete file from filesystem
    if os.path.exists(item.file_path):
        os.remove(item.file_path)
        logger.info(f"Deleted file: {item.file_path}")
    
    # Delete database record
    db.delete(item)
    db.commit()
    
    logger.info(f"Mail item deleted: {item_id}")
    return None
