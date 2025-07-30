import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../../API/api";
import { AuthContext } from "../../context/Authcontext";
import { RiCloseLine } from "react-icons/ri";
import DeleteTaskModal from "./DeleteTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import "./viewtask.css";

const ALLOWED_STATUSES = ["Todo", "Doing", "Done"];

const TaskDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { refetchUser } = useContext(AuthContext);
  const [task, setTask] = useState(state?.task);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  // — Subtask checkbox mutation (optimistic + PATCH) —
  const { mutate: updateSubtaskStatus } = useMutation({
    mutationFn: ({ taskId, subtaskId, completed }) =>
      api.checkboxUpdate(taskId, subtaskId, completed),
    onSuccess: (res) => {
      setTask(res.data.task);
      refetchUser?.();
    },
    onError: (err) => console.error("Subtask update failed", err.response?.data || err.message),
  });

  const handleCheckboxChange = (subtaskId, completed) => {
    // optimistic UI
    setTask((t) => ({
      ...t,
      subtasks: t.subtasks.map((st) =>
        st._id === subtaskId ? { ...st, completed } : st
      ),
    }));
    updateSubtaskStatus({ taskId: task._id, subtaskId, completed });
  };

  // — Status dropdown mutation (PATCH) —
  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: ({ taskId, status }) => api.statusUpdate(taskId, status),
    onSuccess: (res) => {
      setTask(res.data.task);
      refetchUser?.();
    },
    onError: (err) => console.error("Status update failed", err.response?.data || err.message),
  });

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (!ALLOWED_STATUSES.includes(newStatus)) return;
    setTask((t) => ({ ...t, status: newStatus })); // Optimistic UI update
    updateTaskStatus({ taskId: task._id, status: newStatus });
  };

  // — Delete task mutation —
  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId) => api.deleteTask(taskId),
    onSuccess: () => {
      refetchUser?.();
      navigate("/homepage");
    },
    onError: (err) => console.error("Task delete failed", err),
  });

  const completedCount = (task.subtasks || []).filter((st) => st.completed).length;

  return (
    <div className="wrapper-form-create-board">
      {!showDelete && !showUpdate && (
        <div className="wrapper-first-half">
          <div className="board-details-header">
            <h3 className="task-details-heading">{task.title}</h3>
            <RiCloseLine
              className="toggle-icon-details"
              onClick={() => navigate("/homepage")}
              size={24}
              title="Close"
            />
          </div>

          <p className="task-details-desc">{task.description}</p>

          <div className="subtask-section">
            <h3 className="subtask-heading">
              Subtasks ({completedCount} of {task.subtasks.length})
            </h3>
            {task.subtasks.map((sub) => (
              <label
                key={sub._id}
                className={`subtask-checkbox ${sub.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={sub.completed}
                  onChange={() => handleCheckboxChange(sub._id, !sub.completed)}
                />
                <span className="subtask-title">{sub.title}</span>
              </label>
            ))}
          </div>

          <select
            className="action-status"
            value={task.status}
            onChange={handleStatusChange}
          >
            {ALLOWED_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="task-actions">
            <button className="btn action-update-btn" onClick={() => setShowUpdate(true)}>
              Update
            </button>
            <button className="btn delete-btn" onClick={() => setShowDelete(true)}>
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="cancle-box" onClick={() => navigate("/homepage")} />

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
