const { Information } = require("../database/models/information");
const { Country } = require("../database/models/country");
const { City } = require("../database/models/city");
const { Location } = require("../database/models/location");
const { Owner } = require("../database/models/owner");

const informationController = {
  getAll: async (req, res) => {
    try {
      const information = await Information.findAll({
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
        message: "Successfully get all informations",
        information,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get all informations",
        error,
      });
    }
  },
  createInformation: async (req, res) => {
    try {
      const information = await Information.create(req.body);
      res.status(201).json({
        status: 201,
        message: "Successfully create information",
        information,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create information",
        error,
      });
    }
  },
  updateInformation: async (req, res) => {
    try {
      const information = await Information.findOne({
        where: { id: req.body.id },
      });

      if (!information) {
        res.status(404).json({
          status: 404,
          message: "Information not found",
        });
        return;
      }

      const update = await Information.update(req.body, {
        where: { id: req.body.id },
      });

      res.status(200).json({
        status: 200,
        message: "Successfully update information",
        information: update,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to update information",
        error,
      });
    }
  },
};

module.exports = { informationController };
