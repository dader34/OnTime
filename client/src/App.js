import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet/>
    </div>
  );
}

export default App;
