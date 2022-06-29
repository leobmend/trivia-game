const rescue = require('express-rescue');
const CustomError = require('../../utils/customError');

const loginValidation = rescue((req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) throw new CustomError(400, 'Some required fields are missing');

  next();
});

module.exports = loginValidation;
