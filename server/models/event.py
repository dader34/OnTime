from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime
from setup import db

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String,nullable=False)
    description = db.Column(db.String,nullable=False)
    location = db.Column(db.String,nullable=False)
    date = db.Column(db.String,nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete='CASCADE'),nullable=False)
    image_url = db.Column(db.String,default='https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=150 150w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=300 300w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=600 600w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=800 800w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=1200 1200w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=1600 1600w')
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    organizer = db.relationship("User",back_populates='organized_events')
    event_categories = db.relationship('EventCategory',back_populates='event',cascade='all, delete-orphan')
    categories = association_proxy('event_categories','category')
    attendees = db.relationship('Attendee',back_populates='event', cascade='all, delete-orphan')
    users = association_proxy('attendees','user')

    serialize_only = ('id', 'title', 'description', 'location', 'date', 'image_url', 'created_at', 'categories.name','organizer_id')
    

    @validates('title')
    def title_validation(self,key,title):
        if title is not None and isinstance(title,str) and (5 <= len(title) <= 50):
            return title
        else:
            raise ValueError('Title must be a str between 5 and 50 chars')
        
    @validates('description')
    def description_validation(self,key,description):
        if description is not None and isinstance(description,str) and (10 <= len(description) <= 200):
            return description
        else:
            raise ValueError('Description must be a str between 10 and 200 chars')
    
    # @validates('date')
    # def date_validation(self,key,date):
    #     if date is not None and isinstance(date,str):
    #         event_date = datetime.strptime(date, '%Y-%m-%d %H:%M:%S').date()
            
    #         if event_date < datetime.today().date():
    #             raise ValueError('Event date cannot be in the past.')
            
    #         return date
        
    #     else:
    #         raise ValueError('Date must be a str')
        
    @validates('location')
    def location_validation(self,key,location):
        if location is not None and isinstance(location,str) and (5 <= len(location) <= 100):
            return location
        else:
            raise ValueError('Location must be a str between 5 and 100 chars')


# id: Integer (Primary Key)
# title: String
# description: Text
# date: Date
# location: String
# organizer_id: Integer (Foreign Key - User)
# created_at: Timestamp

#? Stretch Goals ?#
# Location is coordinates or something that links to google maps on frontend