const express = require("express");
const routes = express.Router();

const { notFoundController } = require("../controllers/notFound.controller");

routes.get("/", notFoundController);

module.exports = routes;
