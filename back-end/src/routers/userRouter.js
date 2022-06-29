const express = require('express');

const usersController = require('../controllers/usersController');
const userAuthentication = require('../controllers/middlewares/userAuthentication');
const userValidation = require('../controllers/middlewares/userValidation');
const userAuthorization = require('../controllers/middlewares/userAuthorization');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  userValidation,
  usersController.signUp,
);

userRouter.put(
  '/:id',
  userAuthentication,
  userAuthorization,
  userValidation,
  usersController.update,
);

userRouter.delete(
  '/:id',
  userAuthentication,
  userAuthorization,
  usersController.remove,
);

module.exports = userRouter;
