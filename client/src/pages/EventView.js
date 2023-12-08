// EventView.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EventView.css';

const EventView = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((resp) => resp.json())
      .then(setEvent);
  }, [id]);

  console.log(event)

    const categories = event.categories ? event.categories.map((cat) =>
        <span key={cat.name} className='btn btn-primary'>{cat.name}</span>
    ) : undefined

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <img
          src={event.image_url} // Make sure your event object includes a property 'imageUrl'
          alt={event.title}
          className="img-fluid rounded"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="event-view-container">
            <h2 className="text-primary">{event.title}</h2>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            {categories.length? "Categories:" : null}
            {categories && categories}
            {/* Additional details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
