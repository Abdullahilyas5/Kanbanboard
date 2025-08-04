const Task = require('../models/Task.js'); // import Task model

exports.homeRoute = async (req, res) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: payload.email }).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const boards = await Board.find({ user: user._id });

    // Populate tasks for each board
    const boardsWithTasks = await Promise.all(
      boards.map(async (board) => {
        const tasks = await Task.find({ board: board._id });
        return { ...board.toObject(), tasks };
      })
    );

    console.log('Boards with tasks:', boardsWithTasks);
    return res.status(200).json({ user, boards: boardsWithTasks });
  } catch (err) {
    console.error('homeRoute error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
