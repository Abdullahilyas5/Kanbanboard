import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../../API/api.js";

const Logout = () => {
  const navigate = useNavigate();
  const mutation = useMutation(() => api.logout(), {
    onSuccess: () => {
      navigate("/login", { replace: true });
      localStorage.removeItem("token");
      console.log("Logout successful");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error(`Logout failed. Please try again.${error}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    },
  });

  const handleLogout = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="logout__overlay">
      <form className="logout__dialog" onSubmit={handleLogout}>
        <h3 className="logout__title">Logout</h3>
        <p className="logout__message">
          Do you want to logout from <strong>Kanban Board</strong>?
        </p>
        <div className="logout__buttons">
          <button
            type="submit"
            className="logout__btn"
            disabled={mutation.isLoading}
          >
            Yes
          </button>
          <button
            type="button"
            className="logout__btn" 
            onClick={() => navigate("/")} 
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
};

export default Logout;
