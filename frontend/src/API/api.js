import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// — User auth —
export const fetchUser = () =>
  axios.get(`${BASE_URL}/`, { withCredentials: true });

export const createUser = (data) =>
  axios.post(`${BASE_URL}/signup`, data, { withCredentials: true });

export const logout = () =>
  axios.get(`${BASE_URL}/logout`, { withCredentials: true });

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/login`, data, { withCredentials: true });



// — Boards —
export const fetchBoards = (userId) =>
  axios.get(`${BASE_URL}/display-board/${userId}`, { withCredentials: true });

export const createBoard = (newBoard) =>
  axios.post(`${BASE_URL}/createBoard`, newBoard, { withCredentials: true });

export const updateBoard = (updatedBoard, id) =>
  axios.put(`${BASE_URL}/updateBoard/${id}`, updatedBoard, { withCredentials: true });

export const deleteBoard = (id) =>
  axios.delete(`${BASE_URL}/deleteBoard/${id}`, { withCredentials: true });

// — Tasks & Subtasks —
export const fetchTasks = (boardId) =>
  axios.get(`${BASE_URL}/displayTask/${boardId}`, { withCredentials: true });

export const createTask = (task, id) =>
  axios.post(`${BASE_URL}/createTask/${id}`, task, { withCredentials: true });

// ✅ Changed these to PATCH so you update only the field in question:
export const checkboxUpdate = (taskId, subtaskId, completed) =>
  axios.patch(
    `${BASE_URL}/tasks/${taskId}/subtasks/${subtaskId}`,
    { completed },
    { withCredentials: true }
  );

export const statusUpdate = (taskId, status) =>
  axios.patch(
    `${BASE_URL}/tasks/${taskId}/status`,
    { status },
    { withCredentials: true }
  );

export const updateTask = (taskId, data) =>
  axios.put(`${BASE_URL}/tasks/${taskId}`, data, { withCredentials: true });

export const deleteTask = (taskId) =>
  axios.delete(`${BASE_URL}/tasks/${taskId}`, { withCredentials: true });

export default {
  fetchUser,
  createUser,
  logout,
  loginUser,
  fetchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  fetchTasks,
  createTask,
  checkboxUpdate,
  statusUpdate,
  updateTask,
  deleteTask,
};
