import { useNavigate } from 'react-router';
import './Task.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext.jsx';
import { useQuery } from 'react-query';
import api from '../../API/api.js';

const Tasks = ({ id, title, subtitle }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { data: userTask = [], isLoading } = useQuery(
    ["tasks", auth.selectedBoard],
    () => api.fetchTasks(auth.selectedBoard).then(res => res.data),
    { enabled: !!auth.selectedBoard }
  );

  const taskview = () => {
    navigate("/viewtask");
    console.log("view task page")
  }

  return (
    <>
      <div>
        <button className="task-block" id={id} onClick={taskview} >
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </button>
      </div>
    </>
  );
};

export default Tasks;