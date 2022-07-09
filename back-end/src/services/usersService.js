const { User } = require('../database/models');
const CustomError = require('../utils/customError');
const { generateToken } = require('../utils/jwtUtils');
const { hashPassword, comparePassword } = require('../utils/bcryptUtils');

const checkIfUserExists = async (id) => {
  const oldUser = await User.findByPk(id);

  if (!oldUser) throw new CustomError(404, 'User does not exist');

  return oldUser;
};

const authentication = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new CustomError(404, 'User does not exist');

  if (!(await comparePassword(password, user.password))) {
    throw new CustomError(401, 'Wrong credentials');
  }

  const jwtToken = generateToken(user);

  return { jwtToken, id: user.id };
};

const create = async ({ name, email, password }) => {
  const userByEmail = await User.findOne({ where: { email } });

  if (userByEmail) throw new CustomError(409, 'The e-mail already exists');

  const hash = await hashPassword(password);

  const newUser = await User.create({ name: name || 'Player', email, password: hash });

  const jwtToken = generateToken(newUser);

  return { jwtToken, id: newUser.id };
};

const getById = async (id) => {
  await checkIfUserExists(id);

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'admin', 'active'] }, 
  });

  return user;
};

const update = async (id, { name, email }) => {
  await checkIfUserExists(id);

  const userByEmail = await User.findOne({ where: { email } });

  if (userByEmail && userByEmail.id !== id) {
    throw new CustomError(409, 'This e-mail already exists'); 
  }

  await User.update(
    { name, email },
    { where: { id } },
  );

  const updatedUser = { name, email };

  return updatedUser;
};

const updatePassword = async (id, { password }) => {
  const oldUser = await checkIfUserExists(id);

  if (oldUser.password !== password) {
    await User.update(
      { password },
      { where: { id } },
    );
  }
};

const remove = async (id) => {
  await checkIfUserExists(id);

  await User.destroy({ where: { id } });
};

const usersService = {
  authentication,
  create,
  getById,
  update,
  updatePassword,
  remove,
};

module.exports = usersService;
