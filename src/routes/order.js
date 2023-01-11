const { Router } = require('express');
const { postOrder, getOrder, getOrderId, putOrder, deleteOrder } = require('../controllers/order');
const router = Router();


router.post("/", postOrder);
router.get("/", getOrder);
router.get("/:id", getOrderId);
router.put("/:id", putOrder);
router.delete("/:id", deleteOrder);

module.exports = router;