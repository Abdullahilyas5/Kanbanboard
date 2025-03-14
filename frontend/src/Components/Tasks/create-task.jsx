import { useState } from "react";
import "./create-task.css";




const task = () => {
  useState([{
    title: "",
    description:"",
    subtasks:[
      {
        stitle:"",
        iscomplete:"",
      }

    ],
    status:"",

  }]);

  function handletoggle(){
    const elem = document.querySelector(".status-menu");
    if (elem.classList.contains('noshow')){
      elem.styles.display='flex';
      elem.classList.remove('noshow');
      elem.classList.add('show')
    }
    if (elem.classList.contains('show')){
      elem.styles.display='none';
      elem.classList.remove('show');
      elem.classList.add('noshow')
    }
  }
  return (
    <form action="/create-task" method="post" className="task-form" onSubmit={handleUser}>
        <h2 className="inputs">Add new task</h2>
        <input className=" inputs"
          type="text"
          name="title"
          value={task.title}
          onChange={handlechange}
          placeholder="title"
        />
        <input className="inputs dec"
          type="text"
          name="description"
          value={task.description}
          onChange={handlechange}
          placeholder="description..."
        />
       <button >Add New Tasks</button>
    
         
        <ul className="status-menu noshow" onClick={handletoggle}>
          <li>Todo</li>
          <li>Doing</li>
          <li>Done</li>
        </ul>
         <button type="submit">create task</button>
      </form>
  )
}

export default task