const { Router } = require('express');
const { getProduct } = require('../controllers/product');
const category = require('./category');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/category', category);

router.get('/product', getProduct);
module.exports = router;
