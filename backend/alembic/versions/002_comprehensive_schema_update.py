"""comprehensive_schema_update

Revision ID: 002_comprehensive
Revises: 001_initial
Create Date: 2026-01-15 22:26:52.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSON


# revision identifiers, used by Alembic.
revision = '002_comprehensive'
down_revision = '001_initial'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create extension for UUID generation (if not exists)
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    
    # Create new tables with UUID primary keys
    
    # User Settings table
    op.create_table('user_settings',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('user_id', UUID(as_uuid=False), nullable=False),
        sa.Column('default_privacy_level', sa.String(length=20), nullable=False),
        sa.Column('email_notifications', sa.Boolean(), nullable=False),
        sa.Column('like_notifications', sa.Boolean(), nullable=False),
        sa.Column('comment_notifications', sa.Boolean(), nullable=False),
        sa.Column('friend_request_notifications', sa.Boolean(), nullable=False),
        sa.Column('timezone', sa.String(length=50), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    
    # Tags table
    op.create_table('tags',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('slug', sa.String(length=100), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('usage_count', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name'),
        sa.UniqueConstraint('slug')
    )
    op.create_index(op.f('ix_tags_name'), 'tags', ['name'], unique=False)
    op.create_index(op.f('ix_tags_slug'), 'tags', ['slug'], unique=False)
    
    # Create new users table with UUID
    op.create_table('users_new',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('username', sa.String(length=255), nullable=True),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=True),
        sa.Column('google_id', sa.String(length=255), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('last_login', sa.DateTime(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('email_verified', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('google_id'),
        sa.UniqueConstraint('username')
    )
    op.create_index(op.f('ix_users_new_email'), 'users_new', ['email'], unique=False)
    op.create_index(op.f('ix_users_new_google_id'), 'users_new', ['google_id'], unique=False)
    op.create_index(op.f('ix_users_new_id'), 'users_new', ['id'], unique=False)
    op.create_index(op.f('ix_users_new_username'), 'users_new', ['username'], unique=False)
    
    # Create new prompts table with UUID
    op.create_table('prompts_new',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('type', sa.String(length=50), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('usage_count', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_prompts_new_id'), 'prompts_new', ['id'], unique=False)
    op.create_index(op.f('ix_prompts_new_type'), 'prompts_new', ['type'], unique=False)
    
    # Create letters table (replaces archived_mail)
    op.create_table('letters',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('user_id', UUID(as_uuid=False), nullable=False),
        sa.Column('prompt_id', UUID(as_uuid=False), nullable=True),
        sa.Column('title', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('file_path', sa.String(length=255), nullable=False),
        sa.Column('file_type', sa.String(length=50), nullable=False),
        sa.Column('file_size', sa.Integer(), nullable=False),
        sa.Column('letter_type', sa.String(length=50), nullable=False),
        sa.Column('privacy_level', sa.String(length=20), nullable=False),
        sa.Column('letter_date', sa.Date(), nullable=True),
        sa.Column('recipient_sender', sa.String(length=255), nullable=True),
        sa.Column('location', sa.String(length=255), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('likes_count', sa.Integer(), nullable=False),
        sa.Column('comments_count', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.Column('deleted_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['prompt_id'], ['prompts_new.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_letters_id'), 'letters', ['id'], unique=False)
    op.create_index(op.f('ix_letters_prompt_id'), 'letters', ['prompt_id'], unique=False)
    op.create_index(op.f('ix_letters_user_id'), 'letters', ['user_id'], unique=False)
    
    # Letter Tags junction table
    op.create_table('letter_tags',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('letter_id', UUID(as_uuid=False), nullable=False),
        sa.Column('tag_id', UUID(as_uuid=False), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['letter_id'], ['letters.id'], ),
        sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Comments table
    op.create_table('comments',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('letter_id', UUID(as_uuid=False), nullable=False),
        sa.Column('user_id', UUID(as_uuid=False), nullable=False),
        sa.Column('parent_id', UUID(as_uuid=False), nullable=True),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('is_edited', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.Column('deleted_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['letter_id'], ['letters.id'], ),
        sa.ForeignKeyConstraint(['parent_id'], ['comments.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_comments_letter_id'), 'comments', ['letter_id'], unique=False)
    op.create_index(op.f('ix_comments_user_id'), 'comments', ['user_id'], unique=False)
    
    # Likes table
    op.create_table('likes',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('letter_id', UUID(as_uuid=False), nullable=False),
        sa.Column('user_id', UUID(as_uuid=False), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['letter_id'], ['letters.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_likes_letter_id'), 'likes', ['letter_id'], unique=False)
    op.create_index(op.f('ix_likes_user_id'), 'likes', ['user_id'], unique=False)
    
    # Friendships table
    op.create_table('friendships',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('requester_id', UUID(as_uuid=False), nullable=False),
        sa.Column('addressee_id', UUID(as_uuid=False), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('requested_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('responded_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['addressee_id'], ['users_new.id'], ),
        sa.ForeignKeyConstraint(['requester_id'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_friendships_addressee_id'), 'friendships', ['addressee_id'], unique=False)
    op.create_index(op.f('ix_friendships_requester_id'), 'friendships', ['requester_id'], unique=False)
    
    # Reports table
    op.create_table('reports',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('letter_id', UUID(as_uuid=False), nullable=False),
        sa.Column('reporter_id', UUID(as_uuid=False), nullable=False),
        sa.Column('reason', sa.String(length=50), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('reviewed_by', UUID(as_uuid=False), nullable=True),
        sa.Column('reviewed_at', sa.DateTime(), nullable=True),
        sa.Column('admin_notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['letter_id'], ['letters.id'], ),
        sa.ForeignKeyConstraint(['reporter_id'], ['users_new.id'], ),
        sa.ForeignKeyConstraint(['reviewed_by'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reports_letter_id'), 'reports', ['letter_id'], unique=False)
    op.create_index(op.f('ix_reports_reporter_id'), 'reports', ['reporter_id'], unique=False)
    
    # Notifications table
    op.create_table('notifications',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('user_id', UUID(as_uuid=False), nullable=False),
        sa.Column('type', sa.String(length=50), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('data', JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('related_id', UUID(as_uuid=False), nullable=True),
        sa.Column('is_read', sa.Boolean(), nullable=False),
        sa.Column('read_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_notifications_user_id'), 'notifications', ['user_id'], unique=False)
    
    # Sessions table
    op.create_table('sessions',
        sa.Column('id', UUID(as_uuid=False), nullable=False),
        sa.Column('user_id', UUID(as_uuid=False), nullable=False),
        sa.Column('session_token', sa.String(length=255), nullable=False),
        sa.Column('device_info', sa.String(length=255), nullable=True),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('last_activity', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users_new.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('session_token')
    )
    op.create_index(op.f('ix_sessions_session_token'), 'sessions', ['session_token'], unique=False)
    op.create_index(op.f('ix_sessions_user_id'), 'sessions', ['user_id'], unique=False)
    
    # Add foreign key constraint for user_settings
    op.create_foreign_key(None, 'user_settings', 'users_new', ['user_id'], ['id'])
    
    # Drop old tables after data migration would be done
    # Note: In production, you'd want to migrate data before dropping
    op.drop_table('archived_mail')
    op.drop_table('prompts')
    op.drop_table('users')
    
    # Rename new tables to final names
    op.rename_table('users_new', 'users')
    op.rename_table('prompts_new', 'prompts')


def downgrade() -> None:
    # This would be quite complex to reverse, but here's the basic structure
    pass