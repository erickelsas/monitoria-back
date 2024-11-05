const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    
    if(token == null){
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.status(200).json({ token });
}