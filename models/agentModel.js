const { DataTypes } = require("sequelize");
const sequelize = require('../config/dbConfig');

  const Agent = sequelize.define("Agent", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    agency: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  module.exports = Agent;