from flask import Blueprint, request
from ..models import db
from ..models.users import User
from ..config import Config
import jwt
import datetime


bp = Blueprint("users", __name__, url_prefix="/users")


# LOGIN ROUTE
@bp.route("/login", methods=["POST"])
def user_login():
    data = request.json
    user = User.query.filter(User.email == data['email']).first()
    if not user:
        return {"error": "Email not found"}, 422

    if user.check_password(data['password']):
        user.last_login = datetime.datetime.now()
        db.session.commit()
  # add additional data here to return
        access_token = jwt.encode({'email': user.email}, Config.SECRET_KEY)
        return {"access_token": access_token.decode('UTF-8'), 'user': user.to_dict()}
    else:
        return {"error": "Incorrect password"}, 401


# CREATE USER ROUTE
@bp.route("/create", methods=["POST"])
def create_user():
    data = request.json

    try:
        user = User(username=data['username'], email=data['email'], 
                    password=data['password'], last_login=datetime.datetime.now())
        db.session.add(user)
        db.session.commit()

        access_token = jwt.encode({'email': user.email}, Config.SECRET_KEY)
        return {"access_token": access_token.decode('UTF-8'), 'user': user.to_dict()}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
