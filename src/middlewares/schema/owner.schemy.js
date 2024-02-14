const Joi = require("joi");

const createOwnerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  companyId: Joi.string().guid({ version: "uuidv4" }).required(),
});

const updateOwnerSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

module.exports = { createOwnerSchema, updateOwnerSchema };
