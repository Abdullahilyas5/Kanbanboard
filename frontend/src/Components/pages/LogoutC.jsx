import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css';
import { useMutation } from "react-query";
import { logout } from "../../API/api.js"; // Correct path

const Logout = () => {
  const navigate = useNavigate();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      // Optionally clear user context/state here
      navigate('/login'); // Redirect to login after logout
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleLogout = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <div className='logout-page'>
      <form className='logout-form' onSubmit={handleLogout}>
        <h3 className='logout-title'>Logout</h3>
        <p>Do you want to logout from <span>Kanban board</span>?</p>
        <div className='logout-btns'>
          <button type="submit" disabled={logoutMutation.isLoading}>Yes</button>
          <button type="button" onClick={() => navigate('/')}>No</button>
        </div>
        {logoutMutation.isError && (
          <div className="logout-error">
            Error logging out. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};