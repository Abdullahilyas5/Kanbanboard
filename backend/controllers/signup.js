const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User.js");

const signupMiddleware = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "please enter the value , empty field is not accepted"
      })
    }

    const isuser = await User.findOne({ email });
    if (isuser) {
      return res.json({
        message: "user is already exist"
      })
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await createdUser.save();

    
    
    console.log("token created successfully:", process.env.JWT_SECRET); 

    const token =  jwt.sign({ email: req.body.email },process.env.JWT_SECRET, { expiresIn: "7d" });
  
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      path: '/',
    });



    res.status(201).json({ token: token,
      user : createdUser,
      boards : [],
      tasks : [],
      status: 201,
      message: "User created successfully" });
    

  } catch (err) {

    res.status(400).json({ message: err.message, token: null });
  }
};

const validateSignup = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password").isLength({ min: 3 }).withMessage("Password must be at least 6 characters long"),
];

module.exports = { signupMiddleware, validateSignup };
