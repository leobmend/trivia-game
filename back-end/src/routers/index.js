const express = require('express');
const errorHandling = require('../controllers/middlewares/errorHandling');

const routes = express.Router();

// const usersRouter = require('./usersRouter');

// routes.use(usersRouter);

routes.use(errorHandling);

module.exports = routes;
