const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: console.log,
})

const Book = require('./Book')(sequelize, DataTypes);

module.exports = {
    sequelize,
    Book
}