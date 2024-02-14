const { City } = require("../database/models/city");
const { Contact } = require("../database/models/contact");
const { Country } = require("../database/models/country");
const { Location } = require("../database/models/location");
const { Owner } = require("../database/models/owner");

const contactController = {
  getAll: async (req, res) => {
    try {
      const contacts = await Contact.findAll({
        include: [
          { model: Owner },
          {
            model: Location,
            include: [
              {
                model: City,
              },
              {
                model: Country,
              },
            ],
          },
        ],
      });
      res.status(200).json({
        status: 200,
        message: "Successfully get all contacts",
        contacts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Failed to get all contacts",
        error,
      });
    }
  },
  createContact: async (req, res) => {
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json({
        status: 201,
        message: "Successfully create contact",
        contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create contact",
        error,
      });
    }
  },
  updateContact: async (req, res) => {
    try {
      const contact = await Contact.findOne({
        where: { id: req.body.id },
      });

      if (!contact) {
        res.status(404).json({
          status: 404,
          message: "Contact not found",
        });
        return;
      }

      const update = await Contact.update(req.body, {
        where: { id: req.body.id },
      });

      res.status(200).json({
        status: 200,
        message: "Successfully update contact",
        contact: update,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to update contact",
        error,
      });
    }
  },
};

module.exports = { contactController };
