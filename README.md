# OnTime - Event Management App

![OnTime Logo](link-to-logo.png)

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
  - Assign categories and tags to events.
  - View detailed information about events.

- **User Profiles:**
  - Personalized user profiles.
  - View and manage created events.

- **Attendee Interaction:**
  - See a list of attendees for each event.
  - Interact with other attendees through comments or likes.

- **Search and Filter:**
  - Search for specific events.
  - Filter events based on date, category, or location.

- **Responsive Design:**
  - User-friendly interface optimized for various devices.

- **Real-time Updates:**
  - Receive real-time updates on event changes.

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

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)

- **Backend:**
  - [Flask](https://flask.palletsprojects.com/)
  - [SQLAlchemy](https://www.sqlalchemy.org/)

- **Database:**
  - [SQLite](https://www.sqlite.org/)


## License

This project is licensed under the [MIT License](LICENSE).
