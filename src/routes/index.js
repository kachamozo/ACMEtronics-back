const { Router } = require("express");
const category = require("./category");
const user = require("./user");
const product = require("./product");
const favorites = require("./favorites");
const stripe = require("./stripe");
const login = require('./login')
const gmailuser = require('./gmailuser')
const gmailfavs = require('./gmailfavs')
const orderRouter = require("./order")
const email = require('./email')
const postComments = require('./comments')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/category", category);
router.use("/user", user);
router.use("/product", product);
router.use("/favorites", favorites);
router.use("/stripe", stripe);
router.use("/login", login)
router.use("/gmailuser", gmailuser)
router.use("/gmailfavs", gmailfavs)
router.use('/order', orderRouter);
router.use('/email', email)
router.use('/comments', postComments)

module.exports = router;
