const Joi = require("joi");

const createLocationSchemy = Joi.object({
  code: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  zip_code: Joi.number().required(),
});

const updateLocationSchemy = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  code: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  zip_code: Joi.number().required(),
});

module.exports = { createLocationSchemy, updateLocationSchemy };
