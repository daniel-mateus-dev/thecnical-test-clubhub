const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Location } = require("./location");

const Endpoint = sequelize.define("Endpoint", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  hotelId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Endpoint.belongsTo(Location, { foreignKey: "locationId" });

module.exports = { Endpoint };
