import React, { useContext } from "react";
import "./BoardCard.css";
import { AuthContext } from "../context/Authcontext.jsx";
import { useMutation, useQueryClient } from "react-query";
import api from "../API/api.js";

function BoardCard({ key, id, title, handletitle }) {
  const { board, setSelectedBoard, settask } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const createBoardMutation = useMutation(api.createBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });

  function handlenewtitle() {
    handletitle(title);
    setSelectedBoard(id);

    const selected = board.find((b) => b._id === id);
    if (selected) {
      settask(selected.tasks);
    }
  }

  // Example usage for creating a board:
  // createBoardMutation.mutate({ title: "New Board" });

  return (
    <div className="btn-in">
      <i className="ri-dashboard-line"></i>
      <button className="btn-2" key={key} id={id} onClick={handlenewtitle}>
        {title}
      </button>
    </div>
  );
}

export default BoardCard;
