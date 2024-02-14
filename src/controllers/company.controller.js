const { Company } = require("../database/models/company");

const companyController = {
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
