import sys
from sqlalchemy import func
from datetime import timedelta
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies
sys.path.append('.')
from setup import Resource, db, request, make_response
from models.user import User

class Login(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')

        if username and password:
            user = User.query.filter(func.lower(User.name) == func.lower(username)).first()
            if user:
                if user.authenticate(password):
                    access_token = create_access_token(identity=user.id)
                    refresh_token = create_refresh_token(identity=user.id)

                    max_age = timedelta(days=1)
                    max_age_seconds = int(max_age.total_seconds())

                    response = make_response(user.to_dict(),200)
                    set_access_cookies(response,access_token,max_age=max_age_seconds)
                    set_refresh_cookies(response, refresh_token,max_age=max_age_seconds)

                    return response
                else:
                    return {"error": "Incorrect password"}, 401
            else:
                return {"error": "No user with that name exists"}, 404
        else:
            return {"error": "Wrong arguments provided"}, 400
