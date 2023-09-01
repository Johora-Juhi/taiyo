import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CcreateContact from "../Pages/CreateContact/CcreateContact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Contact></Contact>,
            },
            {
                path: "/create-contact",
                element: <CcreateContact></CcreateContact>,
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            }
        ]
    }
]);
export default router;

