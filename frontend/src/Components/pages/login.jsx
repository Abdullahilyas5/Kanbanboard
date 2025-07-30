import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import api from "../../API/api"
import { NavLink } from "react-router-dom";
import { useMutation } from "react-query";
import { motion } from "motion/react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useRef } from "react";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { isAuthenticated, refetchUser  } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        handleUser(e);
      }
    }
  };

  const loginmutation = useMutation({
    mutationFn: (user) => api.loginUser(user),
    onSuccess: async (data) => {
      localStorage.setItem("token", data.data.token);
      await refetchUser(); 
      navigate("/"); // Always go to root, let App handle redirect
    },
    onError: (error) => {
      console.error("Login error:", error.response?.data || error.message);
    },
  })


  const handleUser = async (e) => {
    e.preventDefault();
    loginmutation.mutate(user);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="parent">
      <motion.form
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        end={{ opacity: 0.5, scale: 0.7 }}
        transition={{
          duration: 0.9,
          ease: "anticipate"
        }}
        action="/login"
        method="post"
        className="login-form"
        onSubmit={handleUser}
      >
        <h2 className="login-title">Login</h2>
        <div>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              ref={emailRef}
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              onBlur={() => passwordRef.current.focus()}
              placeholder="Email"
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)}
              placeholder="Password"

            />
          </div>
        </div>
        <p className="navigate-links">
          Don't have an account ? <NavLink className="link" to="/signup" replace>Sign up</NavLink>
        </p>
        <button type="submit" className="login-btn">Login</button>
      </motion.form>
    </div>
  );
};

export default Login;
