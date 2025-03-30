const express = require('express');
const Task = require('../models/Task.js');
const { check, validationResult } = require("express-validator");

const createTask = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { title, description, subtask, tstatus } = req.body;

        const newtask = await Task.create({
            title,
            description,
            subtask,
            tstatus
        });

        res.send("Task is created successfully!");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const validateTask = [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("subtask").isArray().withMessage("Subtask must be an array"),
];

module.exports = { createTask, validateTask };
