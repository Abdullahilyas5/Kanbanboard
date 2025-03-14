import React from "react";
import "./Header.css";
import { Navigate, useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const showmenu = () => {
    const menu = document.querySelector('.menublock');
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      menu.style.display = 'none';
    }
    else {
      menu.classList.add('show');
      menu.style.display = 'flex';
    }
  }
  return (
    <div className="header">
      <h2>{props.title}</h2>
      <div className="blockmenu">
        <i class="ri-more-2-fill" onClick={showmenu}></i>

        <button className="add-btn"  onClick={()=>{
          navigate('/create-tasks');
        }}>+ Add Task</button>

        <div className="menublock" >
          <button onClick={() => {
            navigate('/login')
          }}>Login</button>
          <button
            onClick={() => {
              navigate('/signup')
            }}>Signup</button>
          <button className='logout' onClick={() => {
            navigate('/logout')
          }}>logout</button>
        </div>
      </div>

    </div>
  );
}

export default Header;
