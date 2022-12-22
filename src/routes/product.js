const { Router } = require('express');
const {
	getAll,
	getById,
	create,
	update,
	deleteById,
	createBulk,
} = require('../controllers/product');
const verifyToken = require('../middleware/verifyToken');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', verifyToken, create);
router.put('/:id', update);
router.delete('/:id', deleteById);
router.post('/bulk', createBulk);

module.exports = router;
