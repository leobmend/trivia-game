const rescue = require('express-rescue');
const Joi = require('joi');

const CustomError = require('../../utils/customError');

const userSchema = Joi.object(
  {
    name: Joi.string().min(3).required(),
    email: Joi.string().regex(/\w.+@\w.+[.]\w.+/i).required(),
  },
).messages(
  {
    'any.required': '{#label} is required',
    'string.pattern.base': '{#label} must be a valid email',
    'string.base': '{#label} must be a string',
    'string.min': '{#label} length must be at least {#limit} characters long',
  },
);

const passwordSchema = Joi.object(
  {
    password: Joi.string().min(6).required(),
  },
).messages(
  {
    'any.required': '{#label} is required',
    'string.base': '{#label} must be a string',
    'string.min': '{#label} length must be at least {#limit} characters long',
  },
);

const userValidation = rescue((req, _res, next) => {
  const { name, email } = req.body;
  const { error } = userSchema.validate({ name, email });

  if (error) throw new CustomError(400, error.message);

  next();
});

const passwordValidation = rescue((req, _res, next) => {
  const { password } = req.body;
  const { error } = passwordSchema.validate({ password });

  if (error) throw new CustomError(400, error.message);

  next();
});

const validations = {
  userValidation,
  passwordValidation,
};

module.exports = validations;
