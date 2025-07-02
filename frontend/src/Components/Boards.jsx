import { useContext, useEffect, useState } from "react";
import BoardCard from "./BoardCard.jsx";
import "./Board.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";

const Boards = ({ settitle, Usersetboard }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    SelectedBoard,
    board,
    setSelectedBoard,
    user
  } = useContext(AuthContext);

  // Handle title and selected board
  function handleTitle(newTitle) {
    settitle(newTitle);
    console.log("Selected title:", newTitle);
  }

  const handleBoard = () => {
    navigate("/create-board");
  };

  // ✅ Fetch boards from backend on component mount
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`http://localhost:3000/display-board/${user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch boards");
          return;
        }

        Usersetboard(data.boards); // ✅ Save boards to context/state
      } catch (err) {
        setError(err.message);
        console.error("Error fetching boards:", err);
      }
    };

    fetchBoards();
  }, [user, Usersetboard]);

  return (
    <div className="container">
      <p>ALL BOARDS ({board?.length || 0})</p>

      <div className="boardcontainer">
        {board?.length > 0 ? (
          board.map((item) => (
            <BoardCard
              key={item._id}
              id={item._id}
              className="card"
              handletitle={handleTitle}
              title={item.title}
            />
          ))
        ) : (
          <div className="empty"></div>
        )}
      </div>

      <button className="btn" onClick={handleBoard}>
        <i className="ri-dashboard-line fa"> + Create new board</i>
      </button>

      {error && <p className="error"></p>}
    </div>
  );
};

export default Boards;
