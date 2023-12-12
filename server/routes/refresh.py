import sys
from flask_jwt_extended import create_access_token, jwt_required, set_access_cookies, get_jwt_identity
sys.path.append('.')
from setup import db, Resource, make_response
from models.user import User

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def post(self):
        try:
            current_user_id = get_jwt_identity()

            new_access_token = create_access_token(identity=current_user_id)

            response = make_response(db.session.get(User,get_jwt_identity()).to_dict(rules=('-events.categories','events.id')), 200)
            set_access_cookies(response, new_access_token)

            return response
        except Exception as e:

            return {"error": str(e)}, 500
