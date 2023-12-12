from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies
from dotenv import load_dotenv
from flask_cors import CORS
from datetime import timedelta
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_TOKEN_LOCATION'] = ['cookies','headers']
app.config['JWT_COOKIE_SECURE'] = True 
app.config['JWT_COOKIE_SAMESITE'] = 'None'
app.config['JWT_CSRF_IN_COOKIES'] = False
# app.config['JWT_CSRF_HEADER_NAME'] = ''
app.config['JWT_SECRET_KEY'] = os.environ.get("KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
migrate = Migrate(app,db)
api = Api(app)
jwt = JWTManager(app)

@app.route('/')
def index():
    return '<h1>OnTime is running!</h1>'