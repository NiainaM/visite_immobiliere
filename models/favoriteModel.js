const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Favorite = sequelize.define("Favorite", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    propertyId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Favorite.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
  };

module.exports = Favorite;