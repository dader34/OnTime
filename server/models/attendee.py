from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from .user import User
from .event import Event
from setup import db


class Attendee(db.Model, SerializerMixin):
    __tablename__ = 'attendees'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete="CASCADE"),nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id',ondelete="CASCADE"),nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User',back_populates='attendees')
    event = db.relationship('Event', back_populates='attendees')

    @validates('user_id')
    def user_validation(self,key,id):
        if id is not None and isinstance(id,int) and db.session.get(User,id):
            return id
        else:
            raise ValueError('User id must be an id that correlates to a user')
    
    @validates('event_id')
    def event_validation(self,key,id):
        if id is not None and isinstance(id,int) and db.session.get(Event,id):
            return id
        else:
            raise ValueError(f'Event id must be an id that correlates to a event {id}, {type(id)}')
        
    
# id: Integer (Primary Key)
# user_id: Integer (Foreign Key - User)
# event_id: Integer (Foreign Key - Event)
# created_at: Timestamp