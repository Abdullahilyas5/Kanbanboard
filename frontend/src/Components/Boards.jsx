import React, { useContext, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import "./Board.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDashboard, MdCreate } from "react-icons/md";

const Boards = ({ settitle, Usersetboard }) => {
  const { boards, logostyles, selectedBoard, setSelectedBoard, refetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const height = logostyles?.current?.offsetHeight;

  const handleBoard = () => {
    navigate("/create-Board");
  };

  const handleTitle = useCallback((newTitle, id) => {
    settitle(newTitle);
    setSelectedBoard(id);
    Usersetboard(id);
    refetchUser?.();
  }, [settitle, setSelectedBoard, Usersetboard, refetchUser]);

  return (
    <div className="boards-panel-wrapper" style={{ height: logostyles ? `calc(100vh - ${height}px)` : "auto" }}>
      <p className="boards-panel-count">ALL BOARDS ({boards?.length || 0})</p>
      <BoardDisplay boards={boards} handleTitle={handleTitle} />
      <div className="btn-div">
        <button className="boards-panel-create-btn" onClick={handleBoard}>
          <MdCreate className="boards-panel-create-icon" /> Create new board
        </button>
      </div>
    </div>
  );
};

const BoardDisplay = ({ boards, handleTitle }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (id) => {
    setActiveMenuId(prevId => (prevId === id ? null : id));
    setTimeout(() => {
      setActiveMenuId(null);
    }, 10000);
  };

  return (
    <div className="boards-panel-scrollable">
      {boards.map((board) => (
        <div className="boards-panel-card" key={board._id}>
          <div className="boards-panel-card-header">
            <div className="boards-panel-title">
              <MdDashboard className="boards-panel-icons" />
              <button
                className="boards-panel-title-btn"
                onClick={() => handleTitle(board.title, board._id)}
              >
                {board.title}
              </button>
              
            </div>
            <BsThreeDotsVertical className="boards-panel-menu-icon" onClick={() => handleToggle(board._id)} />
          </div>
          {activeMenuId === board._id && (
            <div className="boards-panel-menu">
              <button
                className="boards-panel-btn-update"
                onClick={() => navigate("/update-Board", { state: { boardId: board._id } })}
              >
                Update
              </button>
              <button
                className="boards-panel-btn-delete"
                onClick={() => navigate("/delete-Board", { state: { boardId: board._id } })}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Boards;
