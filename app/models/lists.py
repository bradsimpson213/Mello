from .db import db, environment, SCHEMA, add_prefix_for_prod


class List(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(50), nullable=False)
    boardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False)
    card_order = db.Column(db.String(500), nullable=True)
    due_date = db.Column(db.DateTime)
    updated = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime,nullable=False)

    board = db.relationship("Board", back_populates="lists")
    cards = db.relationship("Card", back_populates="to_list")

    def to_dict(self):
        return {"id": self.id, "list_name": self.list_name, "boardId": self.boardId,
                "card_order": self.card_order.split(',') if self.card_order else [], "due_date": self.due_date, "updated": self.updated,
                "created": self.created }