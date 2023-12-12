import sys
from sqlalchemy import func
sys.path.append('.')
from setup import Resource, db, request
from models.user import User

class Signup(Resource):
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
                        return {'success':user.to_dict()}
                    else:
                        return {'error':'Username must be 5-15 chars'}
                else:
                    return {'error':'Username must be 5-15 chars'}
        else:
            return {"error":"Wrong arguments provided"},400