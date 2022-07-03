const express = require('express');

const usersController = require('../controllers/usersController');
const userAuthentication = require('../controllers/middlewares/userAuthentication');
const { userValidation, passwordValidation } = require('../controllers/middlewares/userValidation');
const userAuthorization = require('../controllers/middlewares/userAuthorization');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  userValidation,
  passwordValidation,
  usersController.signUp,
);

userRouter.get(
  '/:id',
  userAuthentication,
  userAuthorization,
  usersController.getById,
);

userRouter.put(
  '/:id',
  userAuthentication,
  userAuthorization,
  userValidation,
  usersController.update,
);

userRouter.put(
  '/:id/password',
  userAuthentication,
  userAuthorization,
  passwordValidation,
  usersController.changePassword,
);

userRouter.delete(
  '/:id',
  userAuthentication,
  userAuthorization,
  usersController.remove,
);

module.exports = userRouter;
