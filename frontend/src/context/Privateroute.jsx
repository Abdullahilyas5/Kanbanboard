import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";

const PrivateRoute = ({ children }) => {
    const { isauthorize } = useContext(AuthContext);
    console.log("isauthorize value in privateroute : ", isauthorize);
    return isauthorize ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;