const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

router.post("/", favoriteController.add);           // Ajouter un favori
router.delete("/", favoriteController.remove);      // Supprimer un favori
router.get("/user/:userId", favoriteController.getByUser);  // Favoris d’un utilisateur

module.exports = router;