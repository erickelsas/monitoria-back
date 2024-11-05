const express = require('express');

const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validation/userValidation');
const { admin } = require('../middlewares/auth')

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validateUserId, userController.getUserById);
router.post('/', admin, validateUser, userController.createUser);
router.put('/:id', admin, validateUserId, validateUser, userController.updateUser);
router.delete('/:id', admin, validateUserId, userController.deleteUser);

module.exports = router;
