import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/Authcontext.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from "./Components/pages/login.jsx";
import Signup from "./Components/pages/Signup.jsx";
import App from "./App.jsx";
import PrivateRoute from "./context/Privateroute.jsx";
import Homepage from "./Components/pages/Homepages.jsx";
import MainLayouts from "./Layouts/MainLayouts.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
    children: [

      {
        path: '/',
        element: (
          <App/>
        )
      },
      {
        path: '/login',
        element: <Login />
      },
      
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);