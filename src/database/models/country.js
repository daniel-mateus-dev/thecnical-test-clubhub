const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

const Country = sequelize.define("Country", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = { Country };
