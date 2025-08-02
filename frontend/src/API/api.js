import axios from "axios";

// Create a single axios instance with baseURL and credentials
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies if your backend uses cookie-based auth
});


// If you use a JWT in localStorage, inject it on every request:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// — User auth —
// NOTE: your backend root ("/") endpoint returns { user, boards }
export const fetchUser = () => api.get("/");
export const loginUser = (data) => api.post("/login", data);
export const createUser = (data) => api.post("/signup", data);
export const logout = () => api.post("/logout");

// — Boards —
export const fetchBoards = (userId) => api.get(`/display-board/${userId}`);
export const createBoard = (newBoard) => api.post("/createBoard", newBoard);
export const updateBoard = (updatedBoard, id) => api.put(`/updateBoard/${id}`, updatedBoard);
export const deleteBoard = (id) => api.delete(`/deleteBoard/${id}`);

// — Tasks & Subtasks —
export const fetchTasks = (boardId) => api.get(`/displayTask/${boardId}`);
export const createTask = (task, id) => api.post(`/createTask/${id}`, task);
export const checkboxUpdate = (taskId, subtaskId, completed) =>
  api.patch(`/tasks/${taskId}/subtasks/${subtaskId}`, { completed });
export const statusUpdate = (taskId, status) =>
  api.patch(`/tasks/${taskId}/status`, { status });
export const updateTask = (taskId, data) => api.put(`/tasks/${taskId}`, data);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default {
  fetchUser,
  loginUser,
  createUser,
  logout,
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
