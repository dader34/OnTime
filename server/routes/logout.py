import sys
from flask_jwt_extended import unset_access_cookies, unset_refresh_cookies
sys.path.append('.')
from setup import Resource, make_response

class Logout(Resource):
    def delete(self):
        response = make_response({}, 204)
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response