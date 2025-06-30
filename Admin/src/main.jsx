import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "./Components/ui/sonner";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ProtectedAuthRoute } from "./lib/ProtectedAuthRoute";
import Login from "./Pages/Login";
import AddAgentPage from "./Pages/AddAgent";
import UploadList from "./Pages/Uploadcsv";
import LeadsBoard from "./Pages/LeadsBoard";
import { PrivateRoute } from "./lib/PrivateRoute";

const browseRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout for all routes
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "admin-dashboard", // ✅ spelling corrected & no leading slash
        element: <PrivateRoute><></></PrivateRoute>, // or actual Dashboard component
      },
      {
        path: "add-agent", // ✅ no leading slash
        element: <PrivateRoute><AddAgentPage /></PrivateRoute>,
      },
      {
        path: "upload-csv", // ✅ no leading slash
        element: <PrivateRoute><UploadList /></PrivateRoute>,
      },
      {
        path: "Leads-Board", // ✅ no leading slash
        element: <PrivateRoute><LeadsBoard /></PrivateRoute>,
      },
      {
        path: "login", // ✅ no leading slash
        element: (
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={browseRoutes} />
      <Toaster closeButton />
    </Provider>
  </StrictMode>
);
