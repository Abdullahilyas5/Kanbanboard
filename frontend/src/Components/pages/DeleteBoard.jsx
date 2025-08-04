import { useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Authcontext';
import api from "../../API/api";
import "./delete-board.css";

const DeleteBoardModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refetchUser } = useContext(AuthContext);
  const boardId = location.state?.boardId;

  const deleteBoard = useMutation({
    mutationFn: ({ id }) => api.deleteBoard(id),
    onSuccess: () => {
      toast.success("Board deleted successfully!", {
        position: "top-right",
        autoClose: 1200,
        theme: "dark",
      });
      refetchUser?.();
      navigate("/homepage");
    },
    onError: (error) => {
      toast.error("Failed to delete board!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      console.error("Deletion error:", error.response?.data || error.message);
    },
  });

  return (
    <div className="modal-overlay">
      <form
        className="modal-box"
        onSubmit={(e) => {
          e.preventDefault();
          deleteBoard.mutate({ id: boardId });
        }}
      >
        <h2 className="modal-title">Delete Board</h2>
        <p className="modal-message">Do you really want to delete the board?</p>
        <div className="modal-actions">
          <button type="submit" className="modal-btn modal-confirm">
            Yes
          </button>
          
          <button
            type="button"
            className="modal-btn modal-cancel"
            onClick={() => navigate('/homepage')}
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteBoardModal;
