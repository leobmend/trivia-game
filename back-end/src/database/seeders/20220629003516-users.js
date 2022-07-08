require('dotenv').config();

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [
        {
          id: 1,
          name: 'Leonardo',
          admin: true,
          email: process.env.API_ADMIN_EMAIL,
          password: process.env.API_ADMIN_PASSWORD,
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
