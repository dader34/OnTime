from flask import Flask, request, make_response, jsonify, render_template
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_caching import Cache
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, unset_access_cookies, unset_refresh_cookies
from datetime import datetime
from dotenv import load_dotenv
from flask_cors import CORS
from datetime import timedelta
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_TOKEN_LOCATION'] = ['cookies','headers']
app.config['CACHE_TYPE'] = 'SimpleCache'
# app.config['JWT_COOKIE_SECURE'] = False
# app.config['JWT_COOKIE_SAMESITE'] = 'None'
# app.config['JWT_CSRF_IN_COOKIES'] = True
# app.config['JWT_COOKIE_CSRF_PROTECT'] = True
# app.config['JWT_CSRF_HEADER_NAME'] = ''
# app.config['CSRF_TOKEN_REQUIRED'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['JWT_SECRET_KEY'] = os.environ.get("KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
migrate = Migrate(app,db)
api = Api(app)
jwt = JWTManager(app)
cache = Cache(app)
limiter = Limiter(
    app=app,
    key_func=get_remote_address,  # Function to generate a unique key for each visitor
    default_limits=["2000 per day", "2000 per hour"]  # Default rate limits
)

start_time = datetime.now()

@app.route('/')
def index():
    return render_template('dashboard.html',current_time=datetime.now() - start_time)