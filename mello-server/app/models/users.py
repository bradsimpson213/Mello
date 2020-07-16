from ..models import db
from flask_login import UserMixin
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    notification = db.Column(db.Integer, default=300000)
    theme = db.Column(db.String(50))
    last_login = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    # team = db.relationship("Team", back_populates="user")


    @validates('username', 'email')
    def val_user_email(self, key, value):
        if key == 'username':
            if not value:
                raise AssertionError('Please provide a username')
        if key == 'email':
            if not value:
                raise AssertionError('Please provide an email address')
            if User.query.filter(User.email == value).first():
                raise AssertionError('Your choosen email address already exists')
        return value

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return { "id": self.id, "username": self.username, "email": self.email,
                "notification": self.notification, "theme": self.theme, 
                "last_login": self.last_login, "created": self.created } 
