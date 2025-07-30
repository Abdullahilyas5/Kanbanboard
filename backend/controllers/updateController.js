const Board = require('../models/Board'); // make sure you have this model
const express = require('express');

// PUT /boards/:id
const updateBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        const updatedData = req.body; // { title: "New Title", ... }

        // Update the board by ID
        const updatedBoard = await Board.findByIdAndUpdate(
            boardId,
            updatedData,
            { new: true } // return updated board
        );

        if (!updatedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({
            message: 'Board updated successfully',
            board: updatedBoard
        });
    } catch (error) {
        console.error('Error updating board:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { updateBoard };
