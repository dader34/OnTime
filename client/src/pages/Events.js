import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

const Events = ( ) => {
    const [events, setEvents] = useState([])

    useEffect(()=>{
        fetch('/events')
        .then(resp => resp.json())
        .then(setEvents)
    },[])

    return (
        <div className="container mt-5">
          <div className="row">
            {events.map((event) => (
              <div key={event.id} className="col mb-4">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      );
};

export default Events;
