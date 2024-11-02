import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Landing from "../pages/Landing";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
const AddRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AddRoutes;
