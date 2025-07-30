const { check, validationResult } = require('express-validator');
const Task = require('../models/Task.js');
const Board = require('../models/Board.js');

const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const boardId = req.params.id;
    if (!boardId) {
      return res.status(400).json({ message: "Board ID is required in URL params" });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const { title, description, subtasks, status } = req.body;

    const newTask = new Task({
      title,
      description,
      subtasks,
      status,
      board: boardId,
    });

    await newTask.save();

    // ✅ Push the task to the board's Tasks array
    board.Tasks.push(newTask._id);
    await board.save();

    res.status(200).json({ msg: "Task is created and added to board successfully!" });

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: error.message });
  }
};

const validateTask = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
];

module.exports = { createTask, validateTask };
