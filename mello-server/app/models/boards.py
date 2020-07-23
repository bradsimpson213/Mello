from ..models import db
from .teams import Team

class Board(db.Model):
    __tablename__ = "boards"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    board_name = db.Column(db.String(50), nullable=False)
    board_image = db.Column(db.String(150), nullable=False)
    public = db.Column(db.Boolean, default=False)
    team = db.Column(db.Boolean, default=False)
    teamId = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=True)
    list_order = db.Column(db.String(500), nullable=True )
    updated = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)

    lists = db.relationship("List", back_populates="board")


    def to_dict(self):
        return { "id": self.id, "userId": self.userId, "board_name": self.board_name,
                "board_image": self.board_image, "public": self.public, "team": self.team,
                "teamId": self.teamId, "list_order": self.list_order.split(',') if self.list_order else [], "updated": self.updated,
                 "created": self.created }
