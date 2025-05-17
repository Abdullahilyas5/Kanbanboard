const Boards = require('../models/Board.js');
const Tasks = require('../models/Task.js');


const checkUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: ' "level backend : 1 "Authentication token is missing' });
    };


    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      console.log("auth user response :", decoded)
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};

const homeRoute = async (req, res) => {
  try {
    const User = req.user;

    if (!User) {
      return res.status(401).json({
        message: 'You need to signup or login to get access on kanban site',
        isauthorize: false,
        boards: []
      });
    }

    // Fetch boards and populate their related tasks
    const boards = await Boards.find({ Users: User._id }).populate('tasks');

    res.json({
      boards,
      isauthorize: true
    });
  } catch (error) {
    console.log("Error in homeRoute: ", error);
    res.status(500).json({ message: 'Server error', isauthorize: false });
  }
};

module.exports = { homeRoute, checkUser };
