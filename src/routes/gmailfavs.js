const { Router } = require("express");
const { getFavorites, addFavorite, removeFavorite } = require("../controllers/gmailfavs");

const router = Router();

router.get("/", getFavorites)
router.post("/", addFavorite);
router.delete("/", removeFavorite);

module.exports = router;