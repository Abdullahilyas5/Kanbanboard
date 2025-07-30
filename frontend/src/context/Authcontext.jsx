import React, { useState, createContext, useEffect, useRef } from "react";
import api from "../API/api.js";
import { useQuery } from "react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const logostyles = useRef(null);
  const [sliderbar, setSliderbar] = useState(false);

  // Boards & tasks state
  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // Fetch user + boards
  const fetchUserData = () =>
    api.fetchUser().then((res) => {
      if (res.status === 200) return res.data;
      throw new Error("Unauthorized");
    });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchUser,
  } = useQuery(["userData"], fetchUserData, {
    refetchOnWindowFocus: true,
    retry: false,
    onError: () => {
      setSelectedBoard(null);
      setTasks([]);
    },
  });

  const user = data?.user ?? null;
  const boards = data?.boards ?? [];

  // ➤ Initialize selectedBoard once when boards arrive
  useEffect(() => {
    if (boards.length > 0 && selectedBoard === null) {
      setSelectedBoard(boards[0]._id);
    }
    // we only want to run when `boards` change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  // ➤ Update tasks when selectedBoard or boards change
  useEffect(() => {
    if (selectedBoard) {
      const board = boards.find((b) => b._id === selectedBoard);
      setTasks(board?.Tasks || []);
    } else {
      setTasks([]);
    }
  }, [selectedBoard, boards]);

  const isAuthenticated = !!user && !isError;

  return (
    <AuthContext.Provider
      value={{
        user,
        boards,
        tasks,
        setTasks,
        isAuthenticated,
        isLoading,
        isError,
        error,
        refetchUser,
        logostyles,
        sliderbar,
        setSliderbar,
        selectedBoard,
        setSelectedBoard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
