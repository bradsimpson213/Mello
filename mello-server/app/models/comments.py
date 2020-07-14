from ..models import db

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cardId = db.Column(db.Integer, db.ForeignKey("cards.id"), nullable=False)
    text = db.Column(db.String(350), nullable=False)
    udated= db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    card = db.relationship("Card", back_populates="comment")


    def to_dict(self):
        return { "id": self.id, "userId": self.userId, "cardId": self.cardId, 
                "text": self.text, "updated": self.updated, "created": self.created }
                