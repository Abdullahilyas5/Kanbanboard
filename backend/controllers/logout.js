const express = require('express');


const logoutMiddleware = (req, res) => {
    res.clearCookie('token',{"path": '/',
        sameSite : 'none',
    });
    res.send('logout successful');  
};



exports.logoutMiddleware = logoutMiddleware;