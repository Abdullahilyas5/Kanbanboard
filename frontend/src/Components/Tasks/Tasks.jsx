import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "./Task.css";
import { useNavigate } from "react-router-dom";

const Tasks = ({ task, onClick, dragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: task._id });

  const navigate = useNavigate();

  const completedCount = (task.subtasks || []).filter((st) => !!st.completed).length;

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: "grab",
    position: isDragging ? "absolute" : "relative",
    opacity: isDragging || dragging ? 0.6 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleDoubleClick = () => {
    navigate("/task-Details", { state: { task } });
  };

  return (
    <div className="task-container-wrapper">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="task-container"
        onDoubleClick={handleDoubleClick}
        onClick={onClick}
      >
        <h3>{task.title}</h3>
        <div className="task-container-details">
          <p>
            {completedCount} of {(task.subtasks || []).length} subtasks completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
