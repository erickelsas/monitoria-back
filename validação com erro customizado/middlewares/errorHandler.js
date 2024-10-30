const CustomError = require('./CustomError');

// Envia um JSON com uma menssagem de erro recebida por parâmetro para a próxima rota
const errorHandler = (err, req, res, next) => {

    // Verifica se o erro é do tipo CustomError
    if (err instanceof CustomError) {
        return res.status(err.status).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
};

module.exports = errorHandler;
