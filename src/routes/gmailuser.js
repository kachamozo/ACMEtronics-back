const { Router } = require("express");
const router = Router();
const {
    getAllGmailusers,
    createGmailuser,
    deleteGmailuser
} = require("../controllers/gmailuser");

router.get("/", getAllGmailusers);

router.post("/", createGmailuser);
router.delete("/:id", deleteGmailuser)

module.exports = router;