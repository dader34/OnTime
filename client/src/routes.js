import App from "./App";
import EventView from "./pages/EventView";
import Events from "./pages/Events";
import About from "./pages/About";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/AuthPage";
import CreateEvent from "./pages/CreateEvent";
import { AuthProvider } from "./Context/AuthContext";
// import HomePage from "./pages/HomePage";

const routes = [
    {
        path: "/",
        element: <AuthProvider><App /></AuthProvider>,
        errorElement: <ErrorPage />,
        children: [
        {
            path: "/",
            element:<AuthProvider><Home /></AuthProvider>
        },

        {
            path: "/about",
            element:<AuthProvider><About /></AuthProvider>
        },
        {
            path:'/events',
            element:<AuthProvider><Events /></AuthProvider>
        },
        {
            path:'/events/:id',
            element: <AuthProvider><EventView/></AuthProvider>
        },
        {
            path:'/create',
            element:<AuthProvider><CreateEvent/></AuthProvider>
        }
        ],
    },
    {
        path: "/login",
        element: <AuthProvider><AuthPage/></AuthProvider>
    }
    
];

export default routes;