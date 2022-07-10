const bcrypt = require('bcrypt');

const hashPassword = async (password) => (
  bcrypt.hash(password, 2)
);

const comparePassword = async (password, hash) => (
  bcrypt.compare(password, hash)
);

const bcryptUtils = {
  hashPassword,
  comparePassword,
};

module.exports = bcryptUtils;
