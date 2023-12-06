import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="card">
      <img
        src={event.image_url}  // Replace with the actual image source
        className="card-img-top"
        alt={event.title}
      />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.description}</p>
        {/* <a href="#" className="btn btn-primary"> */}
          {/* View Details */}
        {/* </a> */}
      </div>
    </div>
  );
};

export default EventCard;