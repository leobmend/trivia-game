const express = require('express-rescue');

const usersService = require('../services/usersService');

const login = express(async (req, res, _next) => {
  const { email, password } = req.body;

  const { jwtToken, id } = await usersService.authentication({ email, password });

  res.status(200).json({ token: jwtToken, id });
});

const signUp = express(async (req, res, _next) => {
  const { name, email, password } = req.body;

  const { jwtToken, id } = await usersService.create({ name, email, password });

  res.status(201).json({ token: jwtToken, id });
});

const getById = express(async (req, res, _next) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  res.status(200).json(user);
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
  getById,
  update,
  remove,
};

module.exports = usersController;
