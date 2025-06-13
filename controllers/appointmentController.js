const db = require("../models");
const Appointment = db.Appointment;

exports.create = async (req, res) => {
  try {
    const { date, userId, agentId, propertyId, note } = req.body;

    if (!date || !userId || !agentId || !propertyId) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const appointment = await Appointment.create({
      date,
      userId,
      agentId,
      propertyId,
      note,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: ["user", "agent", "property"] });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, { include: ["user", "agent", "property"] });
    if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Rendez-vous non trouvé" });

    await appointment.destroy();
    res.json({ message: "Rendez-vous supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.params.userId },
      include: ["property", "agent"],
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByAgent = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { agentId: req.params.agentId },
      include: ["property", "user"],
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};