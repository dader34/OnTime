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
    fetch('/topfive')
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
          <button className="btn" style={{background:'black',color:'white'}} onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
          <button className="btn btn-danger" onClick={() => {handleDelete();toast.dismiss(t.id)}}>
            Delete
          </button>
        </span>
      ));
  }

  return (
    <div>
      {/* Jumbotron */}
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">Welcome{user && `, ${user.name}`}</h1>
          <p className="lead">
            Explore and discover exciting events in your community.
          </p>
        </div>
      </div>

      {/* Create Event Section - Moved up */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h2>Create an Event</h2>
            <p>Create and share your own event with the community.</p>
            <Link to="/create" className="rainbow btn btn-primary">
              <span>Create Event</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Upcoming Events</h2>
            {topFive.map(e => <EventCard event={e} key={e.id}/>)}
          </div>
          {/* <div className="col-md-4">
            <h2>Featured Categories</h2>
            {/* Content for Featured Categories
          </div> */}
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