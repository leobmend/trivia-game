const express = require('express');

const userAuthentication = require('../controllers/middlewares/userAuthentication');
const scoreController = require('../controllers/scoreController');

const scoreRouter = express.Router();

scoreRouter.post(
  '/',
  userAuthentication,
  scoreController.register,
);

module.exports = scoreRouter;
