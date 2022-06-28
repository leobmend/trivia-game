const errorHandling = (error, _req, res, _next) => {
  res.status(error.code || 500).json({ message: error.message });
};

module.exports = errorHandling;
