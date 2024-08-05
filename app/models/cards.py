from models import db, environment, SCHEMA, add_prefix_for_prod

class Card(db.Model):
    __tablename__ = "cards"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")), nullable=False)
    details = db.Column(db.String(500))
    color = db.Column(db.String(15))
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.DateTime)
    updated = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    to_list = db.relationship("List", back_populates="cards")
    # comment = db.relationship("Comment", back_populates="card")
    # checklist = db.relationship("Checklist", back_populates="cardcheck")


    def to_dict(self):
        return { "id": self.id, "title": self.title, "listId": self.listId,
                "details": self.details, "color": self.color, "completed": self.completed,
                "due_date": self.due_date, "updated": self.updated, "created": self.created }
