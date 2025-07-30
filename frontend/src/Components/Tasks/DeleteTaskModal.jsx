import React from "react";
import "../pages/deleteboard.css";

const DeleteTaskModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="delete-form-wrapper">
      <form className="delete-form" onSubmit={e => { e.preventDefault(); onConfirm(); }}>
        <h2 className="delete-board-title">Delete Task</h2>
        <h3 className="delete-board-paragraph">Do you really want to delete this task?</h3>
        <div className="dialog-btn">
          <button className="delete-btn" type="submit">Yes</button>
          <button className="delete-btn" type="button" onClick={onClose}>No</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteTaskModal;