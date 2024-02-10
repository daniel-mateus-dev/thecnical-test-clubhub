const { Company } = require("../database/models/company");

const companyController = {
  getAll: async (req, res) => {
    const companies = await Company.findAll();
    res.status(200).json({
      status: 200,
      message: "Successfully get all companies",
      companies,
    });
  },
};

module.exports = { companyController };
