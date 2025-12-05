"""
Prompt selection service.
"""

import json
import random
import logging
from pathlib import Path
from typing import List, Optional
from ..models.prompt import Prompt

logger = logging.getLogger(__name__)

PROMPTS_FILE = Path(__file__).parent.parent.parent / "data" / "prompts.json"

# Cache prompts in memory for performance
_prompts_cache: Optional[List[Prompt]] = None


def load_prompts() -> List[Prompt]:
    """Load prompts from JSON file."""
    global _prompts_cache
    
    if _prompts_cache is not None:
        return _prompts_cache
    
    try:
        with open(PROMPTS_FILE, "r") as f:
            data = json.load(f)
        
        _prompts_cache = [Prompt(**item) for item in data]
        logger.info(f"Loaded {len(_prompts_cache)} prompts from {PROMPTS_FILE}")
        return _prompts_cache
        
    except Exception as e:
        logger.error(f"Failed to load prompts: {e}", exc_info=True)
        return []


def get_random_prompt(prompt_type: Optional[str] = None) -> Optional[Prompt]:
    """Get a random active prompt, optionally filtered by type."""
    prompts = load_prompts()
    
    if not prompts:
        logger.warning("No prompts available in database")
        return None
    
    active = [p for p in prompts if p.active]
    
    if prompt_type:
        active = [p for p in active if p.type == prompt_type]
    
    if not active:
        logger.warning(f"No active prompts found for type={prompt_type}")
        return None
    
    selected = random.choice(active)
    logger.debug(f"Selected prompt: id={selected.id}, type={selected.type}")
    return selected
