import axios from "axios";

const BASE_URL = "http://localhost:3000";


 const fetchUser = () =>
  axios.get(`${BASE_URL}/`, { withCredentials: true });

const createUser = (data) =>
  axios.post(`${BASE_URL}/signup`,data, { withCredentials: true });



const loginUser = (data) =>
  axios.post(`${BASE_URL}/login`,data, { withCredentials: true });


 const fetchBoards = (userId) =>
  axios.get(`${BASE_URL}/display-board/${userId}`, { withCredentials: true });

 const createBoard = (newBoard) =>
  axios.post(`${BASE_URL}/createBoard`, newBoard, { withCredentials: true });

 const fetchTasks = (boardId) =>
  axios.get(`${BASE_URL}/displayTask/${boardId}`, { withCredentials: true });

 const createTask = (task) =>
  axios.post(`${BASE_URL}/createTask`, task, { withCredentials: true });

 const logout = () =>
  axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });



 export default { fetchUser, fetchBoards,  loginUser, createBoard, fetchTasks, createUser, createTask, logout };