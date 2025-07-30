import React, { useContext, useState } from "react";
import "./Columns.css";
import Tasks from "../Tasks/Tasks";
import { AuthContext } from "../../context/Authcontext.jsx";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import api from "../../API/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const { tasks, setTasks } = useContext(AuthContext);
  const [activeTask, setActiveTask] = useState(null);
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor));

  const { mutate: updateTaskStatus } = useMutation(
    ({ id, status }) => api.statusUpdate(id, status),
    {
      onError: (error) => console.error("Failed to update task status:", error),
      onSuccess: (data) => console.log("Task status updated successfully:", data),
    }
  );

  const handleDragStart = ({ active }) => {
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task || null);
  };

  // Map column id to backend status
  const COLUMN_STATUS_MAP = {
    todo: "Todo",
    doing: "Doing",
    done: "Done",
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const targetColumn = over?.id;

    const draggedTask = tasks.find((t) => t._id === taskId);
    if (!draggedTask) return;

    const fromColumn = draggedTask.status;
    const toColumn = COLUMN_STATUS_MAP[targetColumn]; // <-- Map to correct status

    // If same column, reorder using arrayMove
    if (fromColumn === toColumn) {
      const columnTasks = tasks.filter((t) => t.status === fromColumn);
      const oldIndex = columnTasks.findIndex((t) => t._id === active.id);
      const newIndex = columnTasks.findIndex((t) => t._id === over.id);

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      const updated = [
        ...tasks.filter((t) => t.status !== fromColumn),
        ...reordered,
      ];
      setTasks(updated);
    } else if (toColumn) {
      // Cross-column move
      const updatedTasks = tasks.map((t) =>
        t._id === taskId ? { ...t, status: toColumn } : t
      );
      setTasks(updatedTasks);
      updateTaskStatus({ id: taskId, status: toColumn });
    }
  };

  const handleTaskClick = (task) => {
    navigate("/task-Details", { state: { task } });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="columns">
        {["todo", "doing", "done"].map((status) => {
          const filtered = tasks.filter(
            (task) => (task.status || "").toLowerCase() === status
          );
          return (
            <Column
              key={status}
              id={status}
              title={COLUMN_STATUS_MAP[status].toUpperCase()}
              iconcolor={
                status === "todo"
                  ? "#4CC1E5"
                  : status === "doing"
                  ? "#8370EE"
                  : "#6CDDAC"
              }
              tasks={filtered}
              onTaskClick={handleTaskClick}
            />
          );
        })}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <Tasks task={activeTask} dragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const Column = ({ id, title, tasks, iconcolor, onTaskClick }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="column" ref={setNodeRef}>
      <div className="top">
        <i
          className="ri-checkbox-blank-circle-fill"
          style={{ color: iconcolor }}
        ></i>
        <p>
          {title} ({tasks.length})
        </p>
      </div>
      <div className="tasksqueue">
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <Tasks
              key={task._id}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Columns;
