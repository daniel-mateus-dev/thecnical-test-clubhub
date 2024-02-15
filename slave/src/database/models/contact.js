const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Owner } = require("./owner");
const { Location } = require("./location");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Contact.belongsTo(Owner, { foreignKey: "ownerId" });
Contact.belongsTo(Location, { foreignKey: "locationId" });

module.exports = { Contact };
