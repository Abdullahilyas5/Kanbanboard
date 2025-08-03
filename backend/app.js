// app.js

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { isProduction } = require('./utils/env.js');

const { homeRoute } = require('./controllers/homeRoute.js');
const { signupMiddleware, validateSignup } = require('./controllers/signup.js');
const { loginMiddleware, validateLogin } = require('./controllers/login.js');
const { logoutMiddleware } = require('./controllers/logout.js');
const { createBoard, validateBoard, boardCheck } = require('./controllers/boards.js');
const { createTask, validateTask } = require('./controllers/createTask.js');
const { updateBoard } = require('./controllers/updateController.js');
const { deleteBoard } = require('./controllers/deleteController.js');
const { updateSubtask, updateStatus } = require('./controllers/UpdateTaskStatus.js');
const { updateTask, deleteTask } = require('./controllers/TaskController.js');

const app = express();

// ─── Global Middleware ─────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// ─── CORS Configuration ────────────────────────────────────────────────────────
const allowedOrigins = isProduction
  ? [process.env.PROD_ORIGIN]
  : [process.env.DEV_ORIGIN];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

// ─── Routes ────────────────────────────────────────────────────────────────────

// 1) Home: fetch user + their boards
app.get('/', homeRoute);

// 2) Tasks
app.post('/createTask/:id', validateTask, createTask);
app.patch('/tasks/:taskId/subtasks/:subtaskId', updateSubtask);
app.patch('/tasks/:taskId/status', updateStatus);
app.put('/tasks/:taskId', updateTask);
app.delete('/tasks/:taskId', deleteTask);

// 3) Auth
app.post('/signup', validateSignup, signupMiddleware);
app.post('/login', validateLogin, loginMiddleware);
app.post('/logout', logoutMiddleware);

// 4) Boards (validate → auth → controller)
app.post('/createBoard', validateBoard, boardCheck, createBoard);
app.put('/updateBoard/:id', updateBoard);
app.delete('/deleteBoard/:id', deleteBoard);

// ─── Start Server ──────────────────────────────────────────────────────────────
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
