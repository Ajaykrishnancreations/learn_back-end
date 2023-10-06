const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function verifyAccessToken(req, res, next) {
  const token = req.headers.access_token; 

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Access token is invalid' });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  verifyAccessToken,
};
