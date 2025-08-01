import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";
import api from "../../API/api.js";
import "../pages/deleteboard.css";
import { AuthContext } from '../../context/Authcontext.jsx';

const LogoutConfirmation = () => {
  const navigate = useNavigate();
  const {refetchUser} = useContext(AuthContext)

  const logoutMutation = useMutation(api.logout, {
    onSuccess: () => {
      localStorage.removeItem("token");
      refetchUser();
    },
    onError: () => {
      alert("Logout failed. Please try again.");
    }
  });

  const handleLogout = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <div className="delete-form-wrapper">
      <form className="delete-form" onSubmit={handleLogout}>
        <h2 className="delete-board-title">Logout</h2>
        <h3 className="delete-board-paragraph">Are you sure you want to logout?</h3>
        <div className="dialog-btn">
          <button className="delete-btn" type="submit" disabled={logoutMutation.isLoading}>
            Yes
          </button>
          <button
            className="delete-btn cancel-btn"
            type="button"
            onClick={() => navigate('/homepage')}
            disabled={logoutMutation.isLoading}
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogoutConfirmation;