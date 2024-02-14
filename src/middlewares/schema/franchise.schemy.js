const Joi = require("joi");

const createFranchiseSchemy = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  ownerId: Joi.string().guid({ version: "uuidv4" }).required(),
  locationId: Joi.string().guid({ version: "uuidv4" }).required(),
});

const updateFranchiseSchemy = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  ownerId: Joi.string().guid({ version: "uuidv4" }).required(),
  locationId: Joi.string().guid({ version: "uuidv4" }).required(),
});

module.exports = { createFranchiseSchemy, updateFranchiseSchemy };
