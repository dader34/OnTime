from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from setup import db

class Category(db.Model,SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True,nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    event_categories = db.relationship('EventCategory',back_populates='category',cascade='all, delete-orphan')
    events = association_proxy('event_categories','event')

    @validates('name')
    def name_validation(self,key,name):
        if name is not None and isinstance(name,str) and (3 <= len(name) <= 15):
            if name.isalnum():
                return name
            else:   
                raise ValueError("Category name must be alphanumeric")
        else:
            raise ValueError('Name must be a string between 3 and 15 chars')


# id: Integer (Primary Key)
# name: String