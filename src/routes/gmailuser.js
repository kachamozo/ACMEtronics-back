const { Router } = require("express");
const router = Router();
const {
    getAllGmailusers,
    createGmailuser,
} = require("../controllers/gmailuser");

router.get("/", getAllGmailusers);

router.post("/", createGmailuser);

module.exports = router;