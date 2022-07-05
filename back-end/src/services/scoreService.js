const { Score, User } = require('../database/models');
const CustomError = require('../utils/customError');

const checkIfUserExists = async (id) => {
  const oldUser = await User.findByPk(id);

  if (!oldUser) throw new CustomError(404, 'User does not exist');

  return oldUser;
};

const create = async ({ userId, score, category, difficulty, type }) => {
  await checkIfUserExists(userId);

  const newScore = await Score.create({ userId, score, category, difficulty, type });
  return newScore;
};

const scoreService = {
  create,
};

module.exports = scoreService;
