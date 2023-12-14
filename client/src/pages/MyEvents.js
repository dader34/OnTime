import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import EventCard from '../components/EventCard'; // Import your EventCard component

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('myEvents');
  const {user} = useAuth()

  const myEvents = user ? user.events : []
  const createdEvents = user ? user.organized_events : []

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'myEvents' ? 'active' : ''}`} 
            href="#myEvents" 
            onClick={() => setActiveTab('myEvents')}
          >
            My Events
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'createdEvents' ? 'active' : ''}`} 
            href="#createdEvents" 
            onClick={() => setActiveTab('createdEvents')}
          >
            Created Events
          </a>
        </li>
      </ul>
      <div className="mt-3">
      <div className="row" style={{justifyContent:'space-around'}}>
      <div className="col-md-6">
        {activeTab === 'myEvents' &&
          (myEvents.length?myEvents.map(event => (
            <EventCard key={event.id} event={event} />
          )):"You are not attending any events")
        }
        {activeTab === 'createdEvents' &&
          (createdEvents.length? createdEvents.map(event => (
            <EventCard key={event.id} event={event} />
          )):"You have not created any events")
        }
        </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
