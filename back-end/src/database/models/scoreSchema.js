const scoreSchema = (sequelize, DataTypes) => {
  const scoreModel = sequelize.define("Score", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: DataTypes.INTEGER,
    category: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    type: DataTypes.STRING,
    playedAt: DataTypes.DATE,
    userId: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'scores',
    underscored: true,
  });

  scoreModel.associate = (models) => {
    scoreModel.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
  
  return scoreModel;
};

module.exports = scoreSchema;
