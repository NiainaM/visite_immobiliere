const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Property = sequelize.define("Property", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    surface: { type: DataTypes.FLOAT },
    type: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    latitude: { type: DataTypes.FLOAT },
    longitude: { type: DataTypes.FLOAT },
    agentId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Property.associate = (models) => {
    Property.belongsTo(models.Agent, { foreignKey: "agentId", as: "agent" });
    Property.hasMany(models.Media, { foreignKey: "propertyId", as: "media" });
    Property.hasOne(models.Model3D, { foreignKey: "propertyId", as: "model3d" });
  };

module.exports = Property;