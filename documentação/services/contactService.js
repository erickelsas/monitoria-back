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

        // retorna todos os contatos de um mesmo userId
        const userContacts = contacts.filter(c => c.userId === userId);

        const user = await userService.getUserById(userId);

        // retorna um json com a chave user, contendo um usuário e a chave contacts com um array de contatos
        return {user, contacts: userContacts};
    } catch(error){
        return null;
    }
}

exports.createContact = async (contact) => {
    try{
        const data = await fs.readFile('./contacts.json', 'utf-8');
        const contacts = JSON.parse(data);

        // verifica se há algum contato, caso haja retorna o id do último contato + 1, caso contrário retorna 1
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

        // sobrescreve as informações do contato[index] com updatedContact, mantendo as chaves não existentes em updatedContact
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