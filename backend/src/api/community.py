"""
Community API routes (future implementation).

Endpoints for Showcase Wall and buddy matching (currently disabled).
"""

from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from models.community import CommunityPost, SafetyReport, ReportReason
from services.community_service import ModerationService, BuddyMatchingService

# Router is defined but not included in main.py until implementation is complete
router = APIRouter(prefix="/community", tags=["community"])


@router.post("/posts", status_code=status.HTTP_201_CREATED, response_model=CommunityPost)
async def submit_post(user_id: int, image_url: str, caption: Optional[str] = None):
    """
    Submit a post to the Showcase Wall (FUTURE - NOT IMPLEMENTED).
    
    All submissions go through pre-publication moderation.
    
    Args:
        user_id: ID of the authenticated user
        image_url: URL to the uploaded image
        caption: Optional caption (max 500 chars)
        
    Returns:
        CommunityPost with PENDING status
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Showcase Wall submissions are not yet available. Stay tuned!"
    )


@router.get("/posts", response_model=List[CommunityPost])
async def get_showcase_feed(limit: int = 50, offset: int = 0):
    """
    Get approved posts for the Showcase Wall (FUTURE - NOT IMPLEMENTED).
    
    Only returns approved posts, ordered by approval date.
    
    Args:
        limit: Maximum number of posts to return (default 50)
        offset: Number of posts to skip for pagination (default 0)
        
    Returns:
        List of approved CommunityPost objects
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Showcase Wall feed is not yet available. Check back soon!"
    )


@router.post("/reports", status_code=status.HTTP_201_CREATED, response_model=SafetyReport)
async def report_post(post_id: int, reporter_user_id: int, reason: ReportReason, details: Optional[str] = None):
    """
    Report a post for moderation (FUTURE - NOT IMPLEMENTED).
    
    Creates a safety report for moderator review.
    
    Args:
        post_id: ID of the post to report
        reporter_user_id: ID of the authenticated user filing the report
        reason: Category of the report
        details: Additional context (optional)
        
    Returns:
        SafetyReport object
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Safety reporting is not yet available."
    )


@router.get("/matches", response_model=List[int])
async def get_buddy_matches(user_id: int, limit: int = 10):
    """
    Get writing buddy matches (ROADMAP - NOT IMPLEMENTED).
    
    Returns list of user IDs that match the user's buddy preferences.
    
    Args:
        user_id: ID of the authenticated user
        limit: Maximum number of matches to return (default 10)
        
    Returns:
        List of user IDs
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Writing buddy matching is a roadmap feature. Coming later!"
    )
