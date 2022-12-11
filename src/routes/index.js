const { Router } = require('express');
const { getProduct } = require('../controllers/product');
const category = require('./category');
const user = require('./user');
const product = require('./product');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/category', category);
router.use('/user', user);
router.use('/product', product);

module.exports = router;
