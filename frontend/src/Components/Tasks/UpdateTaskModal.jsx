import { useRef, useState } from "react";
import { useMutation } from "react-query";
import api from "../../API/api.js";
import "./UpdateTaskModal.css";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";

const UpdateTaskModal = ({ open, onClose, task, onUpdated }) => {
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    subtasks: task.subtasks.map((st) => ({ ...st })), // clone subtasks
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
        toast.success("Task updated successfully!", {
          position: "top-right",
          autoClose: 1200,
          theme: "dark",
        });
        onUpdated(res.data.task);
        onClose();
      },
      onError: () => {
        toast.error("Failed to update task!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      },
    }
  );

  const subtaskMutation = useMutation(
    ({ subtaskId, isCompleted }) =>
      api.updateSubtask(task._id, subtaskId, { isCompleted }),
    {
      onSuccess: (res) => {
        onUpdated(res.data.task);
      },
      onError: () => {
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
    <div className="utm-overlay">
      <div className="utm-modal">
        <form className="utm-form" onSubmit={handleFormSubmit}>
          <RiCloseLine
            className="utm-close-btn"
            onClick={onClose}
            size={24}
            title="Close"
          />
          <h2 className="utm-title">Update Task</h2>

          <label className="utm-input-label">Title</label>
          <input
            type="text"
            className="utm-text-input"
            name="title"
            value={taskData.title}
            placeholder="Title"
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />

          <label className="utm-input-label">Description</label>
          <input
            type="text"
            className="utm-text-input utm-description-input"
            name="description"
            value={taskData.description}
            placeholder="Description"
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />

          <label className="utm-input-label">Subtasks</label>
          <div className="utm-subtask-section">
            <ul className="utm-subtask-list">
              {subtasksUI.map((subtask, idx) => (
                <li
                  key={subtask._id || idx}
                  className={`utm-subtask-item ${
                    subtask.isCompleted ? "completed" : ""
                  }`}
                >
                  <span
                    onClick={() =>
                      handleSubtaskCompletionToggle(subtask._id, subtask.isCompleted)
                    }
                  >
                    {subtask.title}
                  </span>
                  <RiCloseLine
                    className="utm-subtask-delete-icon"
                    onClick={() => handleRemoveSubtask(idx)}
                    title="Delete subtask"
                    size={18}
                  />
                </li>
              ))}
            </ul>
            {showSubInput && (
              <div className="utm-subtask-input-wrapper">
                <input
                  type="text"
                  placeholder="Mention subtask"
                  className="utm-subtask-input"
                  ref={subInputRef}
                  onKeyDown={handleSubtaskEnter}
                />
              </div>
            )}
          </div>

          {subtasksUI.length < 3 && (
            <button
              type="button"
              className="utm-add-subtask-btn"
              onClick={handleAddSubtask}
            >
              + Add New Subtask
            </button>
          )}

          <label className="utm-input-label">Status</label>
          <select
            className="utm-status-select"
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            name="status"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <button
            type="submit"
            className="utm-submit-btn"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
