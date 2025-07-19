const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');

const loginMiddleware = async (req, res) => {
    try {
        const errors = validationResult(req);

        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await User.findOne({ email });

        if (!result) {
            return res.status(401).json({ message: 'Login failed' });
        }

        const match = await bcrypt.compare(password, result.password);
        
        if (!match) {
            return res.status(401).json({ message: 'Login failed' });
        }

        const token = jwt.sign({ email }, "secret", {expiresIn :"7d"});

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            path: '/',
        });


        res.status(200).json({ message: 'Login successful',
            user : result ,
            message  : "login successfully",
            token: token }); 
    } catch (error) {
        res.status(400).json({ message: error.message, token: null });
    }
}

const validatelogin = [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 3 }).withMessage("Password must be at least 6 characters long"),
];

module.exports = { loginMiddleware, validatelogin };