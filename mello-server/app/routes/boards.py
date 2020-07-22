from flask import Blueprint, request
from ..models import db
from sqlalchemy.orm import joinedload
from ..models.boards import Board
from ..models.lists import List
from ..models.cards import Card
from ..config import Config


bp = Blueprint("boards", __name__, url_prefix="/boards")


# GET BOARD DETAIL DATA TO POPULATE LISTS/CARDS PAGE
@bp.route("/details/<int:boardId>")
def get_baord_details(boardId):
    board = Board.query.get(boardId)

    if board:
        cards = []
        blists = List.query.filter(List.boardId == board.id).all()
        for blist in blists:
            list_cards = Card.query.filter(Card.listId == blist.id).all()
            dict_cards = [list_card.to_dict() for list_card in list_cards]
            cards.append(dict_cards)
        dict_lists = [list1.to_dict() for list1 in blists]
       
        return { 'board': board.to_dict(), 'lists': dict_lists, 'cards': cards }   
    else:
        return {"error": "No Boards found for provided Board Id"}, 401



# GET ALL BOARD FOR A USER BY USER ID
@bp.route("/user/<int:userId>")
def get_user_boards(userId):
    boards = Board.query.filter(Board.userId == userId).all()

    if boards:
        boards_dict = [board.to_dict() for board in boards]
        print(boards_dict)
        return {"boards": boards_dict}
    else:
        return {"error": "No Boards found for this User"}, 401
