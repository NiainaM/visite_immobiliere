const sequelize = require('../config/dbConfig');
const User = require('./userModel');
const Agent = require('./agentModel');
const Property = require('./propertyModel');
const Media = require('./mediaModel');
const Model3D = require('./model3dModel');
const Visit = require('./visitModel');
const Favorite = require('./favoriteModel');
const Appointment = require('./appointmentModel');

const db = { sequelize, User, Agent, Property, Media, Model3D, Visit, Favorite, Appointment };

// Appelle les méthodes associate de chaque modèle si elles existent
Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;