from flask import Blueprint, request
from ..models import db
from ..models.boards import Board
from ..config import Config


bp = Blueprint("boards", __name__, url_prefix="/boards")


# LOGIN ROUTE
@bp.route("/<int:userId>")
def get_user_boards(userId):
    print(request)
    boards = Board.query.filter(Board.userId == userId).all()

    if boards:
        boards_dict = [board.to_dict() for board in boards]
        print(boards_dict)
        return {"boards": boards_dict}
    else:
        return {"error": "No Boards found for this User"}, 401
