import App from "./App";
import EventView from "./pages/EventView";
import Events from "./pages/Events";
import About from "./pages/About";
import Home from "./pages/Home";
// import HomePage from "./pages/HomePage";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <Error404 />,
        children: [
        {
            path: "/",
            element:<Home />
        },

        {
            path: "/about",
            element:<About />
        },
        {
            path:'/events',
            element:<Events />
        },
        {
            path:'/events/:id',
            element: <EventView/>
        }
        ],
    },
    
];

export default routes;