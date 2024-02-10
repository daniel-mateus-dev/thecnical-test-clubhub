const express = require("express");
const routes = express.Router();

const { contactController } = require("../controllers/contact.controller");

routes.get("/", contactController.getAll);

module.exports = routes;
