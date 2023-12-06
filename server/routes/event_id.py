import sys
sys.path.append('.')
from setup import Resource, db
from models.event import Event

class EventID(Resource):
    def get(self,id):
        if id is not None and (event := db.session.get(Event,id)):
            return event.to_dict(),200
        else:
            return {"An event with that id was not found"},404