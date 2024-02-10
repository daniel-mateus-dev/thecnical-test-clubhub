const express = require("express");
const routes = express.Router();

const { hotelsController } = require("../controllers/hotels.controller");
const { getInfoHotelsSchemy } = require("../middlewares/schema/hotels.schemy");
const {
  validatorSchemy,
} = require("../middlewares/validatorSchemy.middleware");

routes.get(
  "/",
  validatorSchemy(getInfoHotelsSchemy, "query"),
  hotelsController.getInfo
);

module.exports = routes;
