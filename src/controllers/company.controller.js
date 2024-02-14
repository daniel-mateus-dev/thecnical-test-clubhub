const { Company } = require("../database/models/company");
const { Owner } = require("../database/models/owner");
const { Contact } = require("../database/models/contact");
const { Franchises } = require("../database/models/franchises");
const { Information } = require("../database/models/information");
const { Location } = require("../database/models/location");
const { City } = require("../database/models/city");
const { Country } = require("../database/models/country");

const companyController = {
  getById: async (req, res) => {
    try {
      const company = await Company.findByPk(req.params.id);

      if (!company) {
        res.status(404).json({
          status: 404,
          message: "Company not found",
        });
        return;
      }

      const owner = await Owner.findOne({
        where: {
          companyId: req.params.id,
        },
      });

      if (!owner) {
        res.status(200).json({
          status: 200,
          message: "Owner not relacioned",
          company,
        });
        return;
      }

      const data = await Promise.all([
        Contact.findAll({
          where: { ownerId: owner.dataValues.id },
          include: [
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
        }),
        Franchises.findAll({
          where: { ownerId: owner.dataValues.id },
          include: [
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
        }),
        Information.findAll({
          where: { ownerId: owner.dataValues.id },
          include: [
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
        }),
      ]);

      res.status(200).json({
        status: 200,
        message: "Successfully get company",
        company: {
          owner: {
            ...owner.dataValues,
            contact: data[0],
            franchises: data[1],
            information: data[2],
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get company",
        error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const companies = await Company.findAll();
      res.status(200).json({
        status: 200,
        message: "Successfully get all companies",
        companies,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get all companies",
        error,
      });
    }
  },
  createCompany: async (req, res) => {
    try {
      const company = await Company.create();
      res.status(201).json({
        status: 201,
        message: "Successfully create company",
        company,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create company",
        error,
      });
    }
  },
};

module.exports = { companyController };
