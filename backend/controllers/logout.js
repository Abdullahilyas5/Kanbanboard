// controllers/logout.js
const { cookieSettings } = require("../utils/env.js");

const logoutMiddleware = (req, res) => {
  try {
    res.clearCookie("token", cookieSettings);
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};

module.exports = { logoutMiddleware };
