from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from dotenv import load_dotenv
from flask_cors import CORS
from datetime import timedelta
import os


load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['JWT_SECRET_KEY'] = os.environ.get("KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app,db)
api = Api(app)
# db.init_app(app)

@app.route('/')
def index():
    return '<h1>OnTime is running!</h1>'