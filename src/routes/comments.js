const { Router } = require("express");
const { postComments } = require("../controllers/comments");
const router = Router();

router.post('/', postComments);

module.exports = router;
