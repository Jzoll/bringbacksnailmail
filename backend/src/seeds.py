"""Seed script to populate initial prompts."""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost:5432/snailmail_dev"
)

# Import models
from src.database import Base
from src.models import Prompt

# Create engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


SEED_PROMPTS = [
    # Writing prompts
    {
        "type": "writing",
        "text": "Write a letter to your younger self. What advice would you give?",
        "active": True,
    },
    {
        "type": "writing",
        "text": "Describe your favorite memory in vivid detail, as if writing it for someone who was there.",
        "active": True,
    },
    {
        "type": "writing",
        "text": "Write a thank you letter to someone who has made a difference in your life.",
        "active": True,
    },
    {
        "type": "writing",
        "text": "What does 'home' mean to you? Write about it in 200 words.",
        "active": True,
    },
    {
        "type": "writing",
        "text": "Share a piece of advice you've learned from experience.",
        "active": True,
    },
    # Drawing prompts
    {
        "type": "drawing",
        "text": "Draw your favorite place in the world.",
        "active": True,
    },
    {
        "type": "drawing",
        "text": "Illustrate an emotion using only shapes and colors.",
        "active": True,
    },
    {
        "type": "drawing",
        "text": "Create a pattern inspired by nature.",
        "active": True,
    },
    {
        "type": "drawing",
        "text": "Draw a portrait of someone important to you from memory.",
        "active": True,
    },
    {
        "type": "drawing",
        "text": "Doodle a map of an imaginary place.",
        "active": True,
    },
]


def seed_prompts():
    """Populate the database with initial prompts."""
    session = SessionLocal()
    
    try:
        # Check if prompts already exist
        existing_count = session.query(Prompt).count()
        if existing_count > 0:
            print(f"✓ Database already has {existing_count} prompts. Skipping seed.")
            return
        
        # Insert seed prompts
        for prompt_data in SEED_PROMPTS:
            prompt = Prompt(**prompt_data)
            session.add(prompt)
        
        session.commit()
        print(f"✓ Seeded {len(SEED_PROMPTS)} prompts into the database.")
        
    except Exception as e:
        print(f"✗ Error seeding prompts: {e}")
        session.rollback()
    finally:
        session.close()


if __name__ == "__main__":
    seed_prompts()
