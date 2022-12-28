const { Router } = require("express");
const router = Router();
const loginController = require('./../Controllers/login');

router.post('/login', loginController.authTokenRouterLog)

router.get('/profile', loginController.authTokenRouterPerf)


module.exports = router