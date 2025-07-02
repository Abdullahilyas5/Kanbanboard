import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";
import Signup from '../Components/pages/Signup.jsx'
const PrivateRoute = ({ children }) => {
    const { Authref } = useContext(AuthContext);
    console.log("Authref value in privateroute : ", Authref.current);
    return Authref.current ? children : <Signup/>;
};

export default  PrivateRoute;