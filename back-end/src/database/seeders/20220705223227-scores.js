require('dotenv').config();

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('scores',
      [{
        id: 1,
        score: 53,
        category: 'any',
        difficulty: 'any',
        type: 'any',
        user_id: 1
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
