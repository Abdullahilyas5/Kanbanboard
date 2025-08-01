const Board = require('../models/Board.js');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user from token in cookies
const authenticationuser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({ msg: error.message + " from authentication user" });
    }
};

// Controller to create a board for authenticated user
const createBoard = async (req, res) => {
    try {
        const errors = validationResult(req);
        const { title } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const decoded = req.user;
        const userEmail = decoded.email;
        const findUser = await User.findOne({ email: userEmail });
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newBoard = new Board({
            title,
            user: findUser._id,
        });

        const savedBoard = await newBoard.save();


        // Update user with new board ID
        await User.findByIdAndUpdate(
            findUser._id,
            { $push: { Boards: savedBoard._id } },
            { new: true }
        );

        res.status(201).json({
            boards  : savedBoard,
            message : "board is created successfully",
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Validation middleware
const validateUser = [
    check('title').notEmpty().withMessage('Title is required'),
];

module.exports = {
    createBoard,
    validateUser,
    authenticationuser,
};
