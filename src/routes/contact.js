const express = require("express");
const routes = express.Router();

const { contactController } = require("../controllers/contact.controller");
const {
  validatorSchemy,
} = require("../middlewares/validatorSchemy.middleware");
const {
  createContactSchemy,
  updateContactSchemy,
} = require("../middlewares/schema/contact.schemy");

routes.get("/", contactController.getAll);
routes.post(
  "/",
  validatorSchemy(createContactSchemy, "body"),
  contactController.createContact
);
routes.put(
  "/",
  validatorSchemy(updateContactSchemy, "body"),
  contactController.updateContact
);

module.exports = routes;
