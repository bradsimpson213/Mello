from flask import Flask
from .config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
# migrate = Migrate(app, db)

@app.route("/")
def home_server():
    return "<h1>Welcome to the Mello Server</h1>"
