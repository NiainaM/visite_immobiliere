const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Appointment = sequelize.define("Appointment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("pending", "confirmed", "canceled"), defaultValue: "pending" },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    agentId: { type: DataTypes.INTEGER, allowNull: false },
    propertyId: { type: DataTypes.INTEGER, allowNull: false },
    note: { type: DataTypes.TEXT },
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Appointment.belongsTo(models.Agent, { foreignKey: "agentId", as: "agent" });
    Appointment.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
  };

module.exports = Appointment;