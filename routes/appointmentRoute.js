const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/", appointmentController.create);
router.get("/", appointmentController.getAll);
router.get("/:id", appointmentController.getOne);
router.put("/:id", appointmentController.update);
router.put("/:id/status", appointmentController.updateStatus);
router.delete("/:id", appointmentController.delete);
router.get("/user/:userId", appointmentController.getByUser);
router.get("/agent/:agentId", appointmentController.getByAgent);

module.exports = router;