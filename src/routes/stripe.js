const { Router } = require("express");

const { checkout } = require("../controllers/stripe");

const router = Router();

router.post("/", checkout);

module.exports = router;
