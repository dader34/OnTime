import sys
from datetime import datetime, timedelta
sys.path.append('.')
from setup import Resource, db, jwt_required, get_jwt_identity
from models.user import User

class TopFive(Resource):
    @jwt_required()
    def get(self):
        user = db.session.get(User, get_jwt_identity())

        if user is not None:
            current_time = datetime.utcnow()

            attending_events = user.events

            attending_events = [(event, abs(datetime.strptime(" ".join(event.date.split("T")), '%Y-%m-%d %H:%M') - current_time)) for event in attending_events]

            attending_events.sort(key=lambda x: x[1])
            top_five_events = attending_events[:5]

            events_dict = [event[0].to_dict(rules=('users.name',)) for event in top_five_events]
            return events_dict, 200
        else:
            return {"error": "Invalid user ID"}, 400
