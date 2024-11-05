const fs = require('fs').promises;

exports.getAllUsers = async () => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);
        
        // Cria uma nova lista de usuários sem a chave 'password'
        const usersWithoutPassword = users.map(({ password, ...user }) => user);
        
        return usersWithoutPassword;        
    } catch (error) {
        return null;
    }
};

exports.getUserById = async (id) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);
        
        const user = users.find(u => u.id === id);

        return user;        
    } catch (error) {
        return null;
    }
};

exports.createUser = async (user) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);
        
        const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = { id: userId, ...user };

        users.push(newUser);

        await fs.writeFile('./users.json', JSON.stringify(users));

        return newUser;        
    } catch (error) {
        return null;
    }
};

exports.updateUser = async (id, updatedUser) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);

        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            return null;
        }

        users[index] = { ...users[index], ...updatedUser };

        await fs.writeFile('./users.json', JSON.stringify(users));

        return users[index];
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return null;
    }
};

exports.deleteUser = async (id) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);

        const index = users.findIndex(user => user.id === id);

        if(index === -1){
            return null;
        }

        const deletedUser = users.splice(index, 1)[0];
        
        await fs.writeFile('./users.json', JSON.stringify(users));

        return deletedUser;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return false;
    }
};