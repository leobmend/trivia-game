const usersService = require('../services/usersService');

const login = async (req, res, _next) => {
  const { email, password } = req.body;

  const jwtToken = await usersService.authentication({ email, password });

  res.status(201).json({ token: jwtToken });
};

const usersController = {
  login,
};

module.exports = usersController;
