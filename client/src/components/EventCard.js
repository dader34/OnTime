import React from 'react';
import '../styles/EventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="custom-card card">
      <img
        src={event.image_url}
        className="card-img-top"
        alt={event.title}
      />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        {/* <p className="card-text">{event.description}</p> */}
        <div className="button-container">
          <Link to={`/events/${event.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
