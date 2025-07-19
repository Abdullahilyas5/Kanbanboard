import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
