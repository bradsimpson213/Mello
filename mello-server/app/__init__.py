from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .models import db
from .routes import users
from .routes import quotes
from .routes import boards
from .routes import lists
from .routes import cards

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(users.bp)
app.register_blueprint(quotes.bp)
app.register_blueprint(boards.bp)
app.register_blueprint(lists.bp)
app.register_blueprint(cards.bp)

# @app.route("/")
# def home_server():
#     return "<h1>Welcome to the Mello Server</h1>"
