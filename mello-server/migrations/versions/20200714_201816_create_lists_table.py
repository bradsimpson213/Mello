"""create lists table

Revision ID: 78ac3e71770b
Revises: a860f4d402a8
Create Date: 2020-07-14 20:18:16.888976

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78ac3e71770b'
down_revision = 'a860f4d402a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('list_name', sa.String(length=50), nullable=False),
    sa.Column('boardId', sa.Integer(), nullable=False),
    sa.Column('card_order', sa.String(length=300), nullable=False),
    sa.Column('due_date', sa.DateTime(), nullable=True),
    sa.Column('updated', sa.DateTime(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['boardId'], ['boards.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lists')
    # ### end Alembic commands ###