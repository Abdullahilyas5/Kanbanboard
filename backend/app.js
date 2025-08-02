// app.js (or server.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Controllers & middleware
const { homeRoute } = require('./controllers/homeRoute.js');
const { signupMiddleware, validateSignup } = require('./controllers/signup.js');
const { loginMiddleware, validatelogin } = require('./controllers/login.js');
const { logoutMiddleware } = require('./controllers/logout.js');
const { createBoard, validateUser, authenticationuser } = require('./controllers/boards.js');
const { createTask, validateTask } = require('./controllers/createTask.js');
const { updateBoard } = require('./controllers/updateController.js');
const { deleteBoard } = require('./controllers/deleteController.js');
const { updateSubtask, updateStatus } = require('./controllers/UpdateTaskStatus.js');
const { updateTask, deleteTask } = require('./controllers/TaskController.js');

const app = express();

// === MIDDLEWARE ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://kanbanboard-llfm.vercel.app',
    ],
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    credentials: true,
    allowedHeaders: ['Authorization','Content-Type']
  })
);

// === ROUTES ===
// 1) Fetch user + boards
app.get('/', homeRoute);

// 2) Task CRUD & status/subtasks
app.post('/createTask/:id', validateTask, createTask);
app.patch('/tasks/:taskId/subtasks/:subtaskId', updateSubtask);
app.patch('/tasks/:taskId/status', updateStatus);
app.put('/tasks/:taskId', updateTask);
app.delete('/tasks/:taskId', deleteTask);

// 3) Auth
app.post('/signup', validateSignup, signupMiddleware);
app.post('/login', validatelogin, loginMiddleware);

// 4) Boards
app.post('/createBoard', createBoard);
app.put('/updateBoard/:id', updateBoard);
app.delete('/deleteBoard/:id', deleteBoard);

// 5) Logout (now POST, to match client)
app.post('/logout', logoutMiddleware);

// === DATABASE & SERVER START ===
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

module.exports = app;
