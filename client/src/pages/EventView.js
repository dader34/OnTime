import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EventView.css';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast'

const EventView = () => {
  const [event, setEvent] = useState({});
  const [attending, setAttending] = useState(false)
  const { id } = useParams();
  const {user} = useAuth()
  const [owner,setOwner] = useState(false)
  const nav = useNavigate()

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((resp) => resp.json())
      .then(setEvent);

      if(user && user.events){
        const ids = user.events.map(e => e.id)
        if(ids.includes(parseInt(id))){
            setAttending(true)
        }
        console.log(ids)
    }

    if(user && user.organized_events){
        const ids = user.organized_events.map(e => e.id)
        if(ids.includes(parseInt(id))){
            setOwner(true)
        }
    }
  }, [id,user]);


  console.log(user)

  const handleRSVP = () => {
    fetch("/rsvp",{
        method:"POST",
        headers:{
            "Content-Type":'application/json',
            'X-CSRF-TOKEN': getCookie('csrf_access_token')
        },
        body:JSON.stringify({"event_id":parseInt(id)}),
        credentials: 'include'
    })
    .then(resp => resp.json().then(data => resp.ok ? (() => {setAttending(!attending);setEvent({...event,'users':data['attendees']})})() : alert(data['error'])))
    console.log('RSVP clicked');
  };

  const handleDelete = () =>{
    fetch(`/events/${id}`,{
        method:"DELETE",
        headers:{
            'X-CSRF-TOKEN': getCookie('csrf_access_token')
        },
    }).then(resp =>{
        if(resp.ok){
            nav('/')
        }else{
            resp.json().then(err => toast.error(err.error || err.msg))
        }
    }).catch(e => toast.error(e.message || e.msg))
  }

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
            
            {owner ? <button className='btn btn-danger' onClick={handleDelete}>Delete Post</button> : <button className="btn btn-success" style={{background: attending? 'red' : '#0d6efd'}} onClick={handleRSVP}>{!attending? 'I\'m in!' : "Withdraw"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
