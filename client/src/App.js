import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';


function App() {

  return (
      <div className='App'>
        <NavBar />
        <Outlet />
        <Footer />
      </div>
  );
}

export default App;
