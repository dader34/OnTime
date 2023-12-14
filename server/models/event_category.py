from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from .category import Category
from .event import Event
from setup import db

class EventCategory(db.Model, SerializerMixin):
    __tablename__ = 'event_categories'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id',ondelete='CASCADE'),nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'),nullable=False)
    event = db.relationship('Event', back_populates='event_categories',cascade='all, delete-orphan', passive_deletes=True,single_parent=True)
    category = db.relationship('Category',back_populates='event_categories',cascade='all, delete-orphan', passive_deletes=True,single_parent=True)

    #cascading deletes from attendees deletion tries to delete eventCategory?

    @validates('event_id')
    def event_id_validation(self,key,e_id):
        print(e_id)
        if (e_id is not None) and isinstance(e_id,int) and (db.session.get(Event,e_id)):
            return e_id
        else:
            raise ValueError(f'Event id must be an id that correlates to a event {e_id}, {type(e_id)}')

    @validates('category_id')
    def category_validation(self,key,e_id):
        if e_id is not None and isinstance(e_id,int) and db.session.get(Category,e_id):
            return e_id
        else:
            raise ValueError('Category id must be an id that correlates to a category')


# id: Integer (Primary Key)
# event_id: Integer (Foreign Key - Event)
# category_id: Integer (Foreign Key - Category)
