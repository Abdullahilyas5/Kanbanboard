// controllers/homeRoute.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Board = require('../models/Board.js');

exports.homeRoute = async (req, res) => {
  try {
    // 1) grab token from cookie or header
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
      
    }

    // 2) verify
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 3) find user
    const user = await User.findOne({ email: payload.email }).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // 4) fetch boards
    const boards = await Board.find({ userId: user._id });

    return res.status(200).json({ user, boards });
  } catch (err) {
    console.error('homeRoute error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
