const Boards = require('../models/Board.js');
const Tasks = require('../models/Task.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

// Middleware to check and decode JWT from cookies
const checkUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Token not provided",
      });
    }

    console.log("Token received:", token);

    jwt.verify(token, 'secret', async (err, loggedUser) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      const getuser = await User.findOne({ email: loggedUser.email });

      console.log("Authenticated user:", getuser);

      req.user = getuser;
      req.token = token;
      next();
    });
  } catch (error) {
    console.error("Unexpected error in checkUser middleware:", error.message);
    return res.status(500).json({ message: "Internal server error in auth middleware" });
  }
};

// Route to return boards associated with the authenticated user
const homeRoute = async (req, res) => {
  try {
    const User = req.user;
    const token = req.token;

    if (!User) {
      return res.status(401).json({
        message: 'Unauthorized: Please login first',
        token: null,
        // boards: [],
      });
    }

    console.log("User object:", User);

    // Fetch boards for this user
    const boards = await Boards.find({ Users: User._id }).populate('tasks');

    res.status(200).json({
      boards: boards,
      token,
      user: User.email,
    });
  } catch (error) {
    console.error("Error in homeRoute:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { homeRoute, checkUser };
