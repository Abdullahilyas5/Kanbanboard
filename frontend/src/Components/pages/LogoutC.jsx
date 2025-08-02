// Logout.jsx
import React from "react";
import "./logout.css";   // or "./logout.css"
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../../API/api.js";

const Logout = () => {
  const navigate = useNavigate();
  const mutation = useMutation(() => api.logout(), {
    onSuccess: () => navigate("/login"),
  });

  const handleLogout = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className={styles.logout__overlay}>
      <form className={styles.logout__dialog} onSubmit={handleLogout}>
        <h3 className={styles.logout__title}>Logout</h3>
        <p className={styles.logout__message}>
          Do you want to logout from <strong>Kanban Board</strong>?
        </p>
        <div className={styles.logout__buttons}>
          <button
            type="submit"
            className={styles.logout__btn}
            disabled={mutation.isLoading}
          >
            Yes
          </button>
          <button
            type="button"
            className={styles.logout__btn}
            onClick={() => navigate("/")}
          >
            No
          </button>
        </div>
        {mutation.isError && (
          <p className={styles.logout__error}>
            Error logging out. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default Logout;
