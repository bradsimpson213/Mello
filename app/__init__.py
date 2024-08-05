from flask import Flask, send_from_directory, request, redirect
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .models import db
from .routes import users, quotes, boards, lists, cards
from .seeds import seed_commands
import os


# if os.environ.get("FLASK_ENV") == 'production':
#     app = Flask(__name__, static_folder='../mello-client/build/static',
#                 static_url_path='/static')
# else:
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

app.cli.add_command(seed_commands)

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     print(f'caught_path: {path}')
#     path_dir = os.path.abspath("./mello-client/build")  # path react build
#     # If we make a request to /static/<some-file-path> for a directory that exists in
#     # our static build folder, serve that file
#     # This could be useful if we have images, audio, etc., that we want to have
#     # available as static resources
#     if path and (os.path.exists(f'./mello-client/build/static/{path}') or os.path.exists(f'./mello-client/build/{path}')):
#         return send_from_directory(os.path.join(path_dir), path)
#     # Otherwise, serve up the index.html. Our React router will handle any other routes
#     else:
#         return send_from_directory(os.path.join(path_dir), 'index.html')

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)
            

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')