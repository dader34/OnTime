from setup import app, db, api
import sys
sys.path.append('.')
from models.user import User
from models.event import Event
from models.event_category import EventCategory
from models.category import Category
from models.attendee import Attendee
from routes.events import ShowAllEvents
from routes.event_id import EventID

api.add_resource(ShowAllEvents,'/events')
api.add_resource(EventID, '/events/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)