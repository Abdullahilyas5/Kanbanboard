// src/context/Authcontext.jsx
import React, { useState, createContext, useEffect, useRef } from "react";
import api from "../API/api.js";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const logostyles = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // 1) Fetch user + boards
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

  console.log("AuthContext user:", user , "boards:", boards ,"tasks:", tasks, "selectedBoard:", selectedBoard );

  // 2) Auto-select first board when boards change
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

  // 3) Update tasks _only_ when they truly change
  useEffect(() => {
    if (selectedBoard) {
      const board = boards.find((b) => b._id === selectedBoard);
      const newTasks = board?.Tasks || [];

      setTasks((prev) => {
        // quick length check + ID-by-index check
        if (
          prev.length === newTasks.length &&
          prev.every((t, i) => t._id === newTasks[i]._id)
        ) {
          return prev; // identical → no update
        }
        return newTasks; // changed → update
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
