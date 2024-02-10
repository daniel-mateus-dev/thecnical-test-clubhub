const { Location } = require("../database/models/location");

const locationController = {
  getAll: async (req, res) => {
    const location = await Location.findAll();
    res.status(200).json({
      status: 200,
      message: "Successfully get all locations",
      location,
    });
  },
};

module.exports = { locationController };
