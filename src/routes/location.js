const express = require("express");
const routes = express.Router();

const { locationController } = require("../controllers/location.controller");
const {
  validatorSchemy,
} = require("../middlewares/validatorSchemy.middleware");
const {
  createLocationSchemy,
  updateLocationSchemy,
} = require("../middlewares/schema/location.schemy");

routes.get("/", locationController.getAll);
routes.post(
  "/",
  validatorSchemy(createLocationSchemy, "body"),
  locationController.createLocation
);
routes.put(
  "/",
  validatorSchemy(updateLocationSchemy, "body"),
  locationController.updateLocation
);

module.exports = routes;
