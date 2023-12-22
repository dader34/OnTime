import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="page-container">
                <div className="container mt-5" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                    <div className="row" style={{ justifyContent: 'space-around' }}>
                        {events.length ? events.map((event) => (
                            <div key={event.id} className={events.length > 1 ? "col-md-6 mb-4" : "col-md-12 d-flex justify-content-center mb-2"}>
                                <EventCard event={event} />
                            </div>
                        )) : <><h1>Looks like no one has made a post yet, be the first!</h1><br /><Link to="/create" className="rainbow btn btn-primary" style={{ width: '12%' }}>
                            <span>Create Event</span>
                        </Link></>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Events;

