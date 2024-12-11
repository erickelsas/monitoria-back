require('dotenv').config({ path: './config/.env' });

module.exports = {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/',
};
