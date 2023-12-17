import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import '../styles/Events.css'

const Events = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      fetch('/events')
        .then((resp) => resp.json())
        .then(data => setEvents(data.reverse()));
    }, []);
  
    return (
      <>
        <SearchBar setEvents={setEvents} />
        <div className="container mt-5" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <div className="row" style={{justifyContent:'space-around'}}>
            {events.map((event) => (
              <div key={event.id} className="col-md-6 mb-4">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default Events;
  
