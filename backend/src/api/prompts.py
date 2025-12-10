"""Prompts API endpoint."""

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import Depends
import logging
import random

from ..database import get_db
from ..models import Prompt

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.get("", response_model=dict)
async def get_prompt(
    type: str = Query("writing", description="Prompt type: 'writing' or 'drawing'"),
    db: Session = Depends(get_db),
):
    """
    Get a random active prompt of the specified type.
    
    Args:
        type: "writing" or "drawing"
        db: Database session
        
    Returns:
        dict with a single prompt { id, type, text }
        
    Raises:
        HTTPException 404 if no active prompts of the specified type
    """
    if type not in ["writing", "drawing"]:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid type '{type}'. Must be 'writing' or 'drawing'."
        )
    
    # Get count of active prompts of this type
    count = db.query(func.count(Prompt.id)).filter(
        Prompt.type == type,
        Prompt.active == True
    ).scalar()
    
    if count == 0:
        logger.warning(f"No active prompts found for type: {type}")
        raise HTTPException(
            status_code=404,
            detail=f"No {type} prompts available at this time."
        )
    
    # Pick a random offset and fetch
    offset = random.randint(0, max(0, count - 1))
    prompt = db.query(Prompt).filter(
        Prompt.type == type,
        Prompt.active == True
    ).offset(offset).first()
    
    logger.info(f"Prompt returned for type: {type}", extra={"prompt_id": prompt.id})
    
    return {
        "prompt": {
            "id": prompt.id,
            "type": prompt.type,
            "text": prompt.text,
        }
    }
