const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Model3D = sequelize.define("Model3D", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    format: { type: DataTypes.STRING },
    propertyId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  });

  Model3D.associate = (models) => {
    Model3D.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
  };

module.exports = Model3D;