from flask import Blueprint, request, jsonify
from ..models import db
from ..models.boards import Board
from ..models.lists import List
from ..models.cards import Card
from ..config import Config
import datetime


bp = Blueprint("lists", __name__, url_prefix="/lists")


# SAVE NEW LIST TO DATABASE
@bp.route("/create", methods=["POST"])
def create_new_List():
    data = request.json
    print(data)
    try:    
        board = Board.query.get(data['board']['id'])
    
        new_list = List(list_name=data['newList']['title'], boardId=board.id,
                    card_order=None, due_date=None, updated=datetime.datetime.now(),
                    created=datetime.datetime.now())
        db.session.add(new_list)

        new_list_id = "," + data['newList']['id']
        board.list_order += new_list_id
        db.session.commit()
        print(board.to_dict())
        
        return "New list added to DB"

    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
