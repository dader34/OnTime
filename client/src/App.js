import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';


function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false; 
  });

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark')
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  return (
      <div className={`App${darkMode ? ' dark' : ''}`}>
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
        <div className="page-container"> 
        <Outlet />
        </div>
        <Footer />
      </div>
  );
}

export default App;
