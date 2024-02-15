const { Franchises } = require("../database/models/franchises");
const { Country } = require("../database/models/country");
const { City } = require("../database/models/city");
const { Location } = require("../database/models/location");
const { Owner } = require("../database/models/owner");
const { sendMessage } = require("../services/kafka.service");
const { Hotel } = require("../database/models/hotel");

const franchisesController = {
  getAll: async (req, res) => {
    try {
      const franchises = await Franchises.findAll({
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
        message: "Successfully get all franchises",
        franchises,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get all franchises",
        error,
      });
    }
  },
  createFranchises: async (req, res) => {
    try {
      const franchises = await Franchises.create(req.body);
      const hotel = await Hotel.create({
        franchiseId: franchises.dataValues.id,
        url: req.body.url,
      });
      await sendMessage("start-save-data", {
        url: req.body.url,
        hotelId: hotel.dataValues.id,
      });
      res.status(201).json({
        status: 201,
        message: "Successfully create franchises",
        franchises,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create franchises",
        error,
      });
    }
  },
  updateFranchises: async (req, res) => {
    try {
      const franchise = await Franchises.findOne({
        where: { id: req.body.id },
      });

      if (!franchise) {
        res.status(404).json({
          status: 404,
          message: "franchise not found",
        });
        return;
      }

      const update = await Franchises.update(req.body, {
        where: { id: req.body.id },
      });

      res.status(200).json({
        status: 200,
        message: "Successfully update franchise",
        franchise: update,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to update franchise",
        error,
      });
    }
  },
};

module.exports = { franchisesController };
