const userService = require('../services/userService');

// TODAS as rotas aqui chamam a função equivalente na camada de serviço, verifica se o resultado é o esperado e retorna status de sucesso (2XX) ou error (4XX)
exports.getAllUsers = (req, res) => {
    const users = userService.getAllUsers();

    res.status(200).json(users);
}

exports.getUserById = (req, res) => {
    const user = userService.getUserById(parseInt(req.params.id, 10));

    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
}

exports.createUser = (req, res) => {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
}

exports.updateUser = (req, res) => {
    const updatedUser = userService.updateUser(parseInt(req.params.id, 10), req.body);
    
    if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(updatedUser);
};

exports.deleteUser = (req, res) => {
    const deletedUser = userService.deleteUser(parseInt(req.params.id, 10));

    if(!deletedUser){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(deletedUser);
}