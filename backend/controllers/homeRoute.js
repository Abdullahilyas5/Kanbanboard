// controllers/homeRoute.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Board = require('../models/Board.js');

exports.homeRoute = async (req, res) => {
  try {
    // 1) Grab token from cookie or header
    let token = req.cookies?.token;
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // 2) Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Find user
    const user = await User.findOne({ email: payload.email }).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // 4) Fetch boards
    const boards = await Board.find({ user: user._id });

    // 5) Success response
    return res.status(200).json({ user, boards });

  } catch (err) {
    console.error('homeRoute error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
