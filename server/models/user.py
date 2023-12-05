from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from setup import db
import bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    @validates('name')
    def name_validation(self,key,name):
        if name is not None and isinstance(name,str) and (5 <= len(name) <= 15):
            return name
        else:
            raise ValueError("Name must be a string between 5 and 15 chars")
    
    @validates('password')
    def password_validation(self,key,password):
        if password is not None and isinstance(password,str) and (5 <= len(password) <= 15):
            return password
        else:
            raise ValueError("Password must be a string between 5 and 15 chars")

    @property
    def password(self):
        raise AttributeError("Password is not retrievable")
    
    @password.setter
    def password(self,password):
        self._password_hash = bcrypt.hashpw(password,bcrypt.gensalt())



#? Stretch Goals ?#
# Profile picture #