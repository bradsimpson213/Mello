from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .models import db
from .routes import users
from .routes import quotes

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(users.bp)
app.register_blueprint(quotes.bp)

# @app.route("/")
# def home_server():
#     return "<h1>Welcome to the Mello Server</h1>"
