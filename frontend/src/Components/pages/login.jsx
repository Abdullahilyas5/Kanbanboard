import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext.jsx";
import api from "../../API/api.js";
import { motion } from "motion/react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, refetchUser } = useContext(AuthContext);
  const emailRef = useRef(), passwordRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((c) => ({ ...c, [name]: value }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current ? nextRef.current.focus() : handleSubmit(e);
    }
  };

  const mutation = useMutation((u) => api.loginUser(u), {
    onSuccess: async (data) => {
      localStorage.setItem("token", data.data.token);
      toast.success("Login successful!");
      await refetchUser();
      navigate("/");
    },
    onError: () => toast.error("Invalid credentials!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(creds);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="login__container">
      <motion.form
        className="login__form"
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "anticipate" }}
        onSubmit={handleSubmit}
      >
        <h2 className="login__title">Login</h2>

        <div className="login__field-group">
          <label htmlFor="email" className="login__label">Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            className="login__input"
            value={creds.email}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            required
            autoFocus
          />
        </div>

        <div className="login__field-group" style={{ position: "relative" }}>
          <label htmlFor="password" className="login__label">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="login__input"
            value={creds.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            required
          />
          <button
            type="button"
            className="login__toggle-btn"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            <div
            className="eye-icons-login"
            >{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
          </button>
        </div>

        <p className="login__nav">
          Don't have an account?{" "}
          <NavLink to="/signup" className="login__nav_link">
            Sign up
          </NavLink>
        </p>

        <button type="submit" className="login__submit">
        {mutation.isLoading ? "Loging in..." : "Login"}
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
