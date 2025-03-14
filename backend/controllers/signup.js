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

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await createdUser.save();


    const token = jwt.sign({ email: req.body.email }, "secret", {expiresIn: "7d"});

    res.cookie('token', token, {
      httpOnly: true,  // Protects against XSS
      sameSite: "strict",  // CSRF protection
      secure: process.env.COOKIES_FLAG==='production',  // Set to true for production (https)
    });


    res.status(201).json({ message: "User created successfully" });
    res.end();

  } catch (err) {

    res.status(400).json({ message: err.message });
  }
};

const validateSignup = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password").isLength({ min: 3 }).withMessage("Password must be at least 6 characters long"),
];

module.exports = { signupMiddleware, validateSignup };
