from ..models import db

class Team (db.Model):
    __tablename__ = "teams"
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # user = db.relationship("User", back_populates="team")

    def to_dict(self):
        return { "id": self.id, "team_name": self.team_name, "user_id": self.user_id }
