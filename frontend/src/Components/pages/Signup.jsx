import { useContext, useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext.jsx";
import api from "../../API/api.js";
import { useMutation } from "react-query";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Mutation function using react-query
  const createUserMutation = useMutation({
    mutationFn: (newUser) => api.createUser(newUser),
    onSuccess: (data) => {
      console.log("User created:", data);
      navigate("/"); // redirect to login on success
    },
    onError: (error) => {
      console.error("Signup error:", error.response?.data || error.message);
    },
  });

  const handleUser = (e) => {
    e.preventDefault();
    createUserMutation.mutate(user); // ✅ Trigger API
  };

  return (
    <div className="parent">
      <form className="sign-form" onSubmit={handleUser}>
        <h2 className="signin-title">Sign Up</h2>

        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handlechange}
            placeholder="Name"
          />
        </div>

        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handlechange}
            placeholder="Email"
          />
        </div>

        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handlechange}
            placeholder="Password"
          />
        </div>

        <p className="navigate-links">
          Already have an account?{" "}
          <a onClick={() => navigate("/login")}>Log in</a>
        </p>

        <button type="submit" className="signin-btn" disabled={createUserMutation.isLoading}>
          {createUserMutation.isLoading ? "Signing up..." : "Sign Up"}
        </button>

        {createUserMutation.isError && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {createUserMutation.error.response?.data?.message || "Signup failed"}
          </p>
        )}
      </form>

      <div className="form-closer" onClick={() => navigate("/")}></div>
    </div>
  );
};

export default Signup;
