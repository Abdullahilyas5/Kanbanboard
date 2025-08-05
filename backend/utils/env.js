// utils/env.js

const cookieSettings = {
  httpOnly: true,
  secure: true,             // Force HTTPS in production
  sameSite: 'None',         // Required for cross-site cookies with secure=true
  path: '/',
};

module.exports = {
  isProduction: true,
  cookieSettings,
};
