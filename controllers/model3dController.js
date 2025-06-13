const db = require("../models");
const Model3D = db.Model3D;

exports.uploadModel = async (req, res) => {
  try {
    const file = req.file;
    const { propertyId } = req.body;

    if (!file || !propertyId) {
      return res.status(400).json({ message: "Fichier ou propertyId manquant" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/models/${file.filename}`;
    const format = file.originalname.split('.').pop();

    // Si modèle déjà existant pour ce bien, on le remplace
    const existing = await Model3D.findOne({ where: { propertyId } });
    if (existing) {
      await existing.update({ url: fileUrl, format });
      return res.status(200).json(existing);
    }

    const model = await Model3D.create({ url: fileUrl, format, propertyId });
    res.status(201).json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByProperty = async (req, res) => {
  try {
    const model = await Model3D.findOne({ where: { propertyId: req.params.propertyId } });
    if (!model) return res.status(404).json({ message: "Modèle non trouvé" });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const model = await Model3D.findByPk(req.params.id);
    if (!model) return res.status(404).json({ message: "Modèle non trouvé" });

    await model.destroy();
    res.json({ message: "Modèle supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};