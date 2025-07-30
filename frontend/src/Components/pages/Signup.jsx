import { useContext, useRef, useState } from "react";
import "./signup.css";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext.jsx";
import api from "../../API/api.js";
import { motion } from "motion/react";
import { useMutation } from "react-query";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ get isAuthenticated and refetchUser
  const { isAuthenticated, refetchUser } = useContext(AuthContext);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handlechange = (e) => {
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

  const createUserMutation = useMutation({
    mutationFn: (newUser) => api.createUser(newUser),
    onSuccess: async (data) => {
      localStorage.setItem("token", data.data.token);
      await refetchUser(); 
      navigate("/"); // Always go to root, let App handle redirect
    },
    onError: (error) => {
      console.error("Signup error:", error.response?.data || error.message);
    },
  });

  const handleUser = (e) => {
    e.preventDefault();
    createUserMutation.mutate(user);
  };

  // ✅ Now placed AFTER hooks — safe usage
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
          ease: "anticipate",
        }}
        className="sign-form"
        onSubmit={handleUser}
      >
        <h2 className="signin-title">Sign up</h2>

        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handlechange}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            onBlur={() => emailRef.current.focus()}
            placeholder="Name"
          />
        </div>

        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handlechange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            onBlur={() => passwordRef.current.focus()}
            placeholder="Email"
          />
        </div>

        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handlechange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            placeholder="Password"
          />
        </div>

        <p className="navigate-links">
          Already have an account? <NavLink className="link" to={"/login"} replace>Login</NavLink>
        </p>

        <button type="submit" className="signin-btn" disabled={createUserMutation.isLoading}>
          {createUserMutation.isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </motion.form>
    </div>
  );
};

export default Signup;
