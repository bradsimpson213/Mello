from ..models import db

class List(db.Model):
    __tablename__ = "lists"
    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(50), nullable=False)
    boardId = db.Column(db.Integer, db.ForeignKey("boards.id"), nullable=False)
    card_order = db.Column(db.String(300), nullable=False)
    duedate = db.Column(db.DateTime)
    updated = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime,nullable=False)

    board = db.relationship("Board", back_populates="lists")


    def to_dict(self):
        return {"id": self.id, "list_name": self.list_name, "boardId": self.boardId,
                "card_order": self.card_order, "duedate": self.duedate, "updated": self.updated,
                "created": self.created }