import sys
sys.path.append('.')
from setup import Resource, db, limiter, jwt_required, get_jwt_identity,request
from models.event import Event
from models.user import User
from models.category import Category
from models.event_category import EventCategory

class EventID(Resource):
    @limiter.limit("25 per minute")
    def get(self,id):
        if id is not None and (event := db.session.get(Event,id)):
            return event.to_dict(rules=('users.name','organizer.name','-organizer.events','-organizer.organized_events')),200
        else:
            return {"error":"An event with that id was not found"},404
    
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
        
    @jwt_required()
    def patch(self, id):
        event = Event.query.get(id)
        if not event:
            return {'error': 'Event not found'}, 404

        user_id = get_jwt_identity()

        if event.organizer_id != user_id:
            return {'error': 'Unauthorized'}, 403

        try:
            title = request.json.get('title')
            description = request.json.get('description')
            image_url = request.json.get('image_url')
            date = request.json.get('date')
            categories = request.json.get('categories')
            location = request.json.get('location')

            if title:
                event.title = title
            if description:
                event.description = description
            if image_url:
                event.image_url = image_url
            if date:
                event.date = date
            if location:
                event.location = location

            db.session.commit()

            if categories:
                EventCategory.query.filter_by(event_id=event.id).delete()
                
                for cat in categories:
                    c = Category.query.filter(db.func.lower(Category.name) == db.func.lower(cat)).first()
                    if not c:
                        c = Category(name=cat.lower())
                        db.session.add(c)
                        db.session.commit()

                    ec = EventCategory(event_id=event.id, category_id=c.id)
                    db.session.add(ec)
                    db.session.commit()
            else:
                EventCategory.query.filter_by(event_id=event.id).delete()
                db.session.commit()


            return {'success': event.id}

        except Exception as e:
            db.session.rollback()
            return {'error': e.args}, 500