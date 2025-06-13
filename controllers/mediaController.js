const db = require("../models");
const Media = db.Media;

exports.create = async (req, res) => {
  try {
    const { url, type, propertyId } = req.body;
    const media = await Media.create({ url, type, propertyId });
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const media = await Media.findAll();
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByProperty = async (req, res) => {
  try {
    const media = await Media.findAll({ where: { propertyId: req.params.propertyId } });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ message: "Média introuvable" });

    await media.destroy();
    res.json({ message: "Média supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { propertyId } = req.body;

    if (!file || !propertyId) {
      return res.status(400).json({ message: "Fichier ou propertyId manquant" });
    }

    const fileType = file.mimetype.startsWith("video") ? "video" : "image";
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

    const media = await db.Media.create({
      url: fileUrl,
      type: fileType,
      propertyId,
    });

    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};