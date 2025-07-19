import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";
import "./Header.css";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { siderbarRef , headerRef } = useContext(AuthContext);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={` header ${siderbarRef ? 'sidebar' : 'non-sidebar'}`} ref={headerRef}>
      <h3 className="board-title">{title}</h3>

      <div className="blockmenu">
        <button className="add-btn btn" onClick={() => handleNavigate('/create-tasks')}>
          + Add Task
        </button>

        <button className="logout btn" onClick={() => handleNavigate('/logout')}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default Header;
