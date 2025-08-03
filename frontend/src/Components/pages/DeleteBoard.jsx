import { useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { useMutation } from 'react-query';
import "./deleteboard.css";
import api from "../../API/api";
import { toast } from "react-toastify";

const DeleteBoardModal = () => {
  const navigate = useNavigate();
  const { refetchUser } = useContext(AuthContext);
  const location = useLocation();
  const boardId = location.state?.boardId;

  const deleteBoard = useMutation({
    mutationFn: ({ id }) => api.deleteBoard(id),
    onSuccess: () => {
      toast.success("Board deleted successfully!", {
        position: "top-right",
        autoClose: 1200,
        theme: "dark",
      });
      refetchUser();
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
    <div className='delete-board-modal-overlay'>
      <form
        className='delete-board-modal'
        onSubmit={(e) => {
          e.preventDefault();
          deleteBoard.mutate({ id: boardId });
        }}
      >
        <h2 className='delete-board-title'>Delete Board</h2>
        <p className='delete-board-message'>Do you really want to delete the board?</p>
        <div className="delete-board-actions">
          <button type="submit" className="delete-board-button confirm">
            Yes
          </button>
          <button
            type="button"
            className="delete-board-button cancel"
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
