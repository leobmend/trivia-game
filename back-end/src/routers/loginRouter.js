const express = require('express');

const usersController = require('../controllers/usersController');
const loginValidation = require('../controllers/middlewares/loginValidation');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  loginValidation,
  usersController.login,
);

module.exports = loginRouter;
