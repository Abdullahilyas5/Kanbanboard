import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import "./Board.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDashboard, MdCreate } from "react-icons/md";
import { motion } from "motion/react";
const Boards = ({ settitle, sidebarRef }) => {
  const { boards, logostyles, selectedBoard, setSelectedBoard } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBoard = () => {
    navigate("/createBoard", { replace: true });
  };

  const handleTitle = (newTitle, id) => {
    settitle(newTitle);
    setSelectedBoard(id);
  };

  const height = logostyles?.current?.offsetHeight;

  return (
    <div>
      <div
        className="container"
        style={{ height: logostyles ? `calc(100vh - ${height}px)` : "auto" }}
        ref={sidebarRef}
      >
        <p className="boardcount">ALL BOARDS ({boards?.length || 0})</p>
        <BoardDisplay boards={boards} handleTitle={handleTitle} />
        <div className="btn-div">
          <button className="create-btn-homepage" onClick={handleBoard}>
            <MdCreate className="creation-board-btn" /> Create new board
          </button>
        </div>
      </div>
    </div>
  );
};

const BoardDisplay = ({ boards, handleTitle }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (id) => {
    setActiveMenuId(prevId => (prevId === id ? null : id));
    
    setTimeout(()=>{
      setActiveMenuId(null);
    },7000)
  };

  return (
    <div className="display-wrapper">
      {boards.map((board) => (
        <div 
        
        className="board-container" key={board._id}>
          <div className="top-board">
            <div className="board-title-container">
              <MdDashboard className="board-icons" />
              <button
                className="boardbtn"
                onClick={() => handleTitle(board.title, board._id)}
              >
                {board.title}
              </button>
            </div>
            <div className="menu-container">
              <BsThreeDotsVertical className="menu-btn" onClick={() => handleToggle(board._id)} />
            </div>
          </div>
          {activeMenuId === board._id && (
            <div className="boards-menu">
              <button
                type="button"
                className="modify-btn"
                onClick={() => navigate('/update-Board', { state: { boardId: board._id } })}
              >Update</button>
              <button
                type="button"
                className="modify-btn"
                onClick={() => navigate('/delete-Board', { state: { boardId: board._id } })}
              >Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Boards;
