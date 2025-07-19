import { useState, createContext } from "react";
import api from "../API/api.js";
import { useQuery } from "react-query";

// ✅ Exporting context as you already had
export const AuthContext = createContext();

export const AuthProvider = function (props) {
  // ✅ UI states
  const [sliderbar, setSliderbar] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(false);
  const [refreshTask, setRefreshTask] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // ✅ Utility: Get token from cookie
  const getToken = () => {
    const cookieString = document.cookie;
    const tokenCookie = cookieString
      .split("; ")
      .find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  // ✅ Refined: Let React Query handle the error
  const fetchUserData = async () => {
    const res = await api.fetchUser(); // Axios throws on failure
    return res.data; // Return only on success
  };

  // ✅ React Query for fetching user
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    retry: false, // Disable retry for fast failure
    onSuccess: () => {
      console.log("Auth context: Data fetched successfully.");
    },
    onError: (err) => {
      console.log("Auth context: Failed to fetch user data", err);
    }
  });

  // ✅ Extract data safely
  const user = data?.user || null;
  const boards = data?.boards || [];
  const tasks = data?.tasks || [];

  const token = getToken();
  const isAuthenticated = !!token && !!user;

  // ✅ Final context provider
  return (
    <AuthContext.Provider value={{
      user,
      boards,
      tasks,
      token,
      isAuthenticated,
      isLoading,
      isError,
      error,
      sliderbar,
      setSliderbar,
      selectedBoard,
      setSelectedBoard,
      refreshBoard,
      setRefreshBoard,
      refreshTask,
      setRefreshTask
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};
