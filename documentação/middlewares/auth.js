const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    // pega o cabeçalho de autenticação da requisição
    const authHeader = req.headers['authorization'];

    // verifica se há um cabeçalho ou não, se houver ele divide a string ('BEARER ${TOKEN}') salvando apenas o token
    const token = authHeader && authHeader.split(' ')[1];

    // se não houver token retorna um erro
    if(!token){
        return res.status(401).json({ message: 'Acesso negado' });
    }

    // desserializa o token, salvando as informações do payload na requisição (req.user)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: 'Token inválido!' });
        }

        req.user = user;
        next();
    })
}

// verifica se o usupario é admin
exports.admin = (req, res, next) => {
    this.authenticateToken(req, res, (err) => {
        if (err) {
            return res.status(401).json({ message: 'Acesso negado' });
        }

        // verifica se o usuário autenticado é um administrador
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Acesso negado: privilégios insuficientes' });
        }

        // se o usuário é admin, passa para o próximo middleware
        next();
    });
};
