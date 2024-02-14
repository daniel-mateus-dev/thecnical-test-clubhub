const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

const City = sequelize.define("City", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { City };
