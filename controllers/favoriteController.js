const db = require("../models");
const Favorite = db.Favorite;

exports.add = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    const alreadyExists = await Favorite.findOne({ where: { userId, propertyId } });
    if (alreadyExists) {
      return res.status(400).json({ message: "Déjà ajouté aux favoris" });
    }

    const favorite = await Favorite.create({ userId, propertyId });
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    const favorite = await Favorite.findOne({ where: { userId, propertyId } });
    if (!favorite) return res.status(404).json({ message: "Favori non trouvé" });

    await favorite.destroy();
    res.json({ message: "Favori supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.params.userId },
      include: [{ model: db.Property, as: "property" }],
    });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};