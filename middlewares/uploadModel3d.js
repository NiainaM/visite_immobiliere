const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "models/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["model/gltf+json", "application/octet-stream", "model/3mf", "model/fbx"];
  if (allowed.includes(file.mimetype) || file.originalname.endsWith(".glb") || file.originalname.endsWith(".fbx")) {
    cb(null, true);
  } else {
    cb(new Error("Format de modèle non supporté"), false);
  }
};

module.exports = multer({ storage, fileFilter });