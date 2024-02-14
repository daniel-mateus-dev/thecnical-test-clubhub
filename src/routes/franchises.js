const express = require("express");
const routes = express.Router();

const {
  franchisesController,
} = require("../controllers/franchises.controller");
const {
  validatorSchemy,
} = require("../middlewares/validatorSchemy.middleware");
const {
  createFranchiseSchemy,
  updateFranchiseSchemy,
} = require("../middlewares/schema/franchise.schemy");

routes.get("/", franchisesController.getAll);
routes.post(
  "/",
  validatorSchemy(createFranchiseSchemy, "body"),
  franchisesController.createFranchises
);
routes.put(
  "/",
  validatorSchemy(updateFranchiseSchemy, "body"),
  franchisesController.updateFranchises
);

module.exports = routes;
