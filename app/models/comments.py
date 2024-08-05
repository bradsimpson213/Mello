from ..models import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    cardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False)
    text = db.Column(db.String(350), nullable=False)
    udated= db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    # card = db.relationship("Card", back_populates="comment")


    def to_dict(self):
        return { "id": self.id, "userId": self.userId, "cardId": self.cardId, 
                "text": self.text, "updated": self.updated, "created": self.created }