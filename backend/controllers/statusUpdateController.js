const Board = require('../models/Board');
const Task = require('../models/Task');

const updateTaskStatusInBoard = async (req, res) => {
  try {
    const taskId = req.params.id;  // Task ID to update
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Find the board containing this task ID in its Tasks array
    const board = await Board.findOne({ Tasks: taskId });

    if (!board) {
      return res.status(404).json({ error: "Board containing task not found" });
    }

    // Update the task directly in Task collection
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task status updated successfully",
      task: updatedTask,
      boardId: board._id,
    });
  } catch (error) {
    console.error("Error updating task status in board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateTaskStatusInBoard };
