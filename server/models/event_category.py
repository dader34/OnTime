from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from .category import Category
from .event import Event
from setup import db

class EventCategory(db.Model, SerializerMixin):
    __tablename__ = 'event_categories'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'),nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'),nullable=False)

    event = db.relationship('Event', back_populates='event_categories',cascade='all, delete-orphan', passive_deletes=True,single_parent=True)
    category = db.relationship('Category',back_populates='event_categories',cascade='all, delete-orphan', passive_deletes=True,single_parent=True)

    @validates('event_id')
    def event_validation(self,key,id):
        if id is not None and isinstance(id,int) and db.session.get(Event,id):
            return id
        else:
            raise ValueError('Event id must be an id that correlates to a event')

    @validates('category_id')
    def category_validation(self,key,id):
        if id is not None and isinstance(id,int) and db.session.get(Category,id):
            return id
        else:
            raise ValueError('Category id must be an id that correlates to a category')


# id: Integer (Primary Key)
# event_id: Integer (Foreign Key - Event)
# category_id: Integer (Foreign Key - Category)
