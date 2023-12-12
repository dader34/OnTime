import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';
import { AuthProvider } from './Context/AuthContext';
import { useEffect } from 'react';
import { useAuth } from './Context/AuthContext';

function App() {
  return (
      <div className="App">
        <NavBar />
        <Outlet/>
        <Footer/>
      </div>
  );
}

export default App;
