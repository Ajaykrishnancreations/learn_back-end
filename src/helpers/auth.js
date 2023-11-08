
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '24h' });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
