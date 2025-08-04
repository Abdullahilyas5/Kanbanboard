import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";
import "./Header.css";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { siderbarRef, headerRef } = useContext(AuthContext);

  const handleNavigate = (path) => navigate(path);

  return (
    <div className={`header-container ${siderbarRef ? 'sidebar' : 'non-sidebar'}`} ref={headerRef}>
      <div className="header-left">
        <h3 className="title-text">{title}</h3>
      </div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => handleNavigate('/create-Task' , { replace: true })}>
          + Add Task
        </button>
        <button className="btn btn-danger" onClick={handleNavigate('/logout' , { replace: true })}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
