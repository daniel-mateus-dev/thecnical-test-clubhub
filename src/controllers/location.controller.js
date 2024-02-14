const { City } = require("../database/models/city");
const { Country } = require("../database/models/country");
const { Location } = require("../database/models/location");
const {
  countryCodeToCountryName,
} = require("../helper/buildLocationStructure");

const locationController = {
  getAll: async (req, res) => {
    try {
      const location = await Location.findAll({
        include: [{ model: City }, { model: Country }],
      });
      res.status(200).json({
        status: 200,
        message: "Successfully get all locations",
        location,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get all locations",
        error,
      });
    }
  },
  createLocation: async (req, res) => {
    try {
      const countryName = countryCodeToCountryName(req.body.code);

      if (countryName === "Country Not Found") {
        res.status(400).json({
          status: 400,
          message: "Country code not found",
        });
        return;
      }

      const countryWanted = await Country.findOrCreate({
        where: {
          code: req.body.code.toUpperCase(),
          country: countryCodeToCountryName(req.body.code),
        },
        defaults: {
          code: req.body.code.toUpperCase(),
          country: countryCodeToCountryName(req.body.code),
        },
      });

      const country = countryWanted[0].dataValues;

      const cityWanted = await City.findOrCreate({
        where: {
          city: req.body.city,
          countryId: country.id,
        },
        defaults: {
          city: req.body.city,
          countryId: country.id,
        },
      });

      const city = cityWanted[0].dataValues;

      const location = await Location.create({
        address: req.body.address,
        zip_code: req.body.zip_code,
        cityId: city.id,
        countryId: country.id,
      });

      res.status(201).json({
        status: 201,
        message: "Successfully created location",
        location,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create location",
        error,
      });
    }
  },
  updateLocation: async (req, res) => {
    try {
      const location = await Location.findOne({
        where: { id: req.body.id },
      });

      if (!location) {
        res.status(404).json({
          status: 404,
          message: "Location not found",
        });
        return;
      }

      const countryName = countryCodeToCountryName(req.body.code);

      if (countryName === "Country Not Found") {
        res.status(400).json({
          status: 400,
          message: "Country code not found",
        });
        return;
      }

      const countryWanted = await Country.findOrCreate({
        where: {
          code: req.body.code.toUpperCase(),
          country: countryCodeToCountryName(req.body.code),
        },
        defaults: {
          code: req.body.code.toUpperCase(),
          country: countryCodeToCountryName(req.body.code),
        },
      });

      const country = countryWanted[0].dataValues;

      const cityWanted = await City.findOrCreate({
        where: {
          city: req.body.city,
          countryId: country.id,
        },
        defaults: {
          city: req.body.city,
          countryId: country.id,
        },
      });

      const city = cityWanted[0].dataValues;

      const locationUpdated = await Location.update(
        {
          address: req.body.address,
          zip_code: req.body.zip_code,
          cityId: city.id,
          countryId: country.id,
        },
        {
          where: { id: req.body.id },
        }
      );

      res.status(200).json({
        status: 200,
        message: "Successfully updated location",
        location: locationUpdated,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to update location",
        error,
      });
    }
  },
};

module.exports = { locationController };
