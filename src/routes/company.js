const express = require("express");
const routes = express.Router();

const { companyController } = require("../controllers/company.controller");

routes.get("/", companyController.getAll);
routes.get("/:id", companyController.getById);
routes.post("/", companyController.createCompany);

module.exports = routes;
