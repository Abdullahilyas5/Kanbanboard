import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../../API/api";
import { AuthContext } from "../../context/Authcontext";
import { RiCloseLine } from "react-icons/ri";
import DeleteTaskModal from "./DeleteTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { toast } from "react-toastify";
import "./viewtask.css";

const ALLOWED_STATUSES = ["Todo", "Doing", "Done"];

const TaskDetails = () => {
  const { state } = useLocation();
  const { refetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setTasks, tasks } = useContext(AuthContext);
  const [task, setTask] = useState(state?.task);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const { mutate: updateSubtaskStatus } = useMutation({
    mutationFn: ({ taskId, subtaskId, completed }) =>
      api.checkboxUpdate(taskId, subtaskId, completed),
    onSuccess: (res) => {
      setTask(res.data.task);
      setTasks((prev) =>
        prev.map((t) => (t._id === res.data.task._id ? res.data.task : t))
      );
    },
    onError: (err) => {
      console.error("Subtask update failed", err.response?.data || err.message);
    },
  });

  const handleCheckboxChange = (subtaskId, completed) => {
    setTask((t) => ({
      ...t,
      subtasks: t.subtasks.map((st) =>
        st._id === subtaskId ? { ...st, completed } : st
      ),
    }));
    updateSubtaskStatus({ taskId: task._id, subtaskId, completed });
  };

  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: ({ taskId, status }) => api.statusUpdate(taskId, status),
    onSuccess: (res) => {
      setTask(res.data.task);
      setTasks((prev) =>
        prev.map((t) => (t._id === res.data.task._id ? res.data.task : t))
      );
    },
    onError: (err) =>
      console.error("Status update failed", err.response?.data || err.message),
  });

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (!ALLOWED_STATUSES.includes(newStatus)) return;
    setTask((t) => ({ ...t, status: newStatus }));
    updateTaskStatus({ taskId: task._id, status: newStatus });
  };

  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId) => api.deleteTask(taskId),
    onSuccess: () => {
      toast.success("Task deleted successfully!", {
        position: "bottom-right",
        autoClose: 1200,
        theme: "dark",
      });
      refetchUser?.();
      navigate("/homepage");
    },
    onError: () => {
      toast.error("Failed to delete task!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    },
  });

  const completedCount = (task.subtasks || []).filter((st) => st.completed).length;

  // Close modal when clicking outside content
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("td-overlay")) {
      navigate("/homepage");
    }
  };

  return (
    <div className="td-overlay" onClick={handleOverlayClick}>
      {!showDelete && !showUpdate && (
        <div className="td-modal">
          <div className="td-header">
            <h3 className="td-title">{task.title}</h3>
            <RiCloseLine
              className="td-close-icon"
              onClick={() => navigate("/homepage")}
              size={24}
              title="Close"
            />
          </div>

          <p className="td-description">{task.description}</p>

          <div className="td-subtasks">
            {task.subtasks.length > 0 && (
              <h4 className="td-subtasks-heading">
                Subtasks ({completedCount} of {task.subtasks.length})
              </h4>
            )}
            {task.subtasks.map((sub) => (
              <label
                key={sub._id}
                className={`td-subtask-label ${sub.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={sub.completed}
                  onChange={() => handleCheckboxChange(sub._id, !sub.completed)}
                />
                <span className="td-subtask-title">{sub.title}</span>
              </label>
            ))}
          </div>

          <select
            className="td-status-select"
            value={task.status}
            onChange={handleStatusChange}
          >
            {ALLOWED_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="td-actions">
            <button
              className="td-btn td-update-btn"
              onClick={() => setShowUpdate(true)}
            >
              Update
            </button>
            <button
              className="td-btn td-delete-btn"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <DeleteTaskModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteTask(task._id)}
      />
      <UpdateTaskModal
        open={showUpdate}
        onClose={() => setShowUpdate(false)}
        task={task}
        onUpdated={(updated) => {
          setTask(updated);
          refetchUser?.();
        }}
      />
    </div>
  );
};

export default TaskDetails;
