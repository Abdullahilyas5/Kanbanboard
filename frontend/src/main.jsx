import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/Authcontext.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import UpdateBoard from "./Components/pages/UpdateBoard.jsx";

import Login from "./Components/pages/login.jsx";
import Signup from "./Components/pages/Signup.jsx";
import App from "./App.jsx";
import PrivateRoute from "./context/Privateroute.jsx";
import Homepage from "./Components/pages/Homepages.jsx";
import MainLayouts from "./Layouts/MainLayouts.jsx";
import CreateTask from "./Components/Tasks/create-task.jsx";
import LogoutConfirmation from "./Components/pages/LogoutConfirmation.jsx";
import Boarddata from "./Components/pages/boarddata.jsx";
import DeleteBoard from "./Components/pages/DeleteBoard.jsx";
import TaskDetailsModal from "./Components/Tasks/viewtask.jsx";
import { ToastContainer } from "react-toastify";

// Query client instance
const queryClient = new QueryClient();

// Router
const router = createBrowserRouter([
  // Public routes (no layout)

  {
    path: '/login',
    
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },


  // Routes using MainLayouts
  {
    path: '/',
    element: <MainLayouts />,
    children: [

      {
        path: '/update-Board',
        element: <UpdateBoard />
      },
      {
        path: '/delete-Board',
        element: <DeleteBoard />
      },

      {
        path: '/homepage',
        element: (
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        )
      },
      {
        path: '/createBoard',
        element: <Boarddata />
      },
      {
        path: '/create-Task',
        element: <CreateTask />
      },
      {
        path: '/logout',
        element: <LogoutConfirmation />
      },
      {
        path: '/task-Details',
        element: <TaskDetailsModal />
      },


    ]
  }
]);

// Root render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            zIndex: 9999,
            background: "transparent !important",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            color: "#00fff7",
            border: "1px solid rgba(0,255,247,0.3)"
          }}
        />

      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
