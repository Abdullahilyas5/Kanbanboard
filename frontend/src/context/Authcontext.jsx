import React, { useState, createContext, useEffect, useRef } from "react";
import api from "../API/api.js";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const logostyles = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // ✅ 1. Fetch user data
  const fetchUserData = async () => {
    const response = await api.fetchUser();
    if (!response || !response.data) {
      throw new Error("No user data found");
    }
    return response.data;
  };

  // ✅ 2. React-query: simple and efficient fetching
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchUser,
  } = useQuery("userData", fetchUserData, {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,               // always consider fresh fetch when manually triggered
    cacheTime: 0,               // remove long cache holding
    onSuccess: (data) => {
      console.log("✅ User data fetched:", data);
    },
    onError: (err) => {
      console.error("❌ Error fetching user data:", err.message);
      toast.error("Failed to fetch user data");
      setSelectedBoard(null);
      setTasks([]);
    },
  });

  const user = data?.user ?? null;
  const boards = data?.boards ?? [];

  // ✅ 3. Auto-select the first board
  useEffect(() => {
    if (!selectedBoard && boards.length > 0) {
      setSelectedBoard(boards[0]._id);
    } else if (boards.length > 0) {
      const exists = boards.some((b) => b._id === selectedBoard);
      if (!exists) {
        setSelectedBoard(boards[0]._id);
      }
    } else {
      setSelectedBoard(null);
    }
  }, [boards, selectedBoard]);

  // ✅ 4. Update tasks when board changes
  useEffect(() => {
    if (selectedBoard) {
      const board = boards.find((b) => b._id === selectedBoard);
      const newTasks = board?.Tasks || [];

      setTasks((prev) => {
        const same =
          prev.length === newTasks.length &&
          prev.every((t, i) => t._id === newTasks[i]._id);
        return same ? prev : newTasks;
      });
    } else {
      setTasks((prev) => (prev.length ? [] : prev));
    }
  }, [boards, selectedBoard]);

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
        selectedBoard,
        setSelectedBoard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
