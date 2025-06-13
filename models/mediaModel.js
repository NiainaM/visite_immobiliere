const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Media = sequelize.define("Media", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("image", "video"), allowNull: false },
    propertyId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Media.associate = (models) => {
    Media.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
  };

module.exports = Media;