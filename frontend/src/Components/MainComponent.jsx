import Columns from './columns/Columns'

import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import "../App.css"



const MainComponent = () => {
  const {headerRef} = useContext(AuthContext);
  
 const height = headerRef?.current?.offsetHeight;
    


    return (
    <div>
         <div className="Task-block" style={{height : headerRef ? `${height}px` : '80vh' }}>
           <Columns />
          </div>
    </div>
  )
}

export default MainComponent