import React, { useState, createContext, useEffect, useRef } from "react";
import api from "../API/api.js";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const logostyles = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // ✅ 1) Define fetch function properly
  const fetchUserData = async () => {
    const response = await api.fetchUser();

    if (!response || !response.data) {
      throw new Error("No user data found");
    }

    return response.data;
  };

  // ✅ 2) useQuery to handle data fetching
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchUser,
  } = useQuery("userData", fetchUserData, {
    refetchOnWindowFocus: true,
    retry: false,
    onSuccess: (data) => {
      console.log("User data fetched:", data);
    },
    onError: (error) => {
      console.error("Error fetching user data:", error.message);
      setSelectedBoard(null);
      setTasks([]);
      toast.error("Failed to fetch user data");
    },
  });

  const user = data?.user ?? null;
  const boards = data?.boards ?? [];

  console.log("AuthContext user:", user, "boards:", boards, "tasks:", tasks, "selectedBoard:", selectedBoard);

  // ✅ 3) Auto-select first board
  useEffect(() => {
    if (boards.length > 0) {
      const exists = boards.some((b) => b._id === selectedBoard);
      const firstId = boards[0]._id;
      if (!exists) {
        setSelectedBoard(firstId);
      }
    } else {
      setSelectedBoard(null);
    }
  }, [boards, selectedBoard]);

  // ✅ 4) Update tasks only when needed
  useEffect(() => {
    if (selectedBoard) {
      const board = boards.find((b) => b._id === selectedBoard);
      const newTasks = board?.Tasks || [];

      setTasks((prev) => {
        if (
          prev.length === newTasks.length &&
          prev.every((t, i) => t._id === newTasks[i]._id)
        ) {
          return prev;
        }
        return newTasks;
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
