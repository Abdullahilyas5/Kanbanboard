import React, { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "./context/Authcontext.jsx";
import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
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
      <div className="loader-logo">Kanban Board</div>
    </div>
  </div>
);

const App = () => {
  const { isLoading, isAuthenticated, isError } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3000);
    if (!isAuthenticated){
      Navigate("/login", { replace: true });
    }
    return () => clearTimeout(t);
  }, []);

  if (showLoader || isLoading) {
    return <LogoLoader />;
  }
  if (isError || !isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }
  return <Outlet />;
};

export default App;
