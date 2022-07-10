const configSchema = (sequelize, DataTypes) => {
  const configModel = sequelize.define("Config", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    questionsType: DataTypes.STRING,
    userId: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'configs',
    underscored: true,
  });

  configModel.associate = (models) => {
    configModel.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
  
  return configModel;
};

module.exports = configSchema;
