const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadModel3d");
const modelController = require("../controllers/model3dController");

router.post("/upload", upload.single("file"), modelController.uploadModel);
router.get("/property/:propertyId", modelController.getByProperty);
router.delete("/:id", modelController.delete);

module.exports = router;