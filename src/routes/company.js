const express = require("express");
const routes = express.Router();

const { companyController } = require("../controllers/company.controller");

routes.get("/", companyController.getAll);

module.exports = routes;
