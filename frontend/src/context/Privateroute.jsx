import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authcontext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isError } = useContext(AuthContext);

  if (isLoading) return null;
  if (isError || !isAuthenticated) return <Navigate to="/signup" replace />;
  return children;
};

export default PrivateRoute;
