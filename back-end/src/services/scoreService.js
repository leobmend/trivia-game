const { Score, User, sequelize } = require('../database/models');
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

const getRanking = async () => {
  const ranking = await User.findAll({
    attributes: [
      'id', 'name', 'email', [sequelize.fn('MAX', sequelize.col('scores.score')), 'max_score'],
    ],
    include: {
      model: Score,
      as: 'scores',
      attributes: [],
    },
    group: ['User.id', 'name', 'email'],
  });

  return ranking;
};

const scoreService = {
  create,
  getRanking,
};

module.exports = scoreService;
