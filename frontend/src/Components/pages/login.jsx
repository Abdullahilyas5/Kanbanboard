import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUser = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(response.ok, "login successful!");
        navigate("/");
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("login error:", error.message);
    }
  };

  return (
    <div className="parent">
      <form
        action="/login"
        method="post"
        className="sign-form"
        onSubmit={handleUser}
      >
        <h2 className="inputs">Login</h2>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <p className="inputs">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
