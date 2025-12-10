"""Initial migration: create users, prompts, and archived_mail tables.

Revision ID: 001_initial
Create Date: 2025-12-09 00:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


# Revision identifiers
revision = "001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Create initial schema."""
    # Users table
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("email", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("username", sa.String(255), unique=True, nullable=True, index=True),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )

    # Prompts table
    op.create_table(
        "prompts",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("type", sa.String(50), nullable=False, index=True),  # writing|drawing
        sa.Column("text", sa.Text, nullable=False),
        sa.Column("active", sa.Boolean, nullable=False, default=True),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )

    # ArchivedMail table
    op.create_table(
        "archived_mail",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False, index=True),
        sa.Column("direction", sa.String(50), nullable=False),  # sent|received
        sa.Column("title", sa.String(255), nullable=True),
        sa.Column("notes", sa.Text, nullable=True),
        sa.Column("mail_date", sa.Date, nullable=True),
        sa.Column("file_path", sa.String(255), nullable=False),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )

    # Index on archived_mail for user_id and direction combo
    op.create_index("ix_archived_mail_user_direction", "archived_mail", ["user_id", "direction"])


def downgrade() -> None:
    """Drop initial schema."""
    op.drop_index("ix_archived_mail_user_direction")
    op.drop_table("archived_mail")
    op.drop_table("prompts")
    op.drop_table("users")
