import { useContext } from "react";
import { Bars } from 'react-loader-spinner';
import Homepage from "./Components/pages/Homepages.jsx";
import { AuthContext } from './context/Authcontext.jsx';
import { Navigate } from "react-router-dom";

const App = () => {
  const { isLoading, isAuthenticated, isError } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Bars height="80" width="80" radius="2" color="#655ec3" ariaLabel="loading" />
          <h2 className="loader-logo">Kanban</h2>
        </div>
      </div>
    );
  }

  // 🚨 Make sure to RETURN these:
  if (!isAuthenticated || isError) {
    return <Navigate to="/signup" replace />;
  }

  if (isAuthenticated) {
    return <Homepage/>;
  }

  // Optional: fallback in case nothing matches
  return null;
};

export default App;
