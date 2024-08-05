from flask_sqlalchemy import SQLAlchemy
import os
from .boards import Board
from .cards import Card
from .checklists import Checklist
from .comments import Comment
from .lists import List
from .teams import Team
from .users import User

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")



db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr
