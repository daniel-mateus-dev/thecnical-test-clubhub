const { Owner } = require("../database/models/owner");

const ownerController = {
  getAll: async (req, res) => {
    try {
      const owners = await Owner.findAll();
      res.status(200).json({
        status: 200,
        message: "Successfully get all owners",
        owners,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get all owners",
        error,
      });
    }
  },
  createOwner: async (req, res) => {
    try {
      const owner = await Owner.create(req.body);
      res.status(201).json({
        status: 201,
        message: "Successfully create owner",
        owner,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create owner",
        error,
      });
    }
  },
  updateOwner: async (req, res) => {
    try {
      const owner = await Owner.findOne({ where: { id: req.body.id } });
      if (!owner) {
        res.status(404).json({
          status: 404,
          message: "Owner not found",
        });
        return;
      }
      const updated = await Owner.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "Successfully update owner",
        owner: updated,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to update owner",
        error,
      });
    }
  },
};

module.exports = { ownerController };
