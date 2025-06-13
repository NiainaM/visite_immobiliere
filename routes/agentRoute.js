const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

router.post('/', agentController.register);
router.get("/", agentController.getAll);
router.get("/:id", agentController.getOne);
router.put("/:id", agentController.update);
router.delete("/:id", agentController.delete);

module.exports = router;