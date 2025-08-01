const express = require('express');


const logoutMiddleware = (req, res) => {
    try {
        res.clearCookie('token', {
            path: '/',
            httpOnly: true,
            sameSite: 'None', // Use 'Lax' for local dev, 'None' + secure: true for production HTTPS
            secure: true,
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).json({ message: 'Logout failed', error: err.message });
    }
};
exports.logoutMiddleware = logoutMiddleware;