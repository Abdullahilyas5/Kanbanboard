const express = require('express');
const Task = require('../models/Task.js');
const { check, validationResult } = require("express-validator");

const createTask = async (req, res) => {
    try {
        const error = validationResult(req);
        const finduser = req.user;
        
        // console.log("create task block:", finduser._id);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { title, description, subtasks, status } = req.body;


        const newtask = await Task.create({
            title,
            description,
            subtasks,
            status,
            user: finduser._id,
        });
        
        
        await newtask.save();

        res.status(200).json({ msg: "Task is created successfully!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const validateTask = [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
];

module.exports = { createTask, validateTask };
 