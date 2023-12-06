import { useState } from 'react';
import '../styles/EventView.css';

const EventView = () => {
    const [event, setEvent] = useState({})

    // fetch

    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="event-view-container">
                <h2 className="text-primary">{event.title}</h2>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                {/* Additional details as needed */}
              </div>
            </div>
          </div>
        </div>
      );
};

export default EventView;