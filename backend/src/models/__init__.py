"""SQLAlchemy models for Snail Mail application."""

import uuid
from sqlalchemy import Column, String, Text, DateTime, Date, Boolean, ForeignKey, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


def generate_uuid():
    return str(uuid.uuid4())


class User(Base):
    """User account model."""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(255), unique=True, nullable=True, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    google_id = Column(String(255), unique=True, nullable=True, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    last_login = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    email_verified = Column(Boolean, default=False, nullable=False)

    # Relationships
    letters = relationship("Letter", back_populates="user", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    reports = relationship("Report", foreign_keys="Report.reporter_id", back_populates="reporter")
    sent_friend_requests = relationship("Friendship", foreign_keys="Friendship.requester_id", back_populates="requester")
    received_friend_requests = relationship("Friendship", foreign_keys="Friendship.addressee_id", back_populates="addressee")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    settings = relationship("UserSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")


class UserSettings(Base):
    """User preferences and settings."""
    __tablename__ = "user_settings"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, unique=True)
    default_privacy_level = Column(String(20), default="private", nullable=False)  # private|friends|public
    email_notifications = Column(Boolean, default=True, nullable=False)
    like_notifications = Column(Boolean, default=True, nullable=False)
    comment_notifications = Column(Boolean, default=True, nullable=False)
    friend_request_notifications = Column(Boolean, default=True, nullable=False)
    timezone = Column(String(50), default="UTC", nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="settings")


class Prompt(Base):
    """Writing or drawing prompt model."""
    __tablename__ = "prompts"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid, index=True)
    type = Column(String(50), nullable=False, index=True)  # writing|drawing
    content = Column(Text, nullable=False)
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    usage_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    letters = relationship("Letter", back_populates="prompt")


class Letter(Base):
    """User's letters (formerly ArchivedMail) with enhanced metadata."""
    __tablename__ = "letters"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid, index=True)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    prompt_id = Column(UUID(as_uuid=False), ForeignKey("prompts.id"), nullable=True, index=True)
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    file_path = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)  # image/jpeg|image/png
    file_size = Column(Integer, nullable=False)
    letter_type = Column(String(50), nullable=False)  # sent|received
    privacy_level = Column(String(20), default="private", nullable=False)  # private|friends|public
    letter_date = Column(Date, nullable=True)
    recipient_sender = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    likes_count = Column(Integer, default=0, nullable=False)
    comments_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    is_deleted = Column(Boolean, default=False, nullable=False)
    deleted_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="letters")
    prompt = relationship("Prompt", back_populates="letters")
    tags = relationship("Tag", secondary="letter_tags", back_populates="letters")
    comments = relationship("Comment", back_populates="letter", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="letter", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="letter", cascade="all, delete-orphan")


class Tag(Base):
    """Tags for categorizing letters."""
    __tablename__ = "tags"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    name = Column(String(100), unique=True, nullable=False, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    usage_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    letters = relationship("Letter", secondary="letter_tags", back_populates="tags")


class LetterTag(Base):
    """Association table for Letter-Tag many-to-many relationship."""
    __tablename__ = "letter_tags"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    letter_id = Column(UUID(as_uuid=False), ForeignKey("letters.id"), nullable=False)
    tag_id = Column(UUID(as_uuid=False), ForeignKey("tags.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class Comment(Base):
    """Comments on letters."""
    __tablename__ = "comments"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    letter_id = Column(UUID(as_uuid=False), ForeignKey("letters.id"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    parent_id = Column(UUID(as_uuid=False), ForeignKey("comments.id"), nullable=True)  # for replies
    content = Column(Text, nullable=False)
    is_edited = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    is_deleted = Column(Boolean, default=False, nullable=False)
    deleted_at = Column(DateTime, nullable=True)

    # Relationships
    letter = relationship("Letter", back_populates="comments")
    user = relationship("User", back_populates="comments")
    parent = relationship("Comment", remote_side="Comment.id", backref="replies")


class Like(Base):
    """Likes on letters."""
    __tablename__ = "likes"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    letter_id = Column(UUID(as_uuid=False), ForeignKey("letters.id"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    letter = relationship("Letter", back_populates="likes")
    user = relationship("User", back_populates="likes")

    # Unique constraint to prevent duplicate likes
    __table_args__ = (
        {"schema": None},
    )


class Friendship(Base):
    """Friend relationships between users."""
    __tablename__ = "friendships"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    requester_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    addressee_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    status = Column(String(20), default="pending", nullable=False)  # pending|accepted|blocked
    requested_at = Column(DateTime, server_default=func.now())
    responded_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    requester = relationship("User", foreign_keys=[requester_id], back_populates="sent_friend_requests")
    addressee = relationship("User", foreign_keys=[addressee_id], back_populates="received_friend_requests")


class Report(Base):
    """Content reports for moderation."""
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    letter_id = Column(UUID(as_uuid=False), ForeignKey("letters.id"), nullable=False, index=True)
    reporter_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    reason = Column(String(50), nullable=False)  # inappropriate|spam|harassment|copyright|other
    description = Column(Text, nullable=True)
    status = Column(String(20), default="pending", nullable=False)  # pending|reviewing|resolved|dismissed
    reviewed_by = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    letter = relationship("Letter", back_populates="reports")
    reporter = relationship("User", foreign_keys=[reporter_id], back_populates="reports")
    reviewer = relationship("User", foreign_keys=[reviewed_by])


class Notification(Base):
    """User notifications."""
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    type = Column(String(50), nullable=False)  # like|comment|friend_request|friend_accept|report_update
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    data = Column(JSON, nullable=True)  # additional context data
    related_id = Column(UUID(as_uuid=False), nullable=True)  # letter_id, comment_id, etc
    is_read = Column(Boolean, default=False, nullable=False)
    read_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    expires_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="notifications")


class Session(Base):
    """User session management."""
    __tablename__ = "sessions"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id"), nullable=False, index=True)
    session_token = Column(String(255), unique=True, nullable=False, index=True)
    device_info = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)  # Support IPv6
    last_activity = Column(DateTime, server_default=func.now(), onupdate=func.now())
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="sessions")
