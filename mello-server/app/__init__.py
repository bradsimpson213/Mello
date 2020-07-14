from flask import Flask
from .config import Config
from .models import db
from .routes import users

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
# migrate = Migrate(app, db)

app.register_blueprint(users.bp)

@app.route("/")
def home_server():
    return "<h1>Welcome to the Mello Server</h1>"
