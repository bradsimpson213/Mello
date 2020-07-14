from ..models import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    last_login = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    team = db.relationship("Team", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return { "id": self.id, "username": self.name, "email": self.email, 
                "last_login": self.last_login, "created"; self.created } 
