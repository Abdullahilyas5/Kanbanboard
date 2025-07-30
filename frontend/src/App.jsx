import React, { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "./context/Authcontext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const LogoLoader = () => (
  <div className="loading-container">
    <div className="loading-content">
      <Bars
        height="80"
        width="80"
        radius="2"
        color="#655ec3"
        ariaLabel="loading"
      />
      Kanban Board
    </div>
  </div>
);

const App = () => {
  const { isLoading, isAuthenticated, isError } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);

  // ➤ Mandatory 2 s loader on mount
  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // ➤ While loader active OR fetching user data
  if (showLoader || isLoading) {
    return <LogoLoader />;
  }

  // ➤ After loader + fetch, redirect if not authenticated
  if (isError || !isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  // ➤ Authenticated → render child routes
  return <Outlet />;
};

export default App;
