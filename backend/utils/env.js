// utils/env.js
const isProduction = process.env.NODE_ENV === 'production';

const cookieSettings = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
};

module.exports = {
  isProduction,
  cookieSettings,
};
