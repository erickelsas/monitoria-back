const fs = require('fs').promises;
const userService = require('./userService');

exports.getAllContacts = async () => {
    try{
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        return contacts;
    } catch (error){
        return null;
    }
}

exports.getContactById = async (id) => {
    try{
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        const contact = contacts.find(c => c.id === id);

        return contact;
    } catch (error){
        return null;
    }
}

exports.getContactsByUserId = async (userId) => {
    try{
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        const userContacts = contacts.filter(c => c.userId === userId);

        const user = await userService.getUserById(userId);

        return {user, contacts: userContacts};
    } catch(error){
        return null;
    }
}

exports.createContact = async (contact) => {
    try{
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        const contactId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;

        const user = await userService.getUserById(contact.userId);

        if(!user){
            return null;
        }

        const newContact = { id: contactId, ...contact };

        contacts.push(newContact);

        await fs.writeFile('./contacts.json', JSON.stringify(contacts));

        return newContact;
    } catch (error) {
        return null;
    }
}

exports.updateContact = async (id, updatedContact) => {
    try{
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        const index = contacts.findIndex(contact => contact.id === id);

        if(index === -1){
            return null;
        }

        contacts[index] = {...contacts[index], ...updatedContact};

        await fs.writeFile('./contacts.json', JSON.stringify(contacts));

        return contacts[index];
    } catch (error){
        console.error("Erro ao atualizar contato: ", error);
        return null;
    }
}

exports.deleteContact = async (id) => {
    try {
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        const index = contacts.findIndex(contact => contact.id === id);

        if(index === -1){
            return null;
        }

        const deletedContact = contacts.splice(index, 1)[0];

        await fs.writeFile('./contacts.json', JSON.stringify(contacts));
        
        return deletedContact;
    } catch (error){
        console.error("Erro ao deletar contato: ", error);
        return null;
    }
}