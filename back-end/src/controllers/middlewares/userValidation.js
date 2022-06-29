const rescue = require('express-rescue');
const Joi = require('joi');

const CustomError = require('../../utils/customError');

const newUserSchema = Joi.object(
  {
    name: Joi.string().min(3).required(),
    email: Joi.string().regex(/\w.+@\w.+[.]\w.+/i).required(),
    password: Joi.string().min(6),
    gravatarUrl: Joi.string().required(),
  },
).messages(
  {
    'any.required': '{#label} is required',
    'string.pattern.base': '{#label} must be a valid email',
    'string.base': '{#label} must be a string',
    'string.min': '{#label} length must be at least {#limit} characters long',
  },
);

const userValidation = rescue((req, _res, next) => {
  const { name, email, password, gravatarUrl } = req.body;
  const { error } = newUserSchema.validate({ name, email, password, gravatarUrl });

  if (error) throw new CustomError(400, error.message);

  next();
});

module.exports = userValidation;
