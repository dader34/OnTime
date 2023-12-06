import App from "./App";
import Events from "./pages/Events";
// import HomePage from "./pages/HomePage";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <Error404 />,
        // children: [
        //   {
        //     path: "/",
        //     element: <Authentication />
        //   }
        // ],
    },
    {
        path:'/events',
        element:<Events />
    }   
];

export default routes;