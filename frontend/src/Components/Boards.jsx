import { useEffect, useState } from "react";
import BoardCard from "./BoardCard.jsx";
import "./Board.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Boards = ({settitle , Userboard ,Usersetboard,renderboard}) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,setuser]=useState();

  const location = useLocation();

  const { refresh } = location.state || {};

  useEffect(() => {
    renderboard();
  }, [refresh]);
  
  function handleTitle(newTitle) {
    settitle(newTitle);
    console.log('Selected title:', newTitle);
  }

  const handleBoard = () => {
    navigate('/create-board');
    renderboard();
  };

  return (
    <div className="container">
      <p>ALL BOARDS ({board.length})</p>
      <div className="boardcontainer">
        {
          Userboard?.length > 0 ? (
            Userboard.map((item) => (
              <BoardCard
                key={item._id}
                id ={item._id}
                className="card"
                handletitle={handleTitle}
                title={item.title}
              />
            ))
          ) : (
            <div className="empty"></div>
          )
        }
      </div>
      <button className="btn" onClick={handleBoard}>
        <i className="ri-dashboard-line fa">  + Create new board</i>
      </button>
    </div>
  );
};

export default Boards;
