import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Map from "./component/Map.jsx";
import AdminPage from "./component/AdminPage.jsx";
import ReadMap from "./component/ReadMap.jsx";
import CreateMap from "./component/CreateMap.jsx";
import EditMap from "./component/EditMap.jsx";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <AdminPage></AdminPage>,
  },
  {
    path: "/readmap",
    element: <ReadMap></ReadMap>,
  },
  {
    path: "/createmap",
    element: <CreateMap></CreateMap>,
  },
  {
    path: "/editmap",
    element: <EditMap></EditMap>,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
