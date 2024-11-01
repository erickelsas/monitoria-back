const express = require('express');

const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validation/userValidation');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validateUserId, userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUserId, validateUser, userController.updateUser);
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;
