const express = require("express");
const routes = express.Router();

const { franchisesController } = require("../controllers/franchises.controller");

routes.get("/", franchisesController.getAll);

module.exports = routes;
