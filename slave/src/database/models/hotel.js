const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Endpoint } = require("./endpoints");

const Hotel = sequelize.define("Hotel", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Hotel.hasMany(Endpoint, { foreignKey: "hotelId" });

module.exports = { Hotel };
