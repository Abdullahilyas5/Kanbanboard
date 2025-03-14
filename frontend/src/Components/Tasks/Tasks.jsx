import './Task.css';

const Tasks = ({ id , title }) => {

  function dragend() {
    console.log('dragend');
    const element = document.getElementById(id);
    element.classList.remove('hold', 'hidden');
    element.classlist.add('task')
  }

  function dragstart(e){
    console.log('dragstart');
    const elem = e.target;
    elem.classlist.add('hold');
    setTimeout(() => {
      elem.classlist.add('hidden');
    }, 0);
    
    
  }
  return (
    <button draggable= "true" className="task-block " id={id} onDragStart={dragstart} onDragEnd={dragend} >
      <h3>{title}</h3>
      <p>subtask details</p>
    </button>
  );
};

export default Tasks;