const Joi = require("joi");

const createContactSchemy = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  ownerId: Joi.string().guid({ version: "uuidv4" }).required(),
  locationId: Joi.string().guid({ version: "uuidv4" }).required(),
});

const updateContactSchemy = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  ownerId: Joi.string().guid({ version: "uuidv4" }).required(),
  locationId: Joi.string().guid({ version: "uuidv4" }).required(),
});

module.exports = { createContactSchemy, updateContactSchemy };
