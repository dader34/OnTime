import sys
sys.path.append('.')
from setup import Resource
from models.event import Event

class ShowAllEvents(Resource):
    def get(self):
        return [event.to_dict() for event in Event.query.all()] 