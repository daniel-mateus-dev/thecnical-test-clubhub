const validatorSchemy = (schemy, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schemy.validate(data, { abortEarly: false });
    if (error != null) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((item) => item.message),
      });
    }
    next();
  };
};

module.exports = { validatorSchemy };
