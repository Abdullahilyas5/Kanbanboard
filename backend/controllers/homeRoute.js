// controllers/homeRoute.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Board = require('../models/Board.js');

exports.homeRoute = async (req, res) => {
  try {
    // 1. Get token from cookie or Authorization header
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // 2. Verify JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user (excluding password)
    const user = await User.findOne({ email: payload.email }).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // 4. Find user's boards and populate Tasks
    const boards = await Board.find({ user: user._id }).populate('Tasks');

    // 5. Send response
    return res.status(200).json({ user, boards });
  } catch (err) {
    console.error('homeRoute error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
