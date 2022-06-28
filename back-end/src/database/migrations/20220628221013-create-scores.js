module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("scores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ranking: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      difficulty: {
        allowNull: false,
        type:Sequelize.STRING,
      },
      questionsType: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'questions_type',
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("configs");
  },
};
