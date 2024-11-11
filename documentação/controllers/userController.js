const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
}

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(parseInt(req.params.id, 10));

    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
}

exports.createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
}

exports.updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(parseInt(req.params.id, 10), req.body);
    
    if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(updatedUser);
};

exports.deleteUser = async (req, res) => {
    const deletedUser = await userService.deleteUser(parseInt(req.params.id, 10));

    if(!deletedUser){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(deletedUser);
}