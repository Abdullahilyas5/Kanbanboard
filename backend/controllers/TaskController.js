const Task = require("../models/Task");
const Board = require("../models/Board");

// Update a task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const update = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, update, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};

// Delete a task and remove from board
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    // Remove task from all boards
    await Board.updateMany({ Tasks: taskId }, { $pull: { Tasks: taskId } });
    const deleted = await Task.findByIdAndDelete(taskId);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};

module.exports = { updateTask, deleteTask };