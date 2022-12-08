const { Router } = require('express');
const { getProduct } = require('../controllers/product');
const { updateProduct } = require('./product');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/product', getProduct)

router.put("/:id", updateProduct)
module.exports = router;
