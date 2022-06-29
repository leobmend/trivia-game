const express = require('express-rescue');

const usersService = require('../services/usersService');

const login = express(async (req, res, _next) => {
  const { email, password } = req.body;

  const jwtToken = await usersService.authentication({ email, password });

  res.status(200).json({ token: jwtToken });
});

const signUp = express(async (req, res, _next) => {
  const { name, email, password, gravatarUrl } = req.body;

  const jwtToken = await usersService.create({ name, email, password, gravatarUrl });

  res.status(201).json({ token: jwtToken });
});

const usersController = {
  login,
  signUp,
};

module.exports = usersController;
