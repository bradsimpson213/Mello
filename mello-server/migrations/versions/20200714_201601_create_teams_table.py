"""create teams table

Revision ID: d73ec212fe9a
Revises: 3181e039ecbd
Create Date: 2020-07-14 20:16:01.485361

"""
from alembic import op  
import sqlalchemy as sa  


# revision identifiers, used by Alembic.
revision = 'd73ec212fe9a'
down_revision = '3181e039ecbd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    teams_table = op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_name', sa.String(length=150), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.bulk_insert(teams_table,
        [
            { 'team_name': "Zen Works Inc", 'user_id': 1 },
            { 'team_name': "Zen Works Inc", 'user_id': 2 }
        ]
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('teams')
    # ### end Alembic commands ###
