import React, { useContext } from "react";
import "./BoardCard.css";
import { AuthContext } from "../context/Authcontext.jsx";

function BoardCard(props) {
  const {
    board,
    setSelectedBoard,
    settask
  } = useContext(AuthContext);

  // ✅ Called when board button is clicked
  function handlenewtitle() {
    props.handletitle(props.title);        // Set board title
    setSelectedBoard(props.id);            // Set selected board ID

    // ✅ Find the selected board from the context's board list
    const selected = board.find((b) => b._id === props.id);
    if (selected) {
      settask(selected.tasks);             // Set its tasks
    }
  }

  return (
    <div className="btn-in">
      <i className="ri-dashboard-line"></i>
      <button className="btn-2" onClick={handlenewtitle}>
        {props.title}
      </button>
    </div>
  );
}

export default BoardCard;
