const contactService = require('../services/contactService');

exports.getAllContacts = async (req, res) => {
    const contacts = await contactService.getAllContacts();

    res.status(200).json(contacts);
}

exports.getContactById = async (req, res) => {
    const contact = await contactService.getContactById(parseInt(req.params.id, 10));

    if(!contact){
        return res.status(404).json({ message: 'Contato não encontrado.' });
    }

    res.status(200).json(contact);
}

exports.getContactByUserId = async (req, res) => {
    const contacts = await contactService.getContactsByUserId(parseInt(req.params.id, 10));

    if(!contacts){
        return res.status(500).json({ message: 'Houve um erro, tente novamente.' });
    }

    res.status(200).json(contacts);
}

exports.createContact = async (req, res) => {
    const newContact = await contactService.createContact(req.body);

    if(!newContact){
        return res.status(400).json({ message: 'ID de usuário enviado é inválido.' });
    }

    res.status(201).json(newContact);
}

exports.updateContact = async (req, res) => {
    const updatedContact = await contactService.updateContact(parseInt(req.params.id, 10), req.body);

    if(!updatedContact){
        return res.status(404).json({ message: 'Contato não encontrado.' });
    }

    res.status(200).json(updatedContact);
}

exports.deleteContact = async (req, res) => {
    const deletedContact = await contactService.deleteContact(parseInt(req.params.id, 10));

    if(!deletedContact){
        return res.status(404).json({ message: 'Contato não encontrado.' });
    }

    res.status(200).json(deletedContact);
}