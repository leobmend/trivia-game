const express = require('express');
const errorHandling = require('../controllers/middlewares/errorHandling');

const routes = express.Router();

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const scoreRouter = require('./scoreRouter');

routes.use('/login', loginRouter);
routes.use('/user', userRouter);
routes.use('/score', scoreRouter);

routes.use(errorHandling);

module.exports = routes;
