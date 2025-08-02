// controllers/boards.js

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Board = require('../models/Board.js');
const User = require('../models/User.js');

/**
 * 1️⃣ Validation middleware: ensure title is present
 */
const validateBoard = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
];

/**
 * 2️⃣ Authentication middleware: cookie or Bearer header
 */
const boardCheck = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // fallback to Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

/**
 * 3️⃣ Controller: create a board for the authenticated user
 */
const createBoard = async (req, res) => {
  // catch express-validator errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title } = req.body;
    const userEmail = req.user.email;

    // find the user by email from token
    const findUser = await User.findOne({ email: userEmail });
    if (!findUser) {
      return res.status(404).json({ message: 'User not found. Please re-login.' });
    }

    // build and save board
    const newBoard = new Board({ title, user: findUser._id });
    const savedBoard = await newBoard.save();

    // push board ref into user
    await User.findByIdAndUpdate(
      findUser._id,
      { $push: { Boards: savedBoard._id } },
      { new: true }
    );

    return res.status(201).json({
      message: 'Board created successfully.',
      board: savedBoard
    });
  } catch (err) {
    console.error('createBoard error:', err);
    return res.status(500).json({ message: 'Server error while creating board.' });
  }
};

module.exports = {
  validateBoard,
  boardCheck,
  createBoard
};
