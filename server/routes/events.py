from sqlalchemy import or_, and_, func
import sys
sys.path.append('.')
from setup import Resource, request
from models.event import Event
from models.category import Category

class ShowAllEvents(Resource):
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
