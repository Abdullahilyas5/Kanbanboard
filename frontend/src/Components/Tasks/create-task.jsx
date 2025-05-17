import { useRef, useState } from "react";
import "./create-task.css";
import { useNavigate } from "react-router";

const task = () => {
  const navigate = useNavigate();
  const [Task, setTask] = useState({
    title: "",
    description: "",
    subtasks: [],
    status: "Todo"
  }
  );

  const [addsub, setaddsub] = useState([]);
  const inputref = useRef(null);
  const [isVisible, setisVisible] = useState(true);
console.log("The add sub task value is ", Task)
  const handlesub = () => {
    const menu = document.querySelector(".content");
    setisVisible(true);
    if (menu.classList.contains("content")) {
      menu.classList.add("show");
      menu.style.display = "flex";
    }
  };

  const showmenu = () => {
    const menu = document.querySelector(".menu");
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      menu.style.display = "none";
    } else {
      menu.classList.add("show");
      menu.style.display = "flex";
    }
  };

  const handlecancle = () => {
    navigate(-1);
  };

   async function handleTaskSubmission(e) {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3000/createTask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(Task),
      })

      const data =  await response.json();

      if (response.ok) {
        console.log(response.ok, "task is created !");
      }

      setTask({
        title: "",
        description: "",
        subtasks: [],
        status: "Todo"
      })

      navigate('/')

      console.log(Task);
      
      
    } catch (error) {
      console.log(error);

    }
  }



  return (
    <>
    <div className="form-wrapper">
      <div className="parent">
        <form action="/createTask" method="post" className="task-form" onSubmit={handleTaskSubmission}>
          <h2>Add new task</h2>
          <i className="ri-close-line cancle" onClick={handlecancle}></i>
          <label>Title</label>
          <input
            className=" inputs"
            type="text"
            name="title"
            value={task.title}
            placeholder="Title"
            onChange={(e) => setTask({ ...Task, title: e.target.value })}
          />
          <label>Description</label>
          <input
            className="inputs dec"
            type="text"
            name="description"
            value={task.description}
            placeholder="Description"
            onChange={(e) => setTask({ ...Task, description: e.target.value })}
          />
          <label>Subtask</label>
          <div className="subtask">
            <ul>
              {addsub.map((subtask, index) => (
      
      
                <li key={index}>
                  {subtask.title}
                  <i className="ri-close-line" onClick={() => {
                    setaddsub((prev) => {
                      const array = prev.filter((_, i) => i !== index);
                      return array;
                    });
      
                    setTask((prevTask) => ({
                      ...prevTask,
                      subtasks: [...prevTask.subtasks, subtask[index].title],  // Adding clicked subtask
      
      
                    }));
                  }}></i>
                </li>
              ))}
            </ul>
            {isVisible && (
              <div className="content">
                <input
                  type="text"
                  placeholder=" mention subtask "
                  className="text"
                  autoFocus
      
                  ref={inputref}
                />
                <i
                  class="ri-check-line"
                  onClick={() => {
                    const elem = inputref.current;
                    console.log("elem is ", elem.value);
      
                    const value = elem?.value?.trim();
                    if (addsub.length < 3) {
                      if (inputref.current && inputref.current.value.trim() !== "") {
                        setaddsub((prev) =>
                          Array.isArray(prev)
                            ? [...prev, { title: elem.value }]
                            : [{ title: elem.value }]
                        );
                        setTask((prevTask) => ({
                          ...prevTask,
                          subtasks: [...prevTask.subtasks, value],
                        }));
                        setisVisible(false);
                        inputref.current.value = "";
                      }
                    } else {
                      document.querySelector(".content").style.display = "none";
                      return;
                    }
                  }}
                ></i>
              </div>
            )}
          </div>
          <button onClick={handlesub} type="button">
            + Add New Subtasks
          </button>
          <label>Status</label>
          <select name="menu" id="drop-down" className="menu">
            <option val="Todo">Todo</option>
            <option val="Doing">Doing</option>
            <option val="Done">Done</option>
          </select>
          <button type="submit" id="btn" >Create Task</button>
        </form>
        <div className="form-closer" onClick={handlecancle}></div>
      </div>
    </div>
    </>
  );
};

export default task;
