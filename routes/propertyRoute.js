const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

router.post("/", propertyController.create);
router.get("/", propertyController.getAll);
router.get("/:id", propertyController.getOne);
router.put("/:id", propertyController.update);
router.delete("/:id", propertyController.delete);

module.exports = router;