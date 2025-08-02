// src/index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/Authcontext.jsx";
import App from "./App.jsx";

import Login from "./Components/pages/login.jsx";
import Signup from "./Components/pages/Signup.jsx";
import MainLayouts from "./Layouts/MainLayouts.jsx";
import Homepage from "./Components/pages/Homepages.jsx";
import UpdateBoard from "./Components/pages/UpdateBoard.jsx";
import DeleteBoard from "./Components/pages/DeleteBoard.jsx";
import Boarddata from "./Components/pages/boarddata.jsx";
import CreateTask from "./Components/Tasks/create-task.jsx";
import LogoutConfirmation from "./Components/pages/LogoutConfirmation.jsx";
import TaskDetailsModal from "./Components/Tasks/viewtask.jsx";
import PrivateRoute from "./context/Privateroute.jsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,    // ← top-level guard & loader
    children: [
      // Public
      { path: "login",  element: <Login /> },
      { path: "signup", element: <Signup /> },

      // Protected
      {
        element: <MainLayouts />, // shared layout (header/sidebar)
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            ),
          },
          {
            path: "update-Board",
            element: (
              <PrivateRoute>
                <UpdateBoard />
              </PrivateRoute>
            ),
          },
          {
            path: "delete-Board",
            element: (
              <PrivateRoute>
                <DeleteBoard />
              </PrivateRoute>
            ),
          },
          {
            path: "createBoard",
            element: (
              <PrivateRoute>
                <Boarddata />
              </PrivateRoute>
            ),
          },
          {
            path: "create-Task",
            element: (
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            ),
          },
          {
            path: "logout",
            element: (
              <PrivateRoute>
                <LogoutConfirmation />
              </PrivateRoute>
            ),
          },
          {
            path: "task-Details",
            element: (
              <PrivateRoute>
                <TaskDetailsModal />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

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
            border: "1px solid rgba(0,255,247,0.3)",
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
