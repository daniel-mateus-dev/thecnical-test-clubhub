const joi = require("joi");

const getInfoHotelsSchemy = joi.object({
  host: joi.string().required(),
});

module.exports = { getInfoHotelsSchemy };
