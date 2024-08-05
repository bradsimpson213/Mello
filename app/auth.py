from flask import request
from functools import wraps
import jwt
from .config import Config
from .models.users import User


def require_auth(func):
  @wraps(func)
  def wrapped(*args, **kwargs):
    access_token = request.headers.get('Authorization', None)
    print(access_token)
    if not access_token:
      return {'error': 'Please authenticate'}, 401
    try:
      decoded_jwt = jwt.decode(access_token, Config.SECRET_KEY)
      print("Decoded:", decoded_jwt)
      user = User.query.filter(User.email == decoded_jwt.get('email')).first()
      print(f"Auth Success! {user.username} logged in!")
    except:
      return {'error': 'Please Log In to Continue...'}, 401
    return func(*args, **kwargs)
  return wrapped
