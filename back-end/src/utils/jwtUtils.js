const jwt = require('jsonwebtoken');

const CustomError = require('./customError');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const generateToken = (user) => (
  jwt.sign({ data: { id: user.id, admin: user.admin } }, secret, jwtConfig)
);

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new CustomError(401, 'Expired or invalid token');
  }
};

const jwtUtils = {
  generateToken,
  decodeToken,
};

module.exports = jwtUtils;
