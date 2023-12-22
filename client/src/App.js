import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';
import { useAuth } from './Context/AuthContext';


function App() {

  const { user } = useAuth()

  return (
    <div className='App'>
      {user ?
        <>
        <NavBar />
        <Outlet />
        <Footer />
        </>
        :
        <div style={{width:'100%',textAlign:'center'}}>
        <h1>Please sign in</h1>
        </div>
      }
    </div>
  );
}

export default App;
