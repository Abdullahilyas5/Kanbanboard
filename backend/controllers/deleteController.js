const Board = require('../models/Board');

// DELETE /boards/:id
const deleteBoard = async (req, res) => {
    try {
        const boardId = req.params.id;

        if(!boardId){
            return res.status(404).json({ message: "Board not found" });
        }

        const deletedBoard = await Board.findByIdAndDelete(boardId);

        if (!deletedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }

        res.status(200).json({
            message: "Board deleted successfully",
            board: deletedBoard,
        });
    } catch (error) {
        console.error("Error deleting board:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteBoard };
