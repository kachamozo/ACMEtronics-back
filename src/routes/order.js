const { Router } = require('express');
const { postOrder, getOrder, getOrderId, putOrder, deleteOrder, postOrderUser } = require('../controllers/order');
const router = Router();


router.post("/", postOrder);
router.get("/", getOrder);
router.get("/:orderId", getOrderId);
router.put("/:id", putOrder);
router.delete("/:id", deleteOrder);
router.post("/:userId", postOrderUser);

module.exports = router;