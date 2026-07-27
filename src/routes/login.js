const { Router } = require('express');
const router = Router();
const { loginUser, profileUser } = require('./../controllers/login');

router.post('/login', loginUser);

router.get('/profile', profileUser);

module.exports = router;
