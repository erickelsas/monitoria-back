const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Acesso negado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: 'Token inválido!' });
        }
        
        req.user = user;
        next();
    })
}

exports.admin = (req, res, next) => {
    this.authenticateToken(req, res, (err) => {
        if (err) {
            return res.status(401).json({ message: 'Acesso negado' });
        }

        // Verifica se o usuário autenticado é um administrador
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Acesso negado: privilégios insuficientes' });
        }

        // Se o usuário é admin, passa para o próximo middleware
        next();
    });
};
