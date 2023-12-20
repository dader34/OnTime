import sys
sys.path.append('.')
from setup import Resource, db, jwt_required, get_jwt_identity
from models.user import User

class GetUser(Resource):
    @jwt_required()
    def get(self):
        try:
            if (user := db.session.get(User,get_jwt_identity())):
                return user.to_dict(rules=('-events.categories','events.id','events.description','events.image_url','organized_events.id','organized_events.image_url')),200
            else:
                return {'error':"A user with that id was not found"},404
        except Exception as e:
            return {'error':e.args}
        
    