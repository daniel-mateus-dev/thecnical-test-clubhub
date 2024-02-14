const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const { Company } = require("./company");

const Owner = sequelize.define("Owner", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true, 
  }
});

Owner.belongsTo(Company, { foreignKey: "companyId" });

module.exports = { Owner };
