import { useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = function (props) {
  const [user ,setuser] =useState('')
  const Authref = useRef(false);
  const [SelectedBoard, setSelectedBoard] = useState(null);
  const [board, setBoard] = useState([]);
  const [task,settask] = useState([]);
  const [refresh , setrefresh] = useState(false)

  return (
    <AuthContext.Provider value={{refresh , setrefresh, Authref, user ,setuser,task,settask, board ,setBoard , SelectedBoard, setSelectedBoard }}>
      {props.children}
    </AuthContext.Provider>
  )

}


