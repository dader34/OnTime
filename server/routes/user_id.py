import sys
sys.path.append('.')
from setup import Resource, db, jwt_required, get_jwt_identity
from models.user import User

class UserId(Resource):
    @jwt_required()
    def get(self):
        if id is not None and (user := db.session.get(User,get_jwt_identity())):
            return user.to_dict(rules=('-events.categories','events.id')),200
        else:
            return {"A user with that id was not found"},404