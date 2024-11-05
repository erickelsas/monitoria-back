const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // chama a função de login
    const token = await authService.login(username, password);
    
    // verifica se há um token
    if(token == null){
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.status(200).json({ token });
}