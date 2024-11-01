const userModel = require('../models/userModel');

// realiza as chamadas declaradas em Model
exports.getAllUsers = () => userModel.getAllUsers();

exports.getUserById = (id) => userModel.getUserById(id);

exports.createUser = (user) => userModel.createUser(user);

exports.updateUser = (id, updatedUser) => userModel.updateUser(id, updatedUser);

exports.deleteUser = (id) => userModel.deleteUser(id);