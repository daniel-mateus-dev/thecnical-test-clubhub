const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Owner } = require("./owner");
const { Location } = require("./location");

const Franchises = sequelize.define("Franchises", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Franchises.belongsTo(Owner, { foreignKey: "ownerId" });
Franchises.belongsTo(Location, { foreignKey: "locationId" });

module.exports = { Franchises };
