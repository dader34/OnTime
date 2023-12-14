import React from 'react';
import '../styles/EventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    console.log(event)
  return (
    <div className="custom-card card">
      <img
        src={event.image_url}
        className="card-img-top"
        alt={event.title}
        onError={({ currentTarget }) => {
          currentTarget.src = 'https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=150 150w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=300 300w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=600 600w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=800 800w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=1200 1200w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=1600 1600w';
        }} 
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
