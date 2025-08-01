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
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Add this import

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Add this state
  const navigate = useNavigate();

  const { isAuthenticated, refetchUser } = useContext(AuthContext);

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
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Use dark theme
        style: {
          background: "white", // semi-transparent dark
          color: "white",                    // cyan-like text color
          borderRadius: "10px",
        },
      });


      await refetchUser();
      navigate("/"); // Always go to root, let App handle redirect
    },
    onError: (error) => {
      toast.error("invalid credential!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // Use dark theme
        style: {
          background: "white", // semi-transparent dark
          color: "white",                    // cyan-like text color
          borderRadius: "10px",
        },
      });
    },
  })


  const handleUser = async (e) => {
    e.preventDefault();
    console.log("login function")
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
              required
              id="email"
              value={user.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              onBlur={() => passwordRef.current.focus()}
              placeholder="Email"
              autoFocus
            />
          </div>
          <div className="input-box" style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle type
              ref={passwordRef}
              id="password"
              required
              name="password"
              value={user.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "55%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
                padding: 0,
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <div className="eye-icons">{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
            </button>
          </div>
        </div>
        <p className="navigate-links">
          Don't have an account ? <NavLink className="link" to="/signup-page" >Sign up</NavLink>
        </p>
        <button type="submit" className="login-btn">Login</button>
      </motion.form>
    </div>
  );
};

export default Login;
