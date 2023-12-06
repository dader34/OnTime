#!/usr/bin/env python3

# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker

# Local imports
from main import app, db
from models.user import User
from models.event import Event
from models.category import Category
from models.event_category import EventCategory
from models.attendee import Attendee
from datetime import datetime

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code goes here!
        print("Clearing db...")
        User.query.delete()
        Event.query.delete()
        Category.query.delete()
        EventCategory.query.delete()
        Attendee.query.delete()

        users = []
        events = []

        print("Seeding users...")
        
        for i in range(10):
            u = User(
                name=fake.password(length=10),
            )
            u.password = fake.password()
            users.append(u)
            db.session.add(u)
        db.session.commit()

        print("Seeding categories...")
        categories = []
        for i in range(5):
            c = Category(name=fake.password(length=10))
            categories.append(c)
            db.session.add(c)
        db.session.commit()

        print("Seeding events and attendees...")
        for i in range(15):
            e = Event(
                title=fake.password(length=15),
                description=fake.password(length=30),
                date='2024-06-22 08:08:08',
                location=fake.password(length=10),
                organizer_id=rc(users).id,
            )
            events.append(e)

            db.session.add(e)
            db.session.commit()


            # Generate attendees for the event
            for _ in range(5):
                attendee = Attendee(
                    user_id=rc(users).id,
                    event_id=e.id
                )
                db.session.add(attendee)

        print("Seeding EventCategories")
        for i in range(15):
            ec = EventCategory(category_id=rc(categories).id,event_id=rc(events).id)
            db.session.add(ec)
            db.session.commit()


        db.session.commit()

        print("Done seeding!")
