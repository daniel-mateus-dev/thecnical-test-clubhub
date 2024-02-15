const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Owner } = require("./owner");
const { Location } = require("./location");

const Information = sequelize.define("Information", {
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
  tax_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Information.belongsTo(Owner, { foreignKey: "ownerId" });
Information.belongsTo(Location, { foreignKey: "locationId" });

module.exports = { Information };
