const rescue = require('express-rescue');

const CustomError = require('../../utils/customError');

const adminAuthorization = rescue((req, _res, next) => {
  const { admin: isAdmin } = req.user;

  if (!isAdmin) throw new CustomError(401, 'Unauthorized user');

  next();
});

module.exports = adminAuthorization;
