const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { City } = require("./city");
const { Country } = require("./country");

const Location = sequelize.define("Location", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Location.belongsTo(City, { foreignKey: "cityId" });
Location.belongsTo(Country, { foreignKey: "countryId" });

module.exports = { Location };
