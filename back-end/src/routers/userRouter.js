const express = require('express');

const usersController = require('../controllers/usersController');
const userAuthentication = require('../controllers/middlewares/userAuthentication');
const adminAuthorization = require('../controllers/middlewares/adminAuthorization');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  userAuthentication,
  adminAuthorization,
  usersController.signUp,
);

module.exports = userRouter;
