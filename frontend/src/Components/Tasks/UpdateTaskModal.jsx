import { useRef, useState } from "react";
import { useMutation } from "react-query";
import api from "../../API/api.js";
import "./create-task.css";
import { RiCloseLine } from "react-icons/ri";

const UpdateTaskModal = ({ open, onClose, task, onUpdated }) => {
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    subtasks: task.subtasks.map((st) => ({ ...st })), // clone
    status: task.status,
  });
  const [subtasksUI, setSubtasksUI] = useState(
    task.subtasks.map((st) => ({ ...st }))
  );
  const [showSubInput, setShowSubInput] = useState(false);
  const subInputRef = useRef(null);

  const mutation = useMutation(
    (data) => api.updateTask(task._id, data),
    {
      onSuccess: (res) => {
        onUpdated(res.data.task);
        onClose();
      },
      onError: (error) => {
        alert("Failed to update task. Please try again.");
      },
    }
  );

  const subtaskMutation = useMutation(
    ({ subtaskId, isCompleted }) => api.updateSubtask(task._id, subtaskId, { isCompleted }),
    {
      onSuccess: (res) => {
        onUpdated(res.data.task);
      },
      onError: (error) => {
        alert("Failed to update subtask. Please try again.");
      },
    }
  );

  const handleAddSubtask = () => {
    if (subtasksUI.length >= 3) return;
    setShowSubInput(true);
    setTimeout(() => subInputRef.current?.focus(), 50);
  };

  const handleSubtaskEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = subInputRef.current?.value?.trim();
      if (!value) return;
      const subtaskObject = { title: value, isCompleted: false };
      setSubtasksUI((prev) => [...prev, subtaskObject]);
      setTaskData((prev) => ({
        ...prev,
        subtasks: [...prev.subtasks, subtaskObject],
      }));
      subInputRef.current.value = "";
      setShowSubInput(false);
    }
  };

  const handleRemoveSubtask = (index) => {
    const updatedUI = subtasksUI.filter((_, i) => i !== index);
    const updatedData = taskData.subtasks.filter((_, i) => i !== index);
    setSubtasksUI(updatedUI);
    setTaskData((prev) => ({ ...prev, subtasks: updatedData }));
  };

  const handleSubtaskCompletionToggle = (subtaskId, isCompleted) => {
    subtaskMutation.mutate({ subtaskId, isCompleted: !isCompleted });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return alert("Title is required.");
    mutation.mutate(taskData);
  };

  if (!open) return null;

  return (
    <div className="form-overlay">
      <div className="task-modal">
        <form className="task-form" onSubmit={handleFormSubmit}>
          <RiCloseLine
            className="modal-close-btn"
            onClick={onClose}
            size={24}
            title="Close"
          />
          <h2 className="modal-title">Update Task</h2>
          <label className="input-label">Title</label>
          <input
            type="text"
            className="task-input"
            name="title"
            value={taskData.title}
            placeholder="Title"
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
          <label className="input-label">Description</label>
          <input
            type="text"
            className="task-input description-input"
            name="description"
            value={taskData.description}
            placeholder="Description"
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
          <label className="input-label">Subtasks</label>
          <div className="subtask-section">
            <ul className="subtask-list">
              {subtasksUI.map((subtask, idx) => (
                <li key={subtask._id || idx} className="subtask-item">
                  <span
                    onClick={() => handleSubtaskCompletionToggle(subtask._id, subtask.isCompleted)}
                    style={{ textDecoration: subtask.isCompleted ? "line-through" : "none", cursor: "pointer" }}
                  >
                    {subtask.title}
                  </span>
                  <RiCloseLine
                    className="subtask-delete-icon"
                    onClick={() => handleRemoveSubtask(idx)}
                    title="Delete subtask"
                    size={18}
                  />
                </li>
              ))}
            </ul>
            {showSubInput && (
              <div className="subtask-input-wrapper">
                <input
                  type="text"
                  placeholder="Mention subtask"
                  className="subtask-input"
                  ref={subInputRef}
                  onKeyDown={handleSubtaskEnter}
                />
              </div>
            )}
          </div>
          {subtasksUI.length < 3 && (
            <button type="button" className="task-button" onClick={handleAddSubtask}>
              + Add New Subtask
            </button>
          )}
          <label className="input-label">Status</label>
          <select
            className="status-select"
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            name="status"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <button type="submit" className="submit-button">
            {mutation.isLoading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;