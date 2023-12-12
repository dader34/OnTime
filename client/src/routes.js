import App from "./App";
import EventView from "./pages/EventView";
import Events from "./pages/Events";
import About from "./pages/About";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/AuthPage";
import CreateEvent from "./pages/CreateEvent";
// import HomePage from "./pages/HomePage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
        },
        {
            path:'/create',
            element: <CreateEvent/>
        }
        ],
    },
    {
        path: "/login",
        element: <AuthPage/>
    }
    
];

export default routes;