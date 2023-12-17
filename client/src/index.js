import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css';
import { Toaster } from 'react-hot-toast';
import routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);
root.render(

  <React.StrictMode>
    <Toaster toastOptions={{
          error: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          }
        }} />
      <RouterProvider router={router}>

      </RouterProvider>
  </React.StrictMode>
);
