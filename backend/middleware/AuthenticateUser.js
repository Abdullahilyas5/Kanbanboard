const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, "secret"); // use env var!
    const user = await User.findById(decoded.id); // Use ID from token payload

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { checkUser };
