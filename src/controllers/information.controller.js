const { Information } = require("../database/models/information");

const informationController = {
  getAll: async (req, res) => {
    const information = await Information.findAll();
    res.status(200).json({
      status: 200,
      message: "Successfully get all informations",
      information,
    });
  },
};

module.exports = { informationController };
