import { Children, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Boards from "./Components/Boards.jsx";
import "./App.css";
import Header from "./Components/Header.jsx";
import Signup from "./Components/pages/Signup.jsx";
import Login from "./Components/pages/login.jsx";
import Boarddata from "./Components/pages/boarddata.jsx";
import Columns from "./Components/columns/Columns.jsx";
import CreateTask from "./Components/Tasks/create-task";
import ViewTask from "./Components/pages/viewtask.jsx";
import { AuthContext } from './context/Authcontext.jsx'
import PrivateRoute from "./context/Privateroute.jsx";

const App = () => {
  const [title, settitle] = useState('');
  const [board, setBoard] = useState([]);
  const UserAuthorize = useContext(AuthContext);

  const navigate = useNavigate();

  console.log("current val: ", UserAuthorize.isauthorize);

  useEffect(() => {
    console.log("selected board id is : ", UserAuthorize.selectedBoard);
  }, [UserAuthorize.selectedBoard]);

  const fetchonload = async () => {


    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 401 && userAuthorize.secureSetAuth === false) {
        console.log("unauthorized user");
        UserAuthorize.setisauthorize(false);
        navigate('/signup');
        return;
      }


      const data = await response.json();
      console.log("data from home route : ", data);
      console.log("data from home route", board.tasks);

      setBoard(data.boards)
      UserAuthorize.setisauthorize(data.isauthorize)
      UserAuthorize.secureSetAuth(data.isauthorize)
    } catch (error) {

      console.log(" content load error : ", error.message);

    }
  };

  
  








  useEffect(() => {
    fetchonload();
  }, []);


  const [tasks, setTasks] = useState([
    { id: 1, title: "db course", status: "todo" },
    { id: 2, title: "react course", status: "todo" },
    { id: 3, title: "db course", status: "doing" },
    { id: 4, title: "react course", status: "doing" },
    { id: 5, title: "db course", status: "done" },
    { id: 6, title: "react course", status: "done" },
    { id: 7, title: "db course", status: "todo" },
    { id: 8, title: "react course", status: "todo" },
    { id: 9, title: "db course", status: "doing" },
    { id: 10, title: "react course", status: "doing" },
    { id: 11, title: "db course", status: "done" },
    { id: 12, title: "react course", status: "done" },
    { id: 13, title: "db course", status: "todo" },
    { id: 14, title: "react course", status: "done" }
  ]);


  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   if (!over) return;

  //   if (active.id !== over.id) {
  //     setTasks((prevTasks) => {
  //       const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
  //       const newIndex = prevTasks.findIndex((task) => task.id === over.id);
  //       return arrayMove(prevTasks, oldIndex, newIndex);
  //     });
  //   }

  //   const activeTask = tasks.find(task => task.id === active.id);
  //   const overTask = tasks.find(task => task.id === over.id);

  //   if (activeTask && overTask && activeTask.status !== overTask.status) {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === active.id ? { ...task, status: overTask.status } : task
  //       )
  //     );
  //   }
  // };

  return (
    <div className="wrapper">


        <div className="Main">
          <div className="title">
            <i className="ri-align-justify fa"></i>
            <h2 className="logo">Kanban</h2>
          </div>

          <div className="sideBoard">
            <Boards settitle={settitle} Userboard={board} Usersetboard={setBoard} renderboard={fetchonload} />
          </div>
        </div>


        <Routes>

      
          <Route path="/viewtask" element={
            <PrivateRoute>
              <ViewTask />
            </PrivateRoute>
          } />
          <Route path="/create-tasks" element={

            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>

          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-board" element={
            <PrivateRoute>
              <Boarddata />
            </PrivateRoute>
          } />
        </Routes>
        <Header title={title} />

        <div className="Task-block">
          <Columns title="Todo" tasks={tasks.filter(task => task.status === "todo")} iconcolor="#4CC1E5" />
          <Columns title="Doing" tasks={tasks.filter(task => task.status === "doing")} iconcolor="#8370EE" />
          <Columns title="Done" tasks={tasks.filter(task => task.status === "done")} iconcolor="#6CDDAC" />
        </div>

    
    </div>

  );
};

export default App;

