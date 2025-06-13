const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const upload = require("../middlewares/upload");

router.post("/upload", upload.single("file"), mediaController.uploadFile);

router.post("/", mediaController.create);
router.get("/", mediaController.getAll);
router.get("/property/:propertyId", mediaController.getByProperty);
router.delete("/:id", mediaController.delete);

module.exports = router;