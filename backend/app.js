const express = require('express');
const cookieParser = require('cookie-parser');
const Board = require('./models/Board.js');
const { createBoard, validateUser, authenticationuser } = require('./controllers/boards.js');
const { signupMiddleware, validateSignup } = require('./controllers/signup.js');
const { loginMiddleware, validatelogin } = require('./controllers/login.js');
const { logoutMiddleware } = require('./controllers/logout.js');
const {createTask , validateTask} = require('./controllers/createTask.js')
const helmet = require('helmet');
const cors = require("cors");
const { displayTask ,verification} = require('./controllers/displaytask.js');
const { homeRoute } = require('./controllers/homeRoute.js');
const { boardverification ,displayboard } = require('./controllers/displayboard.js');
const { checkUser } = require('./middleware/AuthenticateUser.js');
const { updateBoard } = require('./controllers/updateController.js');
const { deleteBoard } = require('./controllers/deleteController.js');
const { updateTaskStatusInBoard } = require('./controllers/statusUpdateController.js');
const {updateStatus,updateSubtask} = require("./controllers/UpdateTaskStatus.js")
const { updateTask, deleteTask } = require('./controllers/TaskController.js');

require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // <-- Add PATCH here
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
    })
);

app.use(helmet());
// -----------------------home route ---------------------
app.get('/', homeRoute);


//  signup route
app.get('/signup', (req, res) => {
    res.send('hello world');
});

// create task

app.get('/displayTask', displayTask)
app.post('/createTask/:id',validateTask, createTask);

app.put('/statusUpdate/:id', updateTaskStatusInBoard);

app.patch("/tasks/:taskId/subtasks/:subtaskId", updateSubtask);

app.patch("/tasks/:taskId/status", updateStatus);

app.put("/tasks/:taskId", updateTask);
app.delete("/tasks/:taskId", deleteTask);





// create task



// login  or logout  and signup route      
app.post('/signup', checkUser, validateSignup, signupMiddleware);

app.post('/login', validatelogin, loginMiddleware);

// boards routes

app.get('/display-board/:user', boardverification ,displayboard);

app.post('/createBoard', authenticationuser , createBoard);

app.put('/updateBoard/:id', updateBoard );

app.delete('/deleteBoard/:id', deleteBoard );

app.get('/logout', logoutMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});