import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import api from "../../API/api"
import { useMutation } from "react-query";

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

  const loginmutation = useMutation({
    mutationFn: (user) => api.loginUser(user),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate("/"); 
    },
    onError: (error) => {
      console.error("Login error:", error.response?.data || error.message);
    },
  })


  const handleUser = async (e) => {
    e.preventDefault();
    loginmutation.mutate(user);


  };

  return (
    <div className="parent">
      <form
        action="/login"
        method="post"
        className="login-form"
        onSubmit={handleUser}
      >
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
    </div>
  );
};

export default Login;
