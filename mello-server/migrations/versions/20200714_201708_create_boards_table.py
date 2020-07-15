"""create boards table

Revision ID: a860f4d402a8
Revises: d73ec212fe9a
Create Date: 2020-07-14 20:17:08.813328

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a860f4d402a8'
down_revision = 'd73ec212fe9a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('board_name', sa.String(length=50), nullable=False),
    sa.Column('board_image', sa.String(length=150), nullable=False),
    sa.Column('public', sa.Boolean(), nullable=True),
    sa.Column('team', sa.Boolean(), nullable=True),
    sa.Column('teamId', sa.Integer(), nullable=False),
    sa.Column('list_order', sa.String(length=200), nullable=False),
    sa.Column('updated', sa.DateTime(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['teamId'], ['teams.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('boards')
    # ### end Alembic commands ###
