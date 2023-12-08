import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css';
// import App from './App';
import routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);
root.render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
