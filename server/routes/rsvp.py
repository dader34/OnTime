# from sqlalchemy import or_, and_, func
import sys
from setup import db, Resource, request, jwt_required, get_jwt_identity
sys.path.append('.')
from models.event import Event
from models.user import User
from models.attendee import Attendee

class Rsvp(Resource):
    @jwt_required()
    def post(self):
        event_id = request.json.get("event_id")
        user = db.session.get(User, get_jwt_identity())

        if user:
            if event_id:
                if event_id in [event.id for event in user.events]:
                    try:
                        attendee = Attendee.query.filter(Attendee.user_id == user.id, Attendee.event_id == event_id).first()
                        db.session.delete(attendee)
                        db.session.commit()
                        return {"attendees":db.session.get(Event,event_id).to_dict(only=('users',))['users']}
                    except Exception as e:
                        db.session.rollback()
                        return {'error':e.args}

                else:
                    try:
                        attendee = Attendee(user_id=user.id,event_id=event_id)
                        db.session.add(attendee)
                        db.session.commit()
                        return {"attendees":db.session.get(Event,event_id).to_dict(only=('users',))['users']}
                    except Exception as e:
                        db.session.rollback()
                        return {'error':e.args}
            else:
                return {'error':'Invalid event id'}

        else:
            return {"error":"That user no longer exists"}