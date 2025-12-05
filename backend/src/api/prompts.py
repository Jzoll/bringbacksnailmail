"""
Prompts API endpoint.
"""

import logging
from fastapi import APIRouter, HTTPException, Query
from ..services.prompt_service import get_random_prompt

router = APIRouter(prefix="/prompts", tags=["prompts"])
logger = logging.getLogger(__name__)


@router.get("")
def get_prompt(type: str = Query(..., regex="^(writing|drawing)$")):
    """Get a random prompt filtered by type."""
    logger.info(f"Prompt requested with type={type}")
    
    try:
        prompt = get_random_prompt(prompt_type=type)
        
        if not prompt:
            logger.warning(f"No active {type} prompts available")
            raise HTTPException(
                status_code=404,
                detail=f"No active {type} prompts available. Please try again later."
            )
        
        logger.info(f"Returning prompt id={prompt.id}, type={prompt.type}")
        return {"prompt": prompt.model_dump()}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching prompt: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch prompt. Please try again."
        )
