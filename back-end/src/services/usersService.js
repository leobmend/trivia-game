const { User } = require('../database/models');
const CustomError = require('../utils/customError');
const { generateToken } = require('../utils/jwtUtils');

const authentication = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new CustomError(404, 'User does not exist');

  if (user.password !== password) throw new CustomError(401, 'Wrong credentials');

  const jwtToken = generateToken(user);

  return jwtToken;
};

const usersService = {
  authentication,
};

module.exports = usersService;
