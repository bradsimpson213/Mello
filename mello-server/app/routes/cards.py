from flask import Blueprint, request, jsonify
from ..models import db
from ..models.lists import List
from ..models.cards import Card
from ..config import Config
import datetime


bp = Blueprint("cards", __name__, url_prefix="/cards")


# SAVE NEW LIST TO DATABASE
@bp.route("/create", methods=["POST"])
def create_new_card():
    data = request.json
    print(data)
    list_id = int(data['listId'][5])

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
