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


  const handlecancle = () => {
    navigate(-1);
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
      } else {
        console.log("Login failed:", data.message);
      }
      navigate("/");
    } catch (error) {
      console.error("login error:", error.message);
    }
  };

  return (
    <div className="parent">
      <form
        action="/login"
        method="post"
        className="login-form"
        onSubmit={handleUser}
      >
        <i className="ri-close-line cancle" onClick={handlecancle}></i>
        <h2 className="login-title">Login</h2>
        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>


        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <p className="navigate-links">
          Don't have an account ? <a href="/signup">Sign up</a>
        </p>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="form-closer" onClick={handlecancle}></div>
    </div>
  );
};

export default Login;
