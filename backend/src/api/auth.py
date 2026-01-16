"""Authentication endpoints."""

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import os
import logging
import httpx

from ..database import get_db
from ..models import User, UserSettings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["auth"])

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
JWT_EXPIRATION_MINUTES = int(os.getenv("JWT_EXPIRATION_MINUTES", "60"))
ALGORITHM = "HS256"


# Request/Response models
class RegisterRequest(BaseModel):
    email: EmailStr
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=100)


class LoginRequest(BaseModel):
    identifier: str = Field(..., description="Email or username")
    password: str


class GoogleLoginRequest(BaseModel):
    id_token: str = Field(..., description="Google ID token")


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(user_id: str, email: str) -> str:
    """Create a JWT access token."""
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION_MINUTES)
    to_encode = {
        "sub": user_id,
        "email": email,
        "exp": expire,
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new user account.
    
    Args:
        request: Registration data (email, optional username, password)
        db: Database session
        
    Returns:
        AuthResponse with access token and user info
        
    Raises:
        HTTPException 400 if email or username already exists
    """
    # Check if email already exists
    existing_email = db.query(User).filter(User.email == request.email).first()
    if existing_email:
        logger.warning(f"Registration attempt with existing email: {request.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists (if provided)
    if request.username:
        existing_username = db.query(User).filter(User.username == request.username).first()
        if existing_username:
            logger.warning(f"Registration attempt with existing username: {request.username}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
    
    # Create new user
    password_hash = hash_password(request.password)
    new_user = User(
        email=request.email,
        username=request.username,
        password_hash=password_hash,
        is_active=True,
        email_verified=False,
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create default user settings
    user_settings = UserSettings(
        user_id=new_user.id,
        default_privacy_level="private",
        email_notifications=True,
        like_notifications=True,
        comment_notifications=True,
        friend_request_notifications=True,
        timezone="UTC",
    )
    db.add(user_settings)
    db.commit()
    
    logger.info(f"New user registered: {new_user.email}")
    
    # Generate access token
    access_token = create_access_token(new_user.id, new_user.email)
    
    return AuthResponse(
        access_token=access_token,
        user={
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username,
        }
    )


@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Sign in with email/username and password.
    
    Args:
        request: Login credentials (identifier, password)
        db: Database session
        
    Returns:
        AuthResponse with access token and user info
        
    Raises:
        HTTPException 401 if credentials are invalid
    """
    # Find user by email or username
    user = db.query(User).filter(
        (User.email == request.identifier) | (User.username == request.identifier)
    ).first()
    
    if not user:
        logger.warning(f"Login attempt with unknown identifier: {request.identifier}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password
    if not verify_password(request.password, user.password_hash):
        logger.warning(f"Failed login attempt for user: {user.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    logger.info(f"User logged in: {user.email}")
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Generate access token
    access_token = create_access_token(user.id, user.email)
    
    return AuthResponse(
        access_token=access_token,
        user={
            "id": user.id,
            "email": user.email,
            "username": user.username,
        }
    )


@router.post("/google", response_model=AuthResponse)
async def google_login(request: GoogleLoginRequest, db: Session = Depends(get_db)):
    """
    Sign in with Google OAuth ID token.
    
    Args:
        request: Google ID token
        db: Database session
        
    Returns:
        AuthResponse with access token and user info
        
    Raises:
        HTTPException 401 if token is invalid
    """
    try:
        # Verify Google ID token
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://oauth2.googleapis.com/tokeninfo?id_token={request.id_token}"
            )
            
            if response.status_code != 200:
                logger.warning("Invalid Google ID token")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid Google token"
                )
            
            token_info = response.json()
            
            # Verify token audience matches our client ID
            google_client_id = os.getenv("GOOGLE_CLIENT_ID")
            if google_client_id and token_info.get("aud") != google_client_id:
                logger.warning("Google token audience mismatch")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token audience"
                )
            
            # Extract user info from token
            google_id = token_info.get("sub")
            email = token_info.get("email")
            email_verified = token_info.get("email_verified", False)
            full_name = token_info.get("name")
            
            if not google_id or not email:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload"
                )
            
            # Check if user exists with this Google ID
            user = db.query(User).filter(User.google_id == google_id).first()
            
            if not user:
                # Check if user exists with this email
                user = db.query(User).filter(User.email == email).first()
                
                if user:
                    # Link Google account to existing user
                    user.google_id = google_id
                    user.email_verified = email_verified
                    if not user.full_name and full_name:
                        user.full_name = full_name
                else:
                    # Create new user
                    user = User(
                        email=email,
                        google_id=google_id,
                        full_name=full_name,
                        password_hash="",  # No password for OAuth users
                        is_active=True,
                        email_verified=email_verified,
                    )
                    db.add(user)
                    db.flush()  # Get user ID
                    
                    # Create default user settings
                    user_settings = UserSettings(
                        user_id=user.id,
                        default_privacy_level="private",
                        email_notifications=True,
                        like_notifications=True,
                        comment_notifications=True,
                        friend_request_notifications=True,
                        timezone="UTC",
                    )
                    db.add(user_settings)
                    
                    logger.info(f"New user created via Google OAuth: {email}")
            
            # Update last login
            user.last_login = datetime.utcnow()
            db.commit()
            db.refresh(user)
            
            logger.info(f"User logged in via Google: {user.email}")
            
            # Generate access token
            access_token = create_access_token(user.id, user.email)
            
            return AuthResponse(
                access_token=access_token,
                user={
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "full_name": user.full_name,
                }
            )
            
    except httpx.HTTPError as e:
        logger.error(f"Error verifying Google token: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error verifying Google token"
        )


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout():
    """
    Sign out (client should discard token).
    
    Note: With JWT, logout is primarily client-side.
    This endpoint exists for consistency and future token blacklisting.
    """
    logger.info("User logged out")
    return None
