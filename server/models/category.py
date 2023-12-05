from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from setup import db

class Category(db.Model,SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

    @validates('name')
    def name_validation(self,key,name):
        if name is not None and isinstance(name,str) and (3 <= len(name) <= 15):
            return name
        else:
            raise ValueError("Name must be a string between 3 and 15 chars")


# id: Integer (Primary Key)
# name: String