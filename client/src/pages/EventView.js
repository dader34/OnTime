import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EventView.css';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast'
import GoogleMap from '../components/GoogleMap';

const EventView = () => {
    const [event, setEvent] = useState({});
    const [attending, setAttending] = useState(false)
    const { id } = useParams();
    const { user,getCookie } = useAuth()
    const [owner, setOwner] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
    user?.id && id &&
        fetch(`/events/${id}`)
            .then((resp) => {
                if(resp.ok){
                    resp.json().then(setEvent)
                }else{
                    nav('/')
                }
            }).catch(e => toast.error(e.message))
        
        fetch('/user',{
            headers:{
                "X-CSRF-TOKEN":getCookie('csrf_access_token')
            }
        })
        .then(resp =>{
            if(resp.ok){
                resp.json().then(data => {
                    const ids = data.events.map(e => e.id)
                    if (ids.includes(parseInt(id))) {
                        setAttending(true)
                    }

                    const oids = data.organized_events.map(e => e.id)
                    if (oids.includes(parseInt(id))) {
                        setOwner(true)
                    }
                })
            }
        }).catch(e => toast.error(e.message))
            
    }, [id, user, nav]);

    console.log(event)

    const handleRSVP = () => {
        fetch("/rsvp", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'X-CSRF-TOKEN': getCookie('csrf_access_token')
            },
            body: JSON.stringify({ "event_id": parseInt(id) }),
            credentials: 'include'
        })
            .then(resp => resp.json().then(data => resp.ok ? setEvent({ ...event, 'users': data['attendees'] }) : toast.error(data['error'])))
            .catch(e => toast.error(e.message))
            setAttending(current => !current); 
        console.log('RSVP clicked');
    };

    const handleDelete = () => {
        fetch(`/events/${id}`, {
            method: "DELETE",
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token')
            },
        }).then(resp => {
            if (resp.ok) {
                nav('/')
            } else {
                resp.json().then(err => toast.error(err.error || err.msg))
            }
        }).catch(e => toast.error(e.message))
    }

    const convertToLocaleString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice();
    }

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
                            <strong>Host:</strong> {event?.organizer?.name}
                        </p>
                        <p>
                            <strong>Date: {convertToLocaleString(event.date)}</strong> 
                        </p>
                        <p>
                            <strong>Location:</strong>
                            
                        </p>
                        {event.location && <GoogleMap lat={parseFloat(event.location.split(",")[0])} lng={parseFloat(event.location.split(",")[1])} zoom={15} />}
                        <p>
                            <strong>Description:</strong> {event.description}
                        </p>
                        {categories && <><strong>Categories:</strong> {categories}</>}
                        <p>
                            <strong>Attendees:</strong> {event.users ? event.users.length : 0}
                        </p>

                        {owner ? <><button className='btn btn-danger' onClick={handleDelete}>Delete Event</button><button className='btn btn-danger' onClick={() => nav(`/edit/${id}`)}>Edit Event</button></> : <button className="btn btn-success" style={{ background: attending ? 'red' : '#0d6efd' }} onClick={handleRSVP}>{!attending ? 'I\'m in!' : "Withdraw"}</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventView;
