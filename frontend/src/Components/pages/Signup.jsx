import React, { useContext, useRef, useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext.jsx";
import api from "../../API/api.js";
import { motion } from "motion/react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, refetchUser } = useContext(AuthContext);
  const nameRef = useRef(), emailRef = useRef(), passwordRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current ? nextRef.current.focus() : handleSubmit(e);
    }
  };

  const mutation = useMutation((u) => api.createUser(u), {
    onSuccess: async (data) => {
      localStorage.setItem("token", data.data.token);
      toast.success("User created!");
      await refetchUser();
      navigate("/", { replace: true });
    },
    onError: () => toast.error("Signup failed!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="signup__container">
      <motion.form
        className="signup__form"
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "anticipate" }}
        onSubmit={handleSubmit}
      >
        <h2 className="signup__title">Sign up</h2>

        <div className="signup__field-group">
          <label htmlFor="name" className="signup__label">Name</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            className="signup__input"
            value={user.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            required
          />
        </div>

        <div className="signup__field-group">
          <label htmlFor="email" className="signup__label">Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            className="signup__input"
            value={user.email}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            required
          />
        </div>

        <div className="signup__field-group" style={{ position: "relative" }}>
          <label htmlFor="password" className="signup__label">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="signup__input"
            value={user.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            required
          />
          <button
            type="button"
            className="signup__toggle-btn"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <p className="signup__nav">
          Already have an account?{" "}
          <NavLink to="/login" className="signup__nav_link">
            Login
          </NavLink>
        </p>

        <button
          type="submit"
          className="signup__submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Signing up…" : "Sign Up"}
        </button>
      </motion.form>
    </div>
  );
};

export default Signup;
