const express = require('express');

const contactController = require('../controllers/contactController');
const { validateId } = require('../validation/globalValidation');
const { validateContact } = require('../validation/contactValidation');
const { admin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/', admin, validateContact, contactController.createContact);
router.put('/:id', admin, validateId, validateContact, contactController.updateContact);
router.delete('/:id', admin, validateId, contactController.deleteContact);

module.exports = router;