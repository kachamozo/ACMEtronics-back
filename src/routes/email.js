const { Router } = require("express");
const router = Router();
const { sendEmail } = require("./../controllers/email");

router.post("/purchase-completed", sendEmail);

module.exports = router;
