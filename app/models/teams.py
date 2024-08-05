from models import db, environment, SCHEMA, add_prefix_for_prod

class Team (db.Model):
    __tablename__ = "teams"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)


    # user = db.relationship("User", back_populates="team")

    def to_dict(self):
        return { "id": self.id, "team_name": self.team_name, "user_id": self.user_id }
