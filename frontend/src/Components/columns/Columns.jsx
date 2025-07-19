import Tasks from '../Tasks/Tasks';
import './Columns.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext.jsx';

const Columns = () => {
  const { tasks } = useContext(AuthContext);
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="columns">
      <Column title="Todo" tasks={safeTasks.filter(task => task.status === "todo")} iconcolor="#4CC1E5" />
      <Column title="Doing" tasks={safeTasks.filter(task => task.status === "doing")} iconcolor="#8370EE" />
      <Column title="Done" tasks={safeTasks.filter(task => task.status === "done")} iconcolor="#6CDDAC" />
    </div>
  );
};

export default Columns;

const Column = ({ title, tasks, iconcolor }) => (
  <div className="column">
    <div className="top">
      <i className="ri-checkbox-blank-circle-fill" style={{ color: iconcolor }}></i>
      <p>{title} ({tasks.length})</p>
    </div>
    <div className="tasksqueue">
      {tasks.map((task) => (
        <Tasks key={task.id} id={task.id} title={task.title} subtitle={task.description} />
      ))}
    </div>
  </div>
);
