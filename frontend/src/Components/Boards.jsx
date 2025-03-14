import { useEffect, useState } from "react";
import BoardCard from "./BoardCard.jsx";
import "./Board.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Boards = (props) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,setuser]=useState();

  const location = useLocation();

  const { refresh } = location.state || {};



  const fetchBoard = async () => {
    try {



      const response = await fetch('http://localhost:3000/display-board', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();


      if (Array.isArray(data)) {
        setBoard(data);
      } else {
        setBoard([]);
      }
    } catch (error) {
      setError(error.message);
      console.log('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [refresh]);

  function handleTitle(newTitle) {
    props.settitle(newTitle);
    console.log('Selected title:', newTitle);
  }

  const handleBoard = () => {
    navigate('/create-board');
    fetchBoard();
  };

  return (
    <div className="container">
      <p>ALL BOARDS ({board.length})</p>
      <div className="boardcontainer">
        {
          board.length > 0 ? (
            board.map((item) => (
              <BoardCard
                key={item._id}
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
