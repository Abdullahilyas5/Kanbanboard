const Board = require('../models/Board.js');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const authenticationuser = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};

const createBoard = async (req, res) => {
    try {
        const errors = validationResult(req);
        const user = req.user;

        const { title } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const finduser = await User.findOne({ email: user.email });

        if (!finduser) {
            return res.status(404).json({
                message: 'User not found in the database',
            });
        }

        const newBoard = new Board({
            title: title,
            user: finduser._id,
        });

        newBoard.save().then((savedBoard) => {
            return User.findByIdAndUpdate(
                savedBoard.user._id,
                { $push: { Boards: savedBoard._id } },
                { new: true }
            );
        })
        .then((updatedUser) => {
            res.status(201).json(updatedUser);
            console.log(updatedUser);
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            });
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

validateUser = [
    check('title').notEmpty().withMessage('Title is required'),
];

module.exports = { createBoard, validateUser, authenticationuser };