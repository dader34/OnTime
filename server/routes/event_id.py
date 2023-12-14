import sys
sys.path.append('.')
from setup import Resource, db, cache, limiter, jwt_required, get_jwt_identity
from models.event import Event
from models.user import User

class EventID(Resource):
    @cache.cached(timeout=4)
    @limiter.limit("15 per minute")
    def get(self,id):
        if id is not None and (event := db.session.get(Event,id)):
            return event.to_dict(rules=('users.name',)),200
        else:
            return {"An event with that id was not found"},404
    
    @jwt_required()
    # @limiter.limit("2 per minute")
    def delete(self,id):
        if event := db.session.get(Event,id):
            if user := db.session.get(User,get_jwt_identity()):
                if event.organizer_id == user.id:
                    try:
                        db.session.delete(event)
                        db.session.commit()
                        return {}
                    except Exception as e:
                        db.session.rollback()
                        return {'error':e.args}, 400
                else:
                    return {'error':'Your account does not own that event'}, 401
            else:
                return {'error': 'That user no longer exists'}, 404
        else:
            return {'error':'Invalid event id'}, 404