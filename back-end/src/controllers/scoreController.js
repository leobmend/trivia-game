const rescue = require('express-rescue');

const scoreService = require('../services/scoreService');

const register = rescue(async (req, res, _next) => {
  const { id: userId } = req.user;
  const { score, category, difficulty, type } = req.body;

  const newScore = await scoreService.create(
    { userId, score, category, difficulty, type },
  );

  res.status(201).json(newScore);
});

const scoreController = {
  register,
};

module.exports = scoreController;
