const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const Board = require('./models/Board.js');
const { createBoard, validateUser, authenticationuser } = require('./controllers/boards.js');
const { signupMiddleware, validateSignup } = require('./controllers/signup.js');
const { loginMiddleware, validatelogin } = require('./controllers/login.js');
const { logoutMiddleware } = require('./controllers/logout.js');
const { createTask, validateTask } = require('./controllers/createTask.js');
const helmet = require('helmet');
const cors = require("cors");
const { homeRoute } = require('./controllers/homeRoute.js');
const { checkUser } = require('./middleware/AuthenticateUser.js');
const { updateBoard } = require('./controllers/updateController.js');
const { deleteBoard } = require('./controllers/deleteController.js');
const { updateTaskStatusInBoard } = require('./controllers/statusUpdateController.js');
const { updateStatus, updateSubtask } = require("./controllers/UpdateTaskStatus.js");
const { updateTask, deleteTask } = require('./controllers/TaskController.js');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", "kanban-boards-tasks-management.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
    })
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(3000, () => console.log("🚀 Server running on port 3000"));
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});



app.use(helmet());

// Routes
app.get('/', homeRoute);

app.post('/createTask/:id', validateTask, createTask);
app.put('/statusUpdate/:id', updateTaskStatusInBoard);
app.patch("/tasks/:taskId/subtasks/:subtaskId", updateSubtask);
app.patch("/tasks/:taskId/status", updateStatus);
app.put("/tasks/:taskId", updateTask);
app.delete("/tasks/:taskId", deleteTask);

app.post('/signup', validateSignup, signupMiddleware);
app.post('/login', validatelogin, loginMiddleware);
app.post('/createBoard', authenticationuser, createBoard);
app.put('/updateBoard/:id', updateBoard);
app.delete('/deleteBoard/:id', deleteBoard);
app.get('/logout', logoutMiddleware);

module.exports = app; // Needed for Vercel
