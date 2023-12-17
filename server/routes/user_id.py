import sys
sys.path.append('.')
from setup import Resource, db, jwt_required, get_jwt_identity,unset_access_cookies, unset_refresh_cookies, make_response
from models.user import User

class UserId(Resource):
    @jwt_required()
    def delete(self,id):
        if user := db.session.get(User,id):
            if(user.id == get_jwt_identity()):
                try:
                    db.session.delete(user)
                    db.session.commit()
                    resp = make_response({},204)
                    unset_access_cookies(resp)
                    unset_refresh_cookies(resp)
                    return resp
                except Exception as e:
                    db.session.rollback()
                    return {'error':e.args},500
            else:
                return {'error':'Not authorized'},401
        else:
            return {'error':'That user no longer exists'},404