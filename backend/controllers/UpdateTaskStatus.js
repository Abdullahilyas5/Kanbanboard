const Task = require("../models/Task");
const ALLOWED_STATUSES = ["Todo", "Doing", "Done"];

// Atomic subtask update (PATCH /tasks/:taskId/subtasks/:subtaskId)
const updateSubtask = async (req, res) => {
  const { taskId, subtaskId } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, "subtasks._id": subtaskId },
      { $set: { "subtasks.$.completed": completed } },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task or subtask not found" });
    return res.json({ message: "Subtask updated", task });
  } catch (err) {
    return res.status(500).json({ message: "Error updating subtask", error: err.message });
  }
};

// Task status update (PATCH /tasks/:taskId/status)
const updateStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;


  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json({ message: "Status updated", task });
  } catch (err) {
    return res.status(500).json({ message: "Error updating status", error: err.message });
  }
};

module.exports = { updateSubtask, updateStatus };
