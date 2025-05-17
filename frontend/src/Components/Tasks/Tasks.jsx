import { Navigate, useNavigate } from 'react-router';
import './Task.css';
import { useEffect, useState ,useContext } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../../context/Authcontext.jsx';

const   Tasks = ({ id, title, subtask }) => {

  const [userTask, setuserTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { refresh } = location.state || {};

  const navigate = useNavigate();
  const auth = useContext(AuthContext);


const displayTask = async () => {
  try {
    if (auth.SelectedBoard === null) {
      console.log("No board selected");
      return;
    }

    const response = await fetch(`http://localhost:3000/displayTask/${auth.SelectedBoard}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    console.log("task data from backend : ", data);
    if (Array.isArray(data)) {
      setuserTask(data);
    } else {
      setuserTask([]);
    }

  } catch (error) {
    console.log("Task view is not available (frontend):", error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    displayTask();
  }, [refresh, auth.SelectedBoard]);

  const taskview = () => {
    navigate("/viewtask");
    console.log("view task page")

  }

  return (
    <>
      <div>
            <button className="task-block" id={id} onClick={taskview} >
              <h3>item</h3>
              <p>subtask details</p>
            </button>
      </div>
    </>
  );
};

export default Tasks;