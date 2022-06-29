const express = require('express');
const errorHandling = require('../controllers/middlewares/errorHandling');

const routes = express.Router();

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');

routes.use('/login', loginRouter);
routes.use('/user', userRouter);

routes.use(errorHandling);

module.exports = routes;
