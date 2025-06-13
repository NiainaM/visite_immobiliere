const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "votre_cle_secrete";

// 🔐 Vérifie le token dans les headers
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format: Bearer <token>

  if (!token) return res.status(403).json({ message: "Token requis" });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });
    req.user = decoded;
    next();
  });
};

// 🛂 Middleware pour rôles spécifiques
exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Accès refusé : rôle requis " + role });
    }
    next();
  };
};

// 👮 Autorise plusieurs rôles (ex: ["agent", "admin"])
exports.requireRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé : rôle requis" });
    }
    next();
  };
};