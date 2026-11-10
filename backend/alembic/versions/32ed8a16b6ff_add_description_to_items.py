"""add description to items

Revision ID: 32ed8a16b6ff
Revises: c015223fe144
Create Date: 2026-11-10 11:56:07.387217

"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "32ed8a16b6ff"
down_revision: str | Sequence[str] | None = "c015223fe144"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "items",
        sa.Column(
            "description",
            sa.String(length=255),
            nullable=True,
        ),
    )


def downgrade() -> None:
    op.drop_column("items", "description")
