const express = require("express");
const routes = express.Router();

const { ownerController } = require("../controllers/owner.controller");
const {
  validatorSchemy,
} = require("../middlewares/validatorSchemy.middleware");
const {
  createOwnerSchema,
  updateOwnerSchema,
} = require("../middlewares/schema/owner.schemy");

routes.get("/", ownerController.getAll);
routes.post(
  "/",
  validatorSchemy(createOwnerSchema, "body"),
  ownerController.createOwner
);
routes.put(
  "/",
  validatorSchemy(updateOwnerSchema, "body"),
  ownerController.updateOwner
);

module.exports = routes;
