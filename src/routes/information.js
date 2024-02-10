const express = require("express");
const routes = express.Router();

const { informationController } = require("../controllers/information.controller");

routes.get("/", informationController.getAll);

module.exports = routes;
