const db = require("../models");
const Visit = db.Visit;

exports.create = async (req, res) => {
  try {
    const { type, userId, propertyId } = req.body;

    if (!type || !userId || !propertyId) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const visit = await Visit.create({ type, userId, propertyId });
    res.status(201).json(visit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const visits = await Visit.findAll();
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByProperty = async (req, res) => {
  try {
    const visits = await Visit.findAll({ where: { propertyId: req.params.propertyId } });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const visits = await Visit.findAll({ where: { userId: req.params.userId } });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};