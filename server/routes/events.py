from sqlalchemy import or_, and_, func
import sys
sys.path.append('.')
from setup import Resource, request, jwt_required, get_jwt_identity, db
from models.event import Event
from models.category import Category
from models.user import User
from models.event_category import EventCategory

class Events(Resource):
    def get(self):
        search_text = request.args.get("search")
        categories = request.args.get("categories")

        category_list = categories.split(",") if categories else []

        query = Event.query

        if search_text:
            search_filter = or_(
                Event.title.ilike(f"%{search_text}%"),
                Event.description.ilike(f"%{search_text}%"),
                Event.location.ilike(f"%{search_text}%")
            )
            query = query.filter(search_filter)

        if category_list:
            category_filters = [Event.categories.any(func.lower(Category.name) == func.lower(category)) for category in category_list]
            category_filter = and_(*category_filters)
            query = query.filter(category_filter)

        events = query.all()

        return [event.to_dict() for event in events]
     
    @jwt_required()
    def post(self):
        title = request.json.get('title')
        description = request.json.get('description')
        image_url = request.json.get('image_url')
        date = request.json.get('date')
        categories = request.json.get('categories')
        location = request.json.get('location')
        if title and description and image_url and date and location:
            if (user := db.session.get(User, get_jwt_identity())):
                try:

                    event = Event(title=title,description=description,image_url=image_url,date=date,location=location,organizer_id=user.id)
                    db.session.add(event)
                    db.session.commit()
                    # Check if all categories are already available, if not, create them
                    for cat in categories:
                        if c := Category.query.filter(db.func.lower(Category.name) == db.func.lower(cat)).first():
                            ec = EventCategory(event_id=event.id,category_id=c.id)
                            db.session.add(ec)
                            db.session.commit()
                        else:
                            c = Category(name=cat.lower())
                            db.session.add(c)
                            db.session.commit()
                            ec = EventCategory(event_id=event.id,category_id=c.id)
                            db.session.add(ec)
                            db.session.commit()
                    # event = Event(title=title,description=description,image_url=image_url,date=date,location=location)

                    return {'success':event.id}
                except Exception as e:
                    db.session.rollback()
                    return {'error':e.args}
                    print(e)
            else:
                return {'error':'That user no longer exists'}
        else:
            return {'error':'Invalid parameters'},400
    