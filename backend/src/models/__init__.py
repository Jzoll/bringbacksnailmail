"""SQLAlchemy models for Snail Mail application."""

from sqlalchemy import Column, Integer, String, Text, DateTime, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class User(Base):
    """User account model."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(255), unique=True, nullable=True, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    archived_mail = relationship("ArchivedMail", back_populates="user")


class Prompt(Base):
    """Writing or drawing prompt model."""
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), nullable=False, index=True)  # writing|drawing
    text = Column(Text, nullable=False)
    active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, server_default=func.now())


class ArchivedMail(Base):
    """User's archived mail items (photos with metadata)."""
    __tablename__ = "archived_mail"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    direction = Column(String(50), nullable=False)  # sent|received
    title = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    mail_date = Column(Date, nullable=True)
    file_path = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="archived_mail")
