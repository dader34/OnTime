import sys
from sqlalchemy import func
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies
from datetime import timedelta
sys.path.append('.')
from setup import Resource, db, request, make_response, limiter
from models.user import User

class Signup(Resource):
    @limiter.limit("2 per minute")
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')

        if username and password:
            if User.query.filter(func.lower(User.name) == func.lower(username)).first():
                return {"error":"A user with that name already exists"},409
            else:
                if ( 5 <= len(username) <= 15 ):
                    if (5 <= len(password) <= 15):
                        user = User(name=username)
                        user.password = password
                        db.session.add(user)
                        db.session.commit()
                        access_token = create_access_token(identity=user.id,expires_delta=timedelta(hours=1))
                        refresh_token = create_refresh_token(identity=user.id,expires_delta=timedelta(days=30))
                        response = make_response(user.to_dict(),200)
                        set_access_cookies(response, access_token)
                        set_refresh_cookies(response, refresh_token)
                        return response
                    else:
                        return {'error':'Username must be 5-15 chars'}
                else:
                    return {'error':'Username must be 5-15 chars'}
        else:
            return {"error":"Wrong arguments provided"},400