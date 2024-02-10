const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Company } = require("./company");

const Owner = sequelize.define("Owner", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUID,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Owner.belongsTo(Company, { foreignKey: "companyId" });

module.exports = { Owner };
