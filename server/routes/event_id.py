import sys
sys.path.append('.')
from setup import Resource, db, cache
from models.event import Event

class EventID(Resource):
    @cache.cached(timeout=4)
    def get(self,id):
        if id is not None and (event := db.session.get(Event,id)):
            return event.to_dict(rules=('users.name',)),200
        else:
            return {"An event with that id was not found"},404