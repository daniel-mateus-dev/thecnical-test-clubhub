const Joi = require("joi");

const createInformationSchemy = Joi.object({
  name: Joi.string().required(),
  tax_number: Joi.number().required(),
  ownerId: Joi.string().guid({ version: "uuidv4" }).required(),
  locationId: Joi.string().guid({ version: "uuidv4" }).required(),
});

const updateInformationSchemy = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  name: Joi.string().required(),
  tax_number: Joi.number().required(),
  ownerId: Joi.string().guid({ version: "uuidv4" }).required(),
  locationId: Joi.string().guid({ version: "uuidv4" }).required(),
});

module.exports = { createInformationSchemy, updateInformationSchemy };
