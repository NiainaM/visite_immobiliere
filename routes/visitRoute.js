const express = require("express");
const router = express.Router();
const visitController = require("../controllers/visitController");

router.post("/", visitController.create);
router.get("/", visitController.getAll);
router.get("/user/:userId", visitController.getByUser);
router.get("/property/:propertyId", visitController.getByProperty);

module.exports = router;