import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { useAuth } from '../Context/AuthContext';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

const Home = () => {
  const { user,getCookie } = useAuth();
  const [topFive, setTopFive] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
    user&&
    fetch('/topfive',{
        credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then(setTopFive);
        } else {
          res.json().then(e => toast.error(e.msg || e.message));
        }
      })
      .catch(e => alert(e));
  }, [user]);


  const handleDelete = () =>{
    fetch(`/users/${user?.id}`,{
        method:"DELETE",
        headers:{
            'X-CSRF-TOKEN':getCookie('csrf_access_token')
        },
        credentials: 'include'
    })
    .then(resp =>{
        if(resp.ok){
            toast.success("Account deleted")
            nav('/login')
        }else{
            resp.json().then(data => toast.error(data.msg || data['error']))
        }
    })
  }

  const handleDeleteProfile = () => {
    toast((t) => (
        <span>
        <b>Are you sure?</b>
        <div className="d-flex align-items-center justify-content-center mt-2">
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              handleDelete();
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
        </div>
        </span>
      ));
  }

  return (
    <div className='page-container'>
      {/* Jumbotron */}
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">Welcome{user && `, ${user.name}`}</h1>
          <p className="lead">
            Explore and discover exciting events in your community.
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Create an Event</h2>
            <p>Create and share your own event with the community.</p>
            <Link to="/create" className="rainbow btn btn-primary">
              <span>Create Event</span>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Upcoming Events</h2>
            {topFive.length ? topFive.map(e => <EventCard event={e} key={e.id}/>) : <p>You have no upcoming events...</p>}
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-md-12 text-center">     
          <button className="btn btn-danger" onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;