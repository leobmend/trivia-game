require('dotenv').config();

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 100,
        name: 'Admin',
        admin: true,
        email: process.env.API_ADMIN_EMAIL,
        password: process.env.API_ADMIN_PASSWORD,
        gravatar_url: '...',
      },
      {
        id: 101,
        name: 'Test',
        admin: false,
        email: 'test@email.com',
        password: 'test123',
        gravatar_url: '...',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
