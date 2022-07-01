const { User } = require('../database/models');
const CustomError = require('../utils/customError');
const { generateToken } = require('../utils/jwtUtils');

const checkIfUserExists = async (id) => {
  const oldUser = await User.findByPk(id);

  if (!oldUser) throw new CustomError(404, 'User does not exist');
};

const authentication = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new CustomError(404, 'User does not exist');

  if (user.password !== password) throw new CustomError(401, 'Wrong credentials');

  const jwtToken = generateToken(user);

  return { jwtToken, name: user.name };
};

const create = async ({ name, email, password, gravatarUrl }) => {
  const userByEmail = await User.findOne({ where: { email } });

  if (userByEmail) throw new CustomError(409, 'The e-mail already exists');

  const newUser = await User.create({ name, email, password, gravatarUrl });

  const jwtToken = generateToken(newUser);

  return jwtToken;
};

const update = async (id, { name, email, gravatarUrl }) => {
  await checkIfUserExists(id);

  const userByEmail = await User.findOne({ where: { email } });

  if (userByEmail && userByEmail.id !== id) {
    throw new CustomError(409, 'This e-mail already exists'); 
  }

  await User.update(
    { name, email, gravatarUrl },
    { where: { id } },
  );

  const updatedUser = { name, email, gravatarUrl };

  return updatedUser;
};

const remove = async (id) => {
  await checkIfUserExists(id);

  await User.destroy({ where: { id } });
};

const usersService = {
  authentication,
  create,
  update,
  remove,
};

module.exports = usersService;
