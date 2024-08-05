from flask.cli import AppGroup
from app.models import db, environment, SCHEMA
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_boards()
        undo_users()

    seed_users()
    seed_boards()
    print("DB SEEDED")


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_boards()
    undo_users()
    print("DB DESTROYED")