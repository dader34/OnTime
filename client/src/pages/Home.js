import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'
import { useAuth } from '../Context/AuthContext';

const Home = () => {
    const {user} = useAuth()
    console.log(user)
  return (
    <div>
      {/* Jumbotron */}
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">Welcome{user && `, ${user.name}`}</h1>
          <p className="lead">
            Explore and discover exciting events in your community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Upcoming Events</h2>
            {/* Top 5 closest events to current time (grab from server) */}
            {/* Add content here */}
          </div>
          <div className="col-md-6">
            <h2>Featured Categories</h2>
            {/* Most popular categories top 5 (grab from server) */}
            {/* Add content here */}
          </div>
        </div>
      </div>

      {/* Create Event Section */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h2>Create an Event</h2>
            <p>Create and share your own event with the community.</p>
            <Link to="/create" className="rainbow btn btn-primary">
              <span>Create Event</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
