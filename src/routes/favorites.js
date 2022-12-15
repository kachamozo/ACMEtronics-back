const { Router } = require("express");
const { addFavorite, removeFavorite } = require("../controllers/favorites");

const router = Router();

router.post("/", addFavorite);
router.delete("/:id/:product", removeFavorite);

module.exports = router;
