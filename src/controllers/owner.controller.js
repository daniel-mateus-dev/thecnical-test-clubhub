const { Owner } = require("../database/models/owner");

const ownerController = {
  getAll: async (req, res) => {
    const owners = await Owner.findAll();
    res.status(200).json({
      status: 200,
      message: "Successfully get all owners",
      owners,
    });
  },
};

module.exports = { ownerController };
