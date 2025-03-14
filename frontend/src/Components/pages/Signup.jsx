import { useState } from "react";
import "./signup.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  }

  const handleUser = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch('http://localhost:3000/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      console.log("after geting token",response.token);

      const data = await response.json();
      
      if (response.ok) {
        console.log(response.ok, "Signup successful!");
        navigate('/');
      } else {
        console.log("Signup failed:", data.message);
      }
    } catch (err) {
      console.error("register:", err.message);
    }
  }

  return (
    <>
      <form action="/signup" method="post" className="sign-form" onSubmit={handleUser}>
        <h2 className="inputs">Sign Up</h2>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handlechange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handlechange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handlechange}
          placeholder="Password"
        />
        <p className="inputs">
          Already have an account? <a href="/login">Log in</a>
        </p>
        <button type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Signup;

