import sys
from setup import app, db, api
sys.path.append('.')
from models.user import User
from models.event import Event
from models.event_category import EventCategory
from models.category import Category
from models.attendee import Attendee
from routes.events import ShowAllEvents
from routes.event_id import EventID
from routes.login import Login
from routes.signup import Signup
from routes.auth_test import Auth
from routes.refresh import RefreshToken


api.add_resource(ShowAllEvents, '/events')
api.add_resource(EventID, '/events/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(Auth, '/auth')
api.add_resource(RefreshToken, '/refresh')

if __name__ == '__main__':
    app.run(port=5555, debug=True)