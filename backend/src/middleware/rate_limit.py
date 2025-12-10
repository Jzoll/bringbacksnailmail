"""Basic rate limiting middleware."""

from fastapi import Request, HTTPException
from time import time
from collections import defaultdict
import asyncio

# In-memory rate limit tracking: {ip: [(timestamp, endpoint), ...]}
rate_limit_store = defaultdict(list)


class RateLimitMiddleware:
    """
    Simple in-memory rate limiter.
    
    Limits:
    - /auth/*: 5 requests per minute
    - /mail (POST): 10 requests per minute
    """
    
    LIMITS = {
        "/auth": {"requests": 5, "window": 60},  # 5 per minute
        "/mail": {"requests": 10, "window": 60},  # 10 per minute
    }
    
    @staticmethod
    async def check_rate_limit(request: Request):
        """Check if request exceeds rate limits."""
        client_ip = request.client.host if request.client else "unknown"
        endpoint = request.url.path
        current_time = time()
        
        # Find matching limit rule
        limit_key = None
        for path_prefix, limit in RateLimitMiddleware.LIMITS.items():
            if endpoint.startswith(path_prefix):
                limit_key = path_prefix
                break
        
        if not limit_key:
            return  # No limit for this endpoint
        
        limit_config = RateLimitMiddleware.LIMITS[limit_key]
        key = f"{client_ip}:{limit_key}"
        
        # Clean old entries outside the window
        rate_limit_store[key] = [
            (ts, ep) for ts, ep in rate_limit_store[key]
            if current_time - ts < limit_config["window"]
        ]
        
        # Check if limit exceeded
        if len(rate_limit_store[key]) >= limit_config["requests"]:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please try again later."
            )
        
        # Record this request
        rate_limit_store[key].append((current_time, endpoint))
