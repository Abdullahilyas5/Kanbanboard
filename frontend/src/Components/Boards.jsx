import { useContext, useEffect, useRef, useState } from "react";
import BoardCard from "./BoardCard.jsx";
import "./Board.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";

function handleTitle(newTitle) {
  settitle(newTitle);
  console.log("Selected title:", newTitle);
}

const Boards = ({ settitle, Usersetboard, setSliderbar, sidebarRef }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const {
    SelectedBoard,
    board,
    setSelectedBoard,
    user,
    logostyles
  } = useContext(AuthContext);

  // Handle title and selected board


  const handleBoard = () => {
    navigate("/create-board");
  };

  // ✅ Fetch boards from backend on component mount
  // useEffect(() => {
  //   const fetchBoards = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/display-board/${user}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         setError(data.message || "Failed to fetch boards");
  //         return;
  //       }


  //       Usersetboard(data.boards); // ✅ Save boards to context/state
  //     } catch (err) {
  //       setError(err.message);
  //       console.error("Error fetching boards:", err);
  //     }
  //   };

  //   fetchBoards();
  // }, [user, Usersetboard]);

  // {console.log(board)}

  
  const height = logostyles?.current?.offsetHeight;

  return (

    <div>


      <div className="container" style={{ height: logostyles ? `${height}px` : 'auto' }} ref={sidebarRef}>
        <p className="boardcount" >ALL BOARDS ({board?.length || 0})</p>
        <BoardDisplay board={board} settitle={settitle} handleTitle={handleTitle} />
        <div className="btn-container">
          <button className="btn" onClick={handleBoard}>
            <i className="ri-dashboard-line fa"> + Create new board</i>
          </button>

        </div>
      </div>


    </div>
  );
};

export default Boards;


const BoardDisplay = ({ board, handleTitle, settitle }) => {

  return (
    <div className="boardcontainer">
      {board?.length > 0 ? (
        <div className="board-container">
          <i className="ri-dashboard-line"></i>
          <button className="btn-2" key={board._id} id={board._id} onClick={handleTitle} >
            {title}
          </button>
        </div>
      ):(
        <div></div>
      )}
    </div>
  )

};

