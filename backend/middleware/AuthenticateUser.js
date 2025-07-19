const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, "secret");

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { checkUser };
