import { useState } from "react";
import "./create-task.css";
import { useNavigate } from "react-router";




const task = () => {
  const navigate = useNavigate();
  // useState([{
  //   title: "",
  //   description:"",
  //   subtasks:[
  //     {
  //       stitle:"",
  //       iscomplete:"",
  //     }

  //   ],
  //   status:"",

  // }]);

  function handletoggle() {
    const elem = document.querySelector(".status-menu");
    if (elem.classList.contains('noshow')) {
      elem.styles.display = 'flex';
      elem.classList.remove('noshow');
      elem.classList.add('show')
    }
    if (elem.classList.contains('show')) {
      elem.styles.display = 'none';
      elem.classList.remove('show');
      elem.classList.add('noshow')
    }
  }

  const handlesub = ()=>{

  }


  const showmenu = () => {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      menu.style.display = 'none';
    }
    else {
      menu.classList.add('show');
      menu.style.display = 'flex';
    }
  }

  const handlecancle = () => {
    navigate(-1);
};

  return (
    <div className="parent">
    
      <form action="/create-task" method="post" className="task-form">
        <h2 >Add new task</h2>
        <i className="ri-close-line cancle" onClick={handlecancle}></i>
        <label>Title</label>
        <input className=" inputs"
          type="text"
          name="title"
          value={task.title}
          placeholder="Title"
        />
        <label>Description</label>
        <input className="inputs dec"
          type="text"
          name="description"
          value={task.description}
          placeholder="Description"
        />
        <label>Subtask</label>
        <div className="subtask">
          <li>doing a face wash  <i class="ri-close-line"></i></li>
          <li>go for a  walk <i class="ri-close-line"></i></li>
        </div>

        <button  onClick={handlesub}>+ Add New Subtasks</button>

        <label>Status</label>
        <div className="drop-menu" onClick={showmenu}>
          <p>Todo</p>
          <i class="ri-arrow-drop-down-line" ></i>
        </div>

        <div className="menu">
            <li>Todo</li>
            <li>Doing</li>
            <li>Done</li>
          </div>

        <button type="submit" className="btn">create task</button>
      </form>
    </div>
  )
}

export default task