import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../API/api.js";
import "./create-task.css";

import { RiCloseLine } from "react-icons/ri";
import { AuthContext } from "../../context/Authcontext.jsx";

const CreateTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedBoard, refetchUser } = useContext(AuthContext);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    subtasks: [],
    status: "Todo",
  });

  const [subtasksUI, setSubtasksUI] = useState([]);
  const [showSubInput, setShowSubInput] = useState(false);
  const subInputRef = useRef(null);
  const formRef = useRef(null);

  const mutation = useMutation(
    ({ taskData, selectedBoard }) => api.createTask(taskData, selectedBoard),
    {
      onSuccess: (res) => {
        toast.success("Task created successfully!", {
          position: "top-right",
          autoClose: 1200,
          theme: "dark",
        });
        queryClient.invalidateQueries("tasks");
        setTaskData({ title: "", description: "", subtasks: [], status: "Todo" });
        setSubtasksUI([]);
        refetchUser();
        navigate("/homepage");
      },
      onError: (error) => {
        toast.error("Failed to create task!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
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

      const subtaskObject = { title: value, completed: false };

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedBoard) {
     toast.error("Please select a board first.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",  
      });
      navigate("/homepage", { replace: true });
    }

    if (!taskData.title.trim()) return alert("Title is required.");
    mutation.mutate({ taskData, selectedBoard }); // selectedBoard is the ID string
  };


  const handleEnterKey = (e, currentField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const formElements = [...formRef.current.elements];
      console.log(formElements);
      const index = formElements.findIndex((el) => el.name === currentField);
      if (index >= 0 && index < formElements.length - 1) {
        const nextElement = formElements[index + 1];
        nextElement?.focus();
        console.log("Focused on next element:", nextElement?.focus());
      } else {
        handleFormSubmit(e);
      }
    }
  };

  return (
    <div className="form-overlay">
      <div className="task-modal">
        <form className="task-form" onSubmit={handleFormSubmit} ref={formRef}>
          <RiCloseLine
            className="modal-close-btn"
            onClick={() => navigate("/homepage")}
            size={24}
            title="Close"
          />

          <h2 className="modal-title">Add New Task</h2>

          <label className="input-label">Title</label>
          <input
            type="text"
            className="task-input"
            name="title"
            value={taskData.title}
            placeholder="Title"
            autoFocus
            required
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            onKeyDown={(e) => handleEnterKey(e, "title")}
          />

          <label className="input-label">Description</label>
          <input
            type="text"
            className="task-input description-input"
            name="description"
            value={taskData.description}
            placeholder="Description"
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            onKeyDown={(e) => handleEnterKey(e, "description")}
          />

          <label className="input-label">Subtasks</label>
          <div className="subtask-section">
            <ul className="subtask-list">
              {subtasksUI.map((subtask, idx) => (
                <li key={idx} className="subtask-item">
                  <span>{subtask.title}</span>
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
            onKeyDown={(e) => handleEnterKey(e, "status")}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <button type="submit" className="submit-button">
            {mutation.isLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
