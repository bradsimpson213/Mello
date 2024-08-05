from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import text
from datetime import datetime

def seed_users():
    user_1 = User(
            name='Demo User', 
            email='demo@gmail.com',
            hashed_password=generate_password_hash('demo1'), 
            notification=5, 
            music=True, 
            last_login=datetime.now(), 
            created=datetime.now(),
    )

    user_2 = User(
            name='Brad Simpson', 
            email='bradsimpson@icloud.com',
            hashed_password=generate_password_hash('konadog4'), 
            notification=5,
            music=True, 
            last_login=datetime.now(),
            created=datetime.now()
    )
          
    all_users = [user_1, user_2]

    _ = [db.session.add(user) for user in all_users]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()