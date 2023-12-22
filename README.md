# OnTime - Event Management App

![OnTime Logo](client/public/fav.ico)

OnTime is an event management application that helps users discover, create, and manage events seamlessly. Whether you're an event organizer or an attendee, OnTime provides a user-friendly platform for all your event-related needs.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **User Authentication:**
  - Secure user registration and login.
  - Authentication via username/password and third-party services (Google).

- **Event Management:**
  - Create, edit, and delete events.
  - Assign categories to events.
  - View detailed information about events.

- **User Profiles:**
  - View and manage created events.
  - Manage Profile (delete)

- **Attendee Interaction:**
  - See number of attendees for each event.

- **Search and Filter:**
  - Search for specific events.
  - Filter events based on title or category.

- **Responsive Design:**
  - User-friendly interface optimized for various devices (bootstrap).


## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dader34/OnTime.git
   ```

2. Navigate to the project directory:

   ```bash
   cd OnTime
   ```

3. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd ../server
   pip install -r requirements.txt
   ```

5. Initialize the database

    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

6. Create .env files
    - There are 2 .env files in this project, one in the root directory for python, and one in the client directory for react.
    - Create the root level .env file with a variable designated as `KEY`, this will be your jwt (authentication) password
    - Obtain a google maps javascript api key from [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
    - Create a .env file in your `client` directory, and create a variable named `REACT_APP_API_KEY`
    - Env files should look like these examples
    * Root level .env file

        ```
        KEY=1234567812
        ```
    
    * Client .env file

        ```
        REACT_API_KEY=12383740287
        ```

## Usage

1. Start the frontend:

   ```bash
   cd client
   npm start
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

2. Start the backend:

   ```bash
   cd ../server
   flask run
   ```

   The backend will be available at [http://localhost:5000](http://localhost:5000).

3. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to use OnTime.

## Project Structure

```
OnTime/
|-- client/
|   |-- public/
|   |-- src/
|   |-- ...
|-- server/
|   |-- app/
|   |-- ...
|-- ...
```

- **client:** Contains the React.js frontend code.
- **server:** Contains the Flask backend code.

## Pages

- `/`: Home route
- `/login`: Login/signup
- `/events`: Show all events
- `/profile`: Show your profiles events
- `/logout`: Logs you out

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Google Maps Api](hhttps://developers.google.com/maps)

- **Backend:**
  - [Flask](https://flask.palletsprojects.com/)
  - [SQLAlchemy](https://www.sqlalchemy.org/)
  - [Flask-Limiter](https://flask-limiter.readthedocs.io/en/stable/)

- **Database:**
  - [SQLite](https://www.sqlite.org/)


## License

This project is licensed under the [MIT License](LICENSE).


## Honorable Mentions

- Huge shoutout to flatiron school, over the past few months I have met some amazing people, and learned so much more than I ever thought I could! Im so grateful that i was able to be a part of such an amazing course.

#CryptoBoiz4Lyfe