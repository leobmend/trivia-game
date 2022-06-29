const rescue = require('express-rescue');

const CustomError = require('../../utils/customError');
const { decodeToken } = require('../../utils/jwtUtils');

const userAuthentication = rescue((req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw CustomError(401, 'Token not found');

  const decoded = decodeToken(token);
  
  req.user = {
    id: decoded.data.id,
    admin: decoded.data.admin,
  };

  next();
});

module.exports = userAuthentication;
