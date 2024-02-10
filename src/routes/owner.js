const express = require("express");
const routes = express.Router();

const { ownerController } = require("../controllers/owner.controller");

routes.get("/", ownerController.getAll);

module.exports = routes;
