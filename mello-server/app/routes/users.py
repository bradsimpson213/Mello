from flask import Blueprint, request, jsonify
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
        access_token = jwt.encode({'email': user.email}, Config.SECRET_KEY)
        return {"access_token": access_token.decode('UTF-8'), 'user': user.to_dict()}
    else:
        return {"error": "Incorrect password"}, 401


# GET USER BY ID ROUTE
@bp.route("/<int:userId>")
def get_user_by_id(userId):

    try:   
        user = User.query.get(userId)
        print("got your user here")
        return {"user": user.to_dict()}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400

# CREATE USER ROUTE
@bp.route("/create", methods=["POST"])
def create_user():
    data = request.json
    
    user_name = data['user']['name']
    user_email = data['user']['email']
    user_password = data['user']['password']

    try:
        user = User(name=user_name, email=user_email, password=user_password, 
                    last_login=datetime.datetime.now(), created=datetime.datetime.now())
        db.session.add(user)
        db.session.commit()

        access_token = jwt.encode({'email': user.email}, Config.SECRET_KEY)
        return {"access_token": access_token.decode('UTF-8'), 'user': user.to_dict()}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
