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
import PrivateRoute from './context/Privateroute.jsx'
import {useLocation} from 'react-router-dom'

const App = () => {
  const [title, settitle] = useState('');

  const UserAuthorize = useContext(AuthContext);
  const { board, setBoard ,task,refresh ,setrefresh , settask ,user ,setuser } = useContext(AuthContext);
  const navigate = useNavigate();
  
// const location = useLocation();
// const {refresh} = location?.state?.refresh || false;



  // useEffect(() => {
  //   fetchonload();
  //   console.log("selected board id is : ", UserAuthorize.selectedBoard);
  // }, [UserAuthorize.selectedBoard , board]);

  const fetchonload = async () => {


    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        // withCredentials: true
      });

      const fetchdata = await response.json()

      if (fetchdata.error) {
        UserAuthorize.Authref.current = false;
        navigate('/signup')
      }

      

      if (!fetchdata.token) {
        console.log("token is not having at homeroute")
      }


      setuser(fetchdata.user);
      UserAuthorize.Authref.current = true;
      console.log("data from home route : ", fetchdata);
      setBoard(fetchdata.boards)
      
    } catch (error) {
      console.log(" content load error : ", error.message);

    }
  };

  useEffect(() => {
    fetchonload();
  }, [refresh]);


  const [tasks, setTasks] = useState(task);


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

      {/* <PrivateRoute> */}


      <div className="Main">
        <div className="title">
          <i className="ri-align-justify fa"></i>
          <h2 className="logo">Kanban</h2>
        </div>

        <div className="sideBoard">
          <Boards settitle={settitle}  Usersetboard={setBoard} />
        </div>
      </div>


      <Routes>


        <Route path="/viewtask" element={

          <ViewTask />
        } />
        <Route path="/create-tasks" element={
          <CreateTask />
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-board" element={

          <Boarddata />

        } />
      </Routes>
      <Header title={title} />

      <div className="Task-block">
        <Columns title="Todo" tasks={tasks.filter(task => task.status === "todo")} iconcolor="#4CC1E5" />
        <Columns title="Doing" tasks={tasks.filter(task => task.status === "doing")} iconcolor="#8370EE" />
        <Columns title="Done" tasks={tasks.filter(task => task.status === "done")} iconcolor="#6CDDAC" />
      </div>

      {/* </PrivateRoute> */}


    </div>

  );
};

export default App;

