from flask import Blueprint, request, jsonify
from ..models import db
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
        cards_array = []
        blists = List.query.filter(List.boardId == board.id).all()
# GET ALL CARDS FROM THE LISTS ON SELECTED BOARD AND FORMAT LISTS FOR CLIENT
        lists = {}
        for blist in blists:
            list_cards = Card.query.filter(Card.listId == blist.id).all()
            cards_dict = [card.to_dict() for card in list_cards]
            cards_array.append(cards_dict)
            blist = blist.to_dict()
            list_index = blist['id']
            list_title = blist['list_name']
            list_cards = blist['card_order']
            lists[f'list-{list_index}'] = {
                'id': f'list-{list_index}', 'title': list_title, 'cardIds': list_cards
            }
# FORMAT CARD DATA FOR CLIENT SIDE
        cards = {}
        for card in cards_array:
            for index in range(0, len(card)):
                card_index = card[index]['id'] 
                card_content = card[index]['title']
                cards[f'card-{card_index}'] = {
                    'id': f'card-{card_index}', 'title': card_content 
                }
        return { 'board': board.to_dict(), 'lists': lists, 'cards': cards }   

    else:
        return {"error": "No Boards found for provided Board Id"}, 401


# SAVE BOARD ORDER TO DB
@bp.route("/save", methods=["POST"])
def create_new_List():
    data = request.json
   
    try:
        board = Board.query.get(data['board']['id'])
        print(board)
        board.list_order = ','.join(data['listOrder'])

        lists = data['lists']

        for key in lists.keys():
            if len(lists[key]['cardIds']) > 0:
                list_db = List.query.get(int(lists[key]["id"][5]))
                list_db.card_order = ','.join(lists[key]['cardIds'])
            else:
                list_db = List.query.get(int(lists[key]["id"][5]))
                list_db.card_order = None
            
        db.session.commit()
        print("Board order saved")
        return "Board layout has been saved!"

    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400


# GET ALL BOARDS FOR A USER BY USER ID
@bp.route("/user/<int:userId>")
def get_user_boards(userId):
    
    boards = Board.query.filter(Board.userId == userId).all()

    if boards:
        boards_dict = [board.to_dict() for board in boards]
        print(boards_dict)
        return {"boards": boards_dict}
    else:
        return {"error": "No Boards found for this User"}, 401
