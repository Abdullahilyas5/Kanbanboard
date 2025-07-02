import { useContext, useState } from "react";
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/Authcontext.jsx";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { Authref } = useContext(AuthContext);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  }


  const handlecancle = () => {
      
      navigate('/signup');
      if (Authref.current === true) {
        navigate(-1);
      }
    
  };

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


      const data = await response.json();
      console.log("frontend error",data.message )
      console.log("after geting token", data.token);
      if (!data.token) {
        console.log("token is not having at signup page");
        return;
      }
      Authref.current = true;

      if (response.ok) {
        console.log(response.ok, "Signup successful!");

      } else {
        console.log("Signup failed:", data.message);

      }

      navigate('/');

    } catch (err) {
      console.error("register:", err.message);
    }
  }

  return (
    <div className="parent">
      <form action="/signup" method="post" className="sign-form" onSubmit={handleUser}>
        <i className="ri-close-line cancle" onClick={handlecancle}></i>

        <h2 className="signin-title">Sign Up</h2>

        <div className="input-box">
          <label htmlFor="name-input">Name</label>
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
          Already have an account? <a onClick={() => {
            navigate("/login")
          }}>Log in</a>
        </p>
        <button type="submit" className="signin-btn">
          Sign Up
        </button>
      </form>
      <div className="form-closer" onClick={handlecancle}></div>

    </div>
  );
}

export default Signup;

