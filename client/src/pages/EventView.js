import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EventView.css';

const EventView = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((resp) => resp.json())
      .then(setEvent);
  }, [id]);

  const handleRSVP = () => {
    // Logic to handle RSVP (e.g., update the server and then update the state)
    fetch("/rsvp",{
        method:"POST",
        headers:{
            "Content-Type":'application/json',
            'X-CSRF-TOKEN': getCookie('csrf_access_token')
            // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMjQxMjI3NiwianRpIjoiM2U5YmI5NDgtYzZlMy00ZTI1LTkzMTktNzM4MzA4MmJjOWY2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MTIsIm5iZiI6MTcwMjQxMjI3NiwiY3NyZiI6IjZhYTQ5N2Y5LWY2NWMtNDg1My1hOGYwLTU4Mzc2Zjk1MGRhNSIsImV4cCI6MTcwMjQxNDA3Nn0.PhRHPkooRrg3qZ6is1090feeLpbVG8vSQBcilLLd8FY`
        },
        body:JSON.stringify({"event_id":parseInt(id)}),
        credentials: 'include'
    })
    .then(resp => resp.json().then(data => resp.ok ? setEvent({...event,'users':data['attendees']}) : alert(data['error'])))
    console.log('RSVP clicked');
    // You may want to send a request to the server here and then update the event state
  };

  console.log(event)

  const categories = event.categories ? event.categories.map((cat) =>
    <span key={cat.name} className='btn btn-primary'>{cat.name}</span>
  ) : undefined

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <img
          src={event.image_url}
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
            {categories && <><strong>Categories:</strong> {categories}</>}
            <p>
              <strong>Attendees:</strong> {event.users ? event.users.length : 0}
            </p>
            <button className="btn btn-success" onClick={handleRSVP}>I'm in!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
