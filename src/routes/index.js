const express = require("express");
const routes = express();

const { healthController } = require("../controllers/health.controller");
const { notFoundController } = require("../controllers/notFound.controller");

routes.use("/health", healthController);
routes.use("*", notFoundController);

module.exports = routes;
