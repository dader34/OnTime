from setup import app, db, api
import sys
sys.path.append('.')
from models.user import User
from models.event import Event
from models.event_category import EventCategory
from models.category import Category
from models.attendee import Attendee



if __name__ == '__main__':
    app.run(port=5555, debug=True)