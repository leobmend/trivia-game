const express = require('express-rescue');

const usersService = require('../services/usersService');

const login = express(async (req, res, _next) => {
  const { email, password } = req.body;

  const { jwtToken, name } = await usersService.authentication({ email, password });

  res.status(200).json({ token: jwtToken, name });
});

const signUp = express(async (req, res, _next) => {
  const { name, email, password } = req.body;

  const jwtToken = await usersService.create({ name, email, password });

  res.status(201).json({ token: jwtToken });
});

const update = express(async (req, res, _next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  const updatedUser = await usersService.update(
    parseInt(id, 10),
    { name, email },
  );

  res.status(200).json(updatedUser);
});

const remove = express(async (req, res, _next) => {
  const { id } = req.params;
  
  await usersService.remove(parseInt(id, 10));

  res.status(200).end();
});

const usersController = {
  login,
  signUp,
  update,
  remove,
};

module.exports = usersController;
