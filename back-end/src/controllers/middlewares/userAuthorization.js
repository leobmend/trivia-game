const rescue = require('express-rescue');

const CustomError = require('../../utils/customError');

const userAuthorization = rescue((req, _res, next) => {
  const { id: tokenId } = req.user;
  const { id } = req.params;

  if (tokenId !== parseInt(id, 10)) throw new CustomError(401, 'Unauthorized user');

  next();
});

module.exports = userAuthorization;
