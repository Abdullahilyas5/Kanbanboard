const express = require('express');
const cookieParser = require('cookie-parser');
const Board = require('./models/Board.js');
const { createBoard, validateUser, authenticationuser } = require('./controllers/boards.js');
const { signupMiddleware, validateSignup } = require('./controllers/signup.js');
const { loginMiddleware, validatelogin } = require('./controllers/login.js');
const { logoutMiddleware } = require('./controllers/logout.js');
const { displayBoard } = require('./controllers/dispalyboard.js');
const {createTask , validateTask} = require('./controllers/createTask.js')
const helmet = require('helmet');
const cors = require("cors");

require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
    })
);

app.use(helmet());
// -----------------------home route ---------------------
app.get('/', (req, res) => {
    res.send('hello world');
});
//  signup route
app.get('/signup', (req, res) => {
    res.send('hello world');
});

// create task

app.post( '/createTask',validateTask,createTask );


app.post('/signup', validateSignup, signupMiddleware);

// login route      

app.get('/login', (req, res) => {
    res.send('hello login');
});

app.post('/login', validatelogin, loginMiddleware);

// boards routes

app.get('/display-board', authenticationuser, displayBoard);

app.post('/create-board', validateUser, authenticationuser, createBoard);



app.get('/logout', logoutMiddleware);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});