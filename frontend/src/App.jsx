import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./Components/Boards.jsx";
import "./App.css";
import Header from "./Components/Header.jsx";
import Signup from "./Components/pages/Signup.jsx";
import Login from "./Components/pages/login.jsx";
import Boarddata from "./Components/pages/boarddata.jsx";
import Columns from "./Components/columns/Columns.jsx";
import CreateTask from "./Components/Tasks/create-task";

const App = () => {
  const [title, settitle] = useState('platform');
  const [tasks, setTasks] = useState([
    { id: 1, title: "db course", status: "todo" },
    { id: 2, title: "react course", status: "todo" },
    { id: 3, title: "db course", status: "doing" },
    { id: 4, title: "react course", status: "doing" },
    { id: 5, title: "db course", status: "done" },
    { id: 6, title: "react course", status: "done" }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
        const newIndex = prevTasks.findIndex((task) => task.id === over.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }

    const activeTask = tasks.find(task => task.id === active.id);
    const overTask = tasks.find(task => task.id === over.id);

    if (activeTask && overTask && activeTask.status !== overTask.status) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === active.id ? { ...task, status: overTask.status } : task
        )
      );
    }
  };

  return (
    <BrowserRouter>
      <div className="Main">
        <div className="title">
          <i className="ri-align-justify fa"></i>
          <h2 className="logo">kanban</h2>
        </div>

        <div className="sideBoard">
          <Boards settitle={settitle} />
        </div>
      </div>
      <Routes>
        <Route path="/create-tasks" element={<CreateTask />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-board" element={<Boarddata />} />
      </Routes>
      <Header title={title} />
      

        

          <div className="Task-block">
            <Columns title="Todo" tasks={tasks.filter(task => task.status === "todo")} iconcolor="#4CC1E5" />
            <Columns title="Doing" tasks={tasks.filter(task => task.status === "doing")} iconcolor="#8370EE" />
            <Columns title="Done" tasks={tasks.filter(task => task.status === "done")} iconcolor="#6CDDAC" />
          </div>

    </BrowserRouter>
  );
};

export default App;

