const userSchema = (sequelize, DataTypes) => {
  const userModel = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gravatarUrl: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  userModel.associate = (models) => {
    userModel.hasMany(models.Config, { foreignKey: 'user_id', as: 'configs' });
    userModel.hasMany(models.Score, { foreignKey: 'user_id', as: 'scores' });
  };

  return userModel;
};

module.exports = userSchema;
