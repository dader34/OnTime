import App from "./App";
import EventView from "./pages/EventView";
import Events from "./pages/Events";
import HomePage from "./pages/HomePage";
// import HomePage from "./pages/HomePage";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <Error404 />,
        children: [
        {
            path: "/",
            element:<HomePage />
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