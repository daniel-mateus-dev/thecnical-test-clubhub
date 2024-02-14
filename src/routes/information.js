const express = require("express");
const routes = express.Router();

const {
  informationController,
} = require("../controllers/information.controller");
const {
  validatorSchemy,
} = require("../middlewares/validatorSchemy.middleware");
const {
  createInformationSchemy,
  updateInformationSchemy,
} = require("../middlewares/schema/information.schemy");

routes.get("/", informationController.getAll);
routes.post(
  "/",
  validatorSchemy(createInformationSchemy, "body"),
  informationController.createInformation
);
routes.put(
  "/",
  validatorSchemy(updateInformationSchemy, "body"),
  informationController.updateInformation
);

module.exports = routes;
