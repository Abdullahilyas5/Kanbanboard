const Boards = require('../models/Board.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const homeRoute = async (req, res) => {
  try {
    const currentUser = req.user;

    // Find all boards for current user and populate the tasks
    const boards = await Boards.find({ Users: currentUser._id }).populate('tasks');

    // 🔍 Extract all tasks from boards into a flat array
    const allTasks = boards.flatMap(board => board.tasks);

    res.status(200).json({
      boards: boards,
      tasks: allTasks,
      user: currentUser,
      message: 'Boards and tasks fetched successfully',
    });

  } catch (error) {
    console.error("Error in homeRoute:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { homeRoute };
