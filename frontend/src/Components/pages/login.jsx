// Login.jsx
import React, { useContext, useRef, useState } from "react";
import "./login.css";      // or "./Login.css"
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
      toast.success("Login successful!", { /* …options… */ });
      await refetchUser();
      navigate("/");
    },
    onError: () => toast.error("Invalid credentials!", { /* …options… */ }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(creds);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className={styles.login__container}>
      <motion.form
        className={styles.login__form}
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "anticipate" }}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.login__title}>Login</h2>

        <div className={styles.login__field-group}>
          <label htmlFor="email" className={styles.login__label}>Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            className={styles.login__input}
            value={creds.email}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            required
            autoFocus
          />
        </div>

        <div className={styles.login__field-group} style={{ position: "relative" }}>
          <label htmlFor="password" className={styles.login__label}>Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={styles.login__input}
            value={creds.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            required
          />
          <button
            type="button"
            className={styles.login__toggle-btn}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <p className={styles.login__nav}>
          Don't have an account?{" "}
          <NavLink to="/signup" className={styles.login__nav_link}>
            Sign up
          </NavLink>
        </p>

        <button type="submit" className={styles.login__submit}>
          Login
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
