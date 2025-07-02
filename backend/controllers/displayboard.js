const Task = require('../models/Task.js')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const Board = require('../models/Board.js');



const boardverification = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            console.log("auth user response :",decoded)
            if(decoded){
                req.user = decoded.email;
            }
            next();
        });
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};

const displayboard = async (req, res) => {
    try {
        const userEmail = req.params.user;
        console.log("user in params:", userEmail);

        if (!userEmail) {
            return res.status(401).json({
                message: 'You need to signup or login to get access to the kanban site',
                boards: []
            });
        }

        // Step 1: Find the user by email
        const userDoc = await User.findOne({ email: userEmail });

        if (!userDoc) {
            return res.status(404).json({ message: "User not found", boards: [] });
        }

        // Step 2: Use the user's _id to find boards
        const boards = await Board.find({ user: userDoc._id }).populate('tasks');

        res.status(200).json({ boards });
    } catch (error) {
        console.error("Error in displayboard:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { displayboard, boardverification };