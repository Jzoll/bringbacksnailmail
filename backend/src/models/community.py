"""
Pydantic models for Community Showcase Wall and related features.

Future implementation will include:
- CommunityPost: User submissions to the Showcase Wall
- SafetyReport: User-generated content moderation reports
- BuddyPreference: Writing buddy matching preferences (roadmap)
"""

from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class ModerationStatus(str, Enum):
    """Content moderation workflow states"""
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    FLAGGED = "flagged"


class ReportReason(str, Enum):
    """Reason categories for safety reports"""
    INAPPROPRIATE = "inappropriate"
    PERSONAL_INFO = "personal_info"
    SPAM = "spam"
    HARASSMENT = "harassment"
    OTHER = "other"


class CommunityPost(BaseModel):
    """
    Showcase Wall submission model (future implementation).
    
    All posts require pre-publication moderation before appearing in public feed.
    """
    id: Optional[int] = None
    user_id: int = Field(..., description="ID of the user who submitted the post")
    image_url: str = Field(..., description="URL to the uploaded image (stored externally)")
    caption: Optional[str] = Field(None, max_length=500, description="Optional caption for the post")
    moderation_status: ModerationStatus = Field(default=ModerationStatus.PENDING)
    moderation_notes: Optional[str] = Field(None, description="Internal notes from moderator")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved_at: Optional[datetime] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_id": 123,
                "image_url": "https://storage.example.com/posts/abc123.jpg",
                "caption": "My first handwritten letter in 10 years!",
                "moderation_status": "pending",
            }
        }


class SafetyReport(BaseModel):
    """
    User-generated content moderation report model (future implementation).
    
    Allows community members to flag inappropriate content.
    """
    id: Optional[int] = None
    post_id: int = Field(..., description="ID of the post being reported")
    reporter_user_id: int = Field(..., description="ID of the user filing the report")
    reason: ReportReason = Field(..., description="Category of the report")
    details: Optional[str] = Field(None, max_length=1000, description="Additional context from reporter")
    reviewed: bool = Field(default=False)
    reviewed_by: Optional[int] = Field(None, description="ID of moderator who reviewed the report")
    reviewed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "post_id": 456,
                "reporter_user_id": 789,
                "reason": "personal_info",
                "details": "Full address is visible in the image.",
            }
        }


class BuddyPreference(BaseModel):
    """
    Writing buddy matching preferences model (roadmap feature).
    
    Future feature to connect users with pen pals based on shared interests.
    """
    id: Optional[int] = None
    user_id: int = Field(..., description="ID of the user")
    interests: list[str] = Field(..., max_items=10, description="List of interests/topics")
    preferred_languages: list[str] = Field(..., max_items=5, description="Languages user can write in")
    country: Optional[str] = Field(None, description="User's country (optional)")
    opt_in: bool = Field(default=False, description="Whether user has opted into matching")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_id": 123,
                "interests": ["gardening", "poetry", "travel"],
                "preferred_languages": ["en", "es"],
                "country": "US",
                "opt_in": True,
            }
        }
