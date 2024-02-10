const { Contact } = require("../database/models/contact");

const contactController = {
  getAll: async (req, res) => {
    const contacts = await Contact.findAll();
    res.status(200).json({
      status: 200,
      message: "Successfully get all contacts",
      contacts,
    });
  },
};

module.exports = { contactController };
