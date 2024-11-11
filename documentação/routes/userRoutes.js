const express = require('express');

const userController = require('../controllers/userController');
const contactController = require('../controllers/contactController');

const { validateId } = require('../validation/globalValidation');
const { validateUser } = require('../validation/userValidation');
const { admin } = require('../middlewares/auth')

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validateId, userController.getUserById);
router.get('/:id/contacts', validateId, contactController.getContactByUserId)
router.post('/', admin, validateUser, userController.createUser);
router.put('/:id', admin, validateId, validateUser, userController.updateUser);
router.delete('/:id', admin, validateId, userController.deleteUser);

module.exports = router;
