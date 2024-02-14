const Joi = require("joi");

const getInfoHotelsSchemy = Joi.object({
  host: Joi.string().required(),
});

module.exports = { getInfoHotelsSchemy };
