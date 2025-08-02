// Signup.jsx
import React, { useContext, useRef, useState } from "react";
import  "./Signup.css";       // or "./Signup.css"
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
      toast.success("User created!", { /* …options… */ });
      await refetchUser();
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("Signup failed!", { /* …options… */ });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className={styles.signup__container}>
      <motion.form
        className={styles.signup__form}
        initial={{ opacity: 0.3, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "anticipate" }}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.signup__title}>Sign up</h2>

        <div className={styles.signup__field-group}>
          <label htmlFor="name" className={styles.signup__label}>Name</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            className={styles.signup__input}
            value={user.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            required
          />
        </div>

        <div className={styles.signup__field-group}>
          <label htmlFor="email" className={styles.signup__label}>Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            className={styles.signup__input}
            value={user.email}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            required
          />
        </div>

        <div className={styles.signup__field-group} style={{ position: "relative" }}>
          <label htmlFor="password" className={styles.signup__label}>Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={styles.signup__input}
            value={user.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            required
          />
          <button
            type="button"
            className={styles.signup__toggle-btn}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <p className={styles.signup__nav}>
          Already have an account?{" "}
          <NavLink to="/login" className={styles.signup__nav_link}>
            Login
          </NavLink>
        </p>

        <button
          type="submit"
          className={styles.signup__submit}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Signing up…" : "Sign Up"}
        </button>
      </motion.form>
    </div>
  );
};

export default Signup;
