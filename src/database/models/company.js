const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
});

module.exports = { Company };
