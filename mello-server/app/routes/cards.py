from flask import Blueprint, request, jsonify
from ..models import db
from ..models.lists import List
from ..models.cards import Card
from ..config import Config
import datetime


bp = Blueprint("cards", __name__, url_prefix="/cards")


# SAVE NEW CARD TO DATABASE
@bp.route("/create", methods=["POST"])
def create_new_card():
    data = request.json
    print(data)
    list_id = int(data['listId'][5])
    print(list_id)
    
    try:
        this_list = List.query.get(list_id)
        print(this_list)
        card = Card(title=data['newCard']['title'], listId=this_list.id, due_date=None, 
                    updated=datetime.datetime.now(), created=datetime.datetime.now())
        db.session.add(card)

        if this_list.card_order:
            this_list.card_order += ("," + data['newCard']['id'])
        else:
            this_list.card_order = data['newCard']['id']
        db.session.commit()

        return "New card added to DB"

    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400


#  CHANGE CARD NAME BY BOARD ID
@bp.route("/title/<int:cardId>", methods=["POST"])
def change_card_name(cardId):

    data = request.json
    new_card_name = data['cardTitle']
   
    card = Card.query.filter(Card.id == cardId).one()

    if card:
        card.title = new_card_name
        db.session.commit()
        return {"card": card.to_dict()}
    else:
        return {"error": "Could not change card title"}, 401


#  CHANGE CARD DETAILS BY BOARD ID
@bp.route("/details/<int:cardId>", methods=["POST"])
def change_card_details(cardId):

    data = request.json
    new_card_detail = data['cardDetail']
 
    card = Card.query.filter(Card.id == cardId).one()

    if card:
        card.details = new_card_detail
        db.session.commit()
        return {"card": card.to_dict()}
    else:
        return {"error": "Could not update details"}, 401


#  CHANGE CARD COLOR BY BOARD ID
@bp.route("/color/<int:cardId>", methods=["POST"])
def change_card_color(cardId):

    data = request.json

    print(data)
    new_card_color = data['cardColor']
    print(new_card_color)
    card = Card.query.filter(Card.id == cardId).one()

    if card:
        card.color = new_card_color
        db.session.commit()
        print(f'Card details updated to {new_card_color}!')
        return {"card": card.to_dict()}
    else:
        return {"error": "Could not update card color"}, 401
