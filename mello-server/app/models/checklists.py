from ..models import db

class Checklist(db.Model):
    __tablename__ = "checklists"
    id = db.Column(db.Integer, primary_key=True)
    cardId = db.Column(db.integer, db.ForeignKey("cards.id"), nullable=False)
    text = db.Column(db.String(250), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    updated = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    cardcheck = db.relationship("Card", back_populates="checklist")


    def to_dict(self):
        return { "id": self.id, "cardId": self.cardId, "text": self.text, "completed": self.completed,
                "updated": self.updated, "created": self.created }