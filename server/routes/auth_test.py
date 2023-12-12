import sys
sys.path.append('.')
from setup import Resource, db, request, jwt_required, get_jwt_identity
from models.user import User

class Auth(Resource):
    @jwt_required()
    def get(self):
        print(get_jwt_identity())
        return {"Success":"Authenticated"}
