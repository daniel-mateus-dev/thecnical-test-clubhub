const express = require("express");
const routes = express.Router();

const { locationController } = require("../controllers/location.controller");

routes.get("/", locationController.getAll);

module.exports = routes;
