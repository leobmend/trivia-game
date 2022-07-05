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
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      difficulty: {
        allowNull: false,
        type:Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'type',
      },
      playedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        field: 'played_at',
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
    await queryInterface.dropTable("scores");
  },
};
