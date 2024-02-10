const { Franchises } = require("../database/models/franchises");

const franchisesController = {
  getAll: async (req, res) => {
    const franchises = await Franchises.findAll();
    res.status(200).json({
      status: 200,
      message: "Successfully get all franchises",
      franchises,
    });
  },
};

module.exports = { franchisesController };
