const express = require('express');
const errorHandling = require('../controllers/middlewares/errorHandling');

const routes = express.Router();

const loginRouter = require('./loginRouter');

routes.use('/login', loginRouter);

routes.use(errorHandling);

module.exports = routes;
