const db = require("../models");
const bcrypt = require("bcryptjs");
const Agent = db.Agent;


exports.register = async (req, res) => {
  try {
    const { fullName, agency, email, password, phone } = req.body;

    const existing = await Agent.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email déjà utilisé." });

    const hash = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ fullName, agency, email, password: hash, phone });

    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const agent = await Agent.findOne({ where: { email } });

//     if (!agent) return res.status(404).json({ message: "Agent non trouvé." });

//     const match = await bcrypt.compare(password, agent.password);
//     if (!match) return res.status(401).json({ message: "Mot de passe incorrect." });

//     const token = jwt.sign({ id: agent.id }, JWT_SECRET, { expiresIn: "24h" });

//     res.json({ token, agent });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getAll = async (req, res) => {
  try {
    const agents = await Agent.findAll();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent introuvable" });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent introuvable" });

    await agent.update(req.body);
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent introuvable" });

    await agent.destroy();
    res.json({ message: "Agent supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};