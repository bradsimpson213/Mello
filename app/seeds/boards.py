from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_boards():

    board_1 = Board(
                userId=1, 
                board_name='Coding Project', 
                board_image='https://mello-zen-images.s3.amazonaws.com/zen-4.jpg',
                public=False, 
                team=False, 
                teamId= None, 
                list_order=None, 
                updated=datetime.now(),
                created=datetime.now(),
    )

    board_2 = Board(
                userId=1, 
                board_name='Home Remodel', 
                board_image='https://mello-zen-images.s3.amazonaws.com/zen-2.jpg',
                public=False, 
                team=False, 
                teamId=None, 
                list_order=None, 
                updated=datetime.now(),
                created=datetime.now(),
    )

    board_3 = Board( 
                userId=1, 
                board_name='Work Project', 
                board_image='https://mello-zen-images.s3.amazonaws.com/zen-3.jpg',
                public=False, 
                team=False, 
                teamId=None, 
                list_order=None, 
                updated=datetime.now(),
                created=datetime.now(),
    )

    board_4 = Board(
                userId=2, 
                board_name='Coding Project', 
                board_image='https://mello-zen-images.s3.amazonaws.com/zen-4.jpg',
                public=False, 
                team=False, 
                teamId=None, 
                list_order=None, 
                updated=datetime.now(),
                created=datetime.now(),
    )

    board_5 = Board(
                userId=2, 
                board_name='Home Remodel', 
                board_image='https://mello-zen-images.s3.amazonaws.com/zen-2.jpg',
                public=False, 
                team=False, 
                teamId=None, 
                list_order=None, 
                updated=datetime.now(),
                created=datetime.now(),
    )

    board_6 = Board (
                userId=2, 
                board_name='Work Project', 
                board_image='https://mello-zen-images.s3.amazonaws.com/zen-3.jpg',
                public=False, 
                team=False, 
                teamId=None, 
                list_order=None, 
                updated=datetime.now(),
                created=datetime.now()
    )
        
    all_boards = [board_1, board_2, board_3, board_4, board_5, board_6]

    _ = [db.session.add(board) for board in all_boards]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_boards():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM boards"))
        
    db.session.commit()