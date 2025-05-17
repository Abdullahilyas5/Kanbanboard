import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = function (props) {

    const [isauthorize, setisauthorize] = useState(null);
    const [SelectedBoard, setSelectedBoard] = useState(null);
      const [authLocked, setAuthLocked] = useState(false); // 🚨 lock flag

  const secureSetAuth = (value) => {
    if (authLocked && value === false) {
      console.log("❌ Ignored unauthorized attempt to reset auth.");
      return; // prevent reset
    }

    if (value === true) {
      setAuthLocked(true); // lock once authorized ✅
    }

    setisauthorize(value);
  };


    return (
        <AuthContext.Provider value={{ isauthorize, setisauthorize : secureSetAuth , SelectedBoard, setSelectedBoard }}>
            {props.children}
        </AuthContext.Provider>
    )

}


