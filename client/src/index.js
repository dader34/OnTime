import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css';
import { AuthProvider } from './Context/AuthContext';
import routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);
root.render(

  <React.StrictMode>
      <RouterProvider router={router}>

      </RouterProvider>
  </React.StrictMode>
);
