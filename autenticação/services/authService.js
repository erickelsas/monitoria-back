const fs = require('fs').promises;
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });
};

exports.login = async (username, password) => {
    try {
        const data = await fs.readFile('./users.json', 'utf-8');
        const users = JSON.parse(data);
        
        const user = users.find(u => u.username === username);

        if (!user || user.password !== password) {
            return null;
        }

        return generateToken(user);
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return null;
    }
}
