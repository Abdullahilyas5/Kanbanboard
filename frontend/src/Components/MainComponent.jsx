import Columns from './columns/Columns'

import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import "../App.css"



const MainComponent = () => {

    return (
    <div>
         <div className="Task-block" >
           <Columns />
          </div>
    </div>
  )
}

export default MainComponent