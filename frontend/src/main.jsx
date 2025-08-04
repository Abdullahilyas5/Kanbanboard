import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/Authcontext.jsx";

import Login from "./Components/pages/login.jsx";
import Signup from "./Components/pages/Signup.jsx";
import App from "./App.jsx";
import MainLayouts from "./Layouts/MainLayouts.jsx";
import Homepage from "./Components/pages/Homepages.jsx";
import UpdateBoard from "./Components/pages/UpdateBoard.jsx";
import DeleteBoard from "./Components/pages/DeleteBoard.jsx";
import Boarddata from "./Components/pages/boarddata.jsx";
import CreateTask from "./Components/Tasks/create-task.jsx";
import TaskDetailsModal from "./Components/Tasks/viewtask.jsx";
import LogoutConfirmation from "./Components/pages/LogoutConfirmation.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // Public (no auth required)
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // Everything under "/" goes through <App> (auth guard + loader)
  {
    path: "/",
    element: <App />,
    children: [
      {
        // Your main app layout (sidebar/header etc)
        element: <MainLayouts />,
        children: [
          // default redirect to /homepage
          { path: "update-Board", element: <UpdateBoard /> },
          { path: "delete-Board", element: <DeleteBoard /> },
          { path: "createBoard", element: <Boarddata /> },
          { path: "create-Task", element: <CreateTask /> },
          { path: "task-Details", element: <TaskDetailsModal /> },
          { path: "logout", element: <LogoutConfirmation /> },
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
