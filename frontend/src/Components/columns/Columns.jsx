import Tasks from '../Tasks/Tasks';
import './Columns.css';

const Columns = ({ title, iconcolor, tasks }) => {


  return (
    <div className="columns" >
      <div className="top">
        <i className="ri-checkbox-blank-circle-fill" style={{ color: iconcolor }}></i>
        <p>{title} ({tasks.length})</p>
      </div>
      <div className="tasksqueue ">

        {tasks.map(task => (
          <Tasks id={task.id} title={task.title} />
        ))}

      </div>
    </div>
  );
};

export default Columns;
