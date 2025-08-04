import React from "react";
import "./DeleteTaskModal.css";

const DeleteTaskModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="dtm-modal-overlay">
      <form
        className="dtm-modal"
        onSubmit={e => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <h2 className="dtm-title">Delete Task</h2>
        <h3 className="dtm-message">
          Do you really want to delete this task?
        </h3>
        <div className="dtm-actions">
          <button className="dtm-button confirm" type="submit">
            Yes
          </button>
          <button className="dtm-button cancel" type="button" onClick={onClose}>
            No
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteTaskModal;
