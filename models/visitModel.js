const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Visit = sequelize.define("Visit", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM("3D", "AR", "video", "details"), allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    propertyId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Visit.associate = (models) => {
    Visit.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Visit.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
  };

module.exports = Visit;