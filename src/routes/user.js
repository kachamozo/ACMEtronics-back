const { Router } = require("express");
const router = Router();
const usersController = require('../controllers/user');

router.get('/', usersController.getUser);

router.post('/', usersController.postUser);

router.get('/:id', usersController.getUserByID);

router.put('/:id', usersController.putUser);

router.delete('/:id', usersController.deleteUser)

module.exports = router
