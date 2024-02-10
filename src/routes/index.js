const express = require("express");
const routes = express();

const healthRoutes = require("../routes/health");
const companyRoutes = require("../routes/company");
const ownerRoutes = require("../routes/owner");
const contactRoutes = require("../routes/contact");
const franchisesRoutes = require("../routes/franchises");
const informationRoutes = require("../routes/information");
const locationRoutes = require("../routes/location");

const { notFoundController } = require("../controllers/notFound.controller");

routes.use("/health", healthRoutes);
routes.use("/company", companyRoutes);
routes.use("/owner", ownerRoutes);
routes.use("/contact", contactRoutes);
routes.use("/franchises", franchisesRoutes);
routes.use("/information", informationRoutes);
routes.use("/location", locationRoutes);
routes.use("*", notFoundController);

module.exports = routes;
