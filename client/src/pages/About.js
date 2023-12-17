import React from 'react';
import '../styles/About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">
      <header className="text-center my-5">
        <h1>Welcome to OnTime</h1>
        <p className="lead">Your Event Management App</p>
      </header>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-bod">
              <h2 className="card-title">Managing Events</h2>
              <p className="card-text">Create, edit, and manage your events. Keep track of all the details.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-bod">
              <h2 className="card-title">View User Profiles</h2>
              <p className="card-text">See profiles of attendees, speakers, and collaborators for your events.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-bod">
              <h2 className="card-title">Event Recommendations</h2>
              <p className="card-text">Get event recommendations based on your preferences.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-bod">
              <h2 className="card-title">Attendee Management</h2>
              <p className="card-text">Keep track of attendees, and manage RSVPs for your events.</p>
            </div>
          </div>
        </div>
      </div>

      {/* "Get Started" button */}
      <div className="text-center">
        <Link to='/' className="rainbow btn btn-primary" style={{ backgroundColor: '#4250e5' }}>
          <span>Get started</span>
        </Link>
      </div>
    </div>
  );
};

export default About;
