const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Board = require('../models/Board');

const homeRoute = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findOne({ email: decoded.email });
    if (!currentUser) {
      return res.status(400).json({ message: "Invalid token payload" });
    }
    const user = await User.findById(currentUser._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Always populate Tasks and their subtasks for each board
    const boards = await Board.find({ _id: { $in: user.Boards } })
      .populate({
        path: 'Tasks',
        populate: { path: 'subtasks' }
      })
      .lean();

      // console.log("token fetched successfully:", process.env.JWT_SECRET);
    res.status(200).json({
      message: "User and boards fetched successfully",
      user,
      boards
    });
  } catch (error) {
    console.error("Error in homeRoute:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { homeRoute };
