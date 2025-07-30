import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";
import "./Header.css";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { siderbarRef, headerRef } = useContext(AuthContext);

  const handleNavigate = (path) => navigate(path);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div className={`header ${siderbarRef ? 'sidebar' : 'non-sidebar'}`} ref={headerRef}>
      <div className="header-left">
        <h3 className="board-title">{title}</h3>
      </div>
      <div className="blockmenu">
        <button className="add-btn header-btn" onClick={() => handleNavigate('/create-Task')}>
          + Add Task
        </button>
        <button className="logout header-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
