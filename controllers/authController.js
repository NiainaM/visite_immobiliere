const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.User;
const Agent = db.Agent;

const secret = process.env.JWT_SECRET || "votre_cle_secrete";

// 🎯 Générer le token
function generateToken(user, role) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role,
    },
    secret,
    { expiresIn: "24h" }
  );
}

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser =
      role === "agent"
        ? await Agent.findOne({ where: { email } })
        : await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const model = role === "agent" ? Agent : User;

    const newUser = await model.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser, role);

    res.status(201).json({ token, user: { id: newUser.id, name, email, role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const model = role === "agent" ? Agent : User;

    const user = await model.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = generateToken(user, role);
    res.json({ token, user: { id: user.id, name: user.name, email, role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};